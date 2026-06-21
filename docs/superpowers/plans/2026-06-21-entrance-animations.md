# Entrance Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add clip-reveal entrance animations (left→right via `clip-path`) to all 5 portfolio pages, triggered on every tab switch, with dramatic stagger timing (100ms between items, 400ms duration each).

**Architecture:** Each page component already unmounts/remounts on tab switch (different component types render different JSX), so mount-phase animations fire naturally without any router-level `AnimatePresence` or `key` props. `motion/react` (v12, already installed) handles animation. Each component gets a local `animItem(index)` helper that returns motion props; when `useReducedMotion()` is true, it returns `{}` so content appears instantly.

**Tech Stack:** `motion/react` v12.39.0 (already installed), React 19, Next.js App Router, `@base-ui/react/progress`, Tailwind CSS v4.

---

## File Map

| File | Change |
|---|---|
| `components/core/pages/skills/level.tsx` | Add `delay` prop; animate bar from 0→value via useState+useEffect |
| `components/ui/progress.tsx` | Add `duration-[400ms] ease-out` to indicator transition |
| `components/core/pages/skills/skills.tsx` | Add "use client", clip-reveal on each item in map, pass `delay` to Level |
| `components/core/pages/contact/contact.tsx` | Add motion import, clip-reveal on each ContactCard |
| `components/core/pages/package/package.tsx` | Add "use client", clip-reveal on each JSON section group |
| `components/core/pages/about/about.tsx` | Add "use client", clip-reveal on IdeComment + 2 IdeTextGroup blocks |
| `components/core/pages/readme/readme.tsx` | Add "use client", clip-reveal on hero, TextCards, FileCards, tl;dr |

---

## Task 0: Create Feature Branch

**Files:** none

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git checkout -b feat/entrance-animations
```

- [ ] **Step 2: Verify**

```bash
git branch
```

Expected: `* feat/entrance-animations` is the active branch.

---

## Task 1: Progress Bar Animation (`level.tsx` + `progress.tsx`)

**Files:**
- Modify: `components/core/pages/skills/level.tsx`
- Modify: `components/ui/progress.tsx`

The `ProgressIndicator` already has `transition-all` but uses the Tailwind default duration (150ms). Increase it to 400ms. In `level.tsx`, add a `delay` prop; use `useState(0)` + `useEffect` to set the real value after `delay` ms — the CSS transition on the indicator handles the smooth fill.

- [ ] **Step 1: Update `components/ui/progress.tsx` — add duration to indicator**

Change only the `ProgressIndicator` function. Find this line:
```tsx
className={cn("h-full bg-primary transition-all", className)}
```
Replace with:
```tsx
className={cn("h-full bg-primary transition-all duration-[400ms] ease-out", className)}
```

- [ ] **Step 2: Rewrite `components/core/pages/skills/level.tsx`**

```tsx
"use client"

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

export function Level({ className, children, value, delay = 0 }: ProgressPrimitive.Root.Props & { delay?: number }) {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        const num = typeof value === 'number' ? value : 0
        const timer = setTimeout(() => setDisplayValue(num), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return (
        <div className={cn("flex gap-2 items-center w-full", className)}>
            <Progress value={displayValue} className={"w-full"} />
            <span className="text-xs font-bold">{children}</span>
        </div>
    )
}
```

- [ ] **Step 3: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/core/pages/skills/level.tsx components/ui/progress.tsx
git commit -m "feat(animations): animate progress bar fill with delay prop"
```

---

## Task 2: Skills Page (`skills.tsx`)

**Files:**
- Modify: `components/core/pages/skills/skills.tsx`

Wrap each item in the `items.map()` with a `motion.div` that clip-reveals left→right. Pass a `delay` to `Level` equal to the item's stagger delay + 100ms (so the bar starts filling right after the row reveals).

- [ ] **Step 1: Rewrite `components/core/pages/skills/skills.tsx`**

```tsx
"use client"

import { motion, useReducedMotion } from "motion/react"
import { IdeComment, IdeText, IdeTextGroup, IdeTextHighlighted } from "../ideTextComponents";
import { Level } from "./level";

const items: { name: string, value: number, comment?: string }[] = [
    { name: "Typescript", value: 85 },
    { name: "Python", value: 48, comment: "Cursando CS50P de Harvard" },
    { name: "Dev com IA", value: 90, comment: "3x Anthropic Claude code and AI Fluency" },
    { name: "AWS Cloud", value: 70, comment: "Em proceso para Cloud Practitioner." },
    { name: "Git & CI/CD", value: 70 },
    { name: "Inglês", value: 90, comment: "Nível C1" },
    { name: "Node.js", value: 80 },
    { name: "NestJs", value: 70 },
    { name: "Docker", value: 65 },
    { name: "React", value: 75 },
    { name: "Postgres + ORMs", value: 75 },
]

export default function Skills() {
    const shouldReduce = useReducedMotion()

    return (
        <main className="flex flex-col gap-6 w-full">
            <IdeTextGroup curlyBrackets>
                <IdeTextGroup groupTitle={<IdeTextHighlighted variant={"dotted"}>"stack": </IdeTextHighlighted>} brackets>
                    {items.map((item, index) => (
                        <motion.div
                            className="flex flex-col gap-1"
                            key={item.name}
                            initial={shouldReduce ? undefined : { clipPath: 'inset(0 100% 0 0)' }}
                            animate={shouldReduce ? undefined : { clipPath: 'inset(0 0% 0 0)' }}
                            transition={shouldReduce ? undefined : { duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
                        >
                            <IdeTextGroup curlyBrackets>
                                <div className="flex gap-2 items-center max-sm:grid max-sm:grid-cols-[auto_1fr]">
                                    <IdeTextHighlighted variant={"dotted"} className="whitespace-nowrap">"name"{":"} <b>"{item.name}"</b></IdeTextHighlighted>
                                    <IdeTextHighlighted variant={"dotted"} className="whitespace-nowrap max-sm:justify-self-end">"level"{":"} <b>"{item.value}"</b></IdeTextHighlighted>
                                    {item.comment ? <IdeComment className="max-sm:col-span-2">{item.comment}</IdeComment> : null}
                                </div>
                                <div className="flex w-full gap-2 justify-between items-center">
                                    <IdeText className="whitespace-nowrap max-sm:hidden"><b>{item.name}</b></IdeText>
                                    <Level className={"w-10/12"} value={item.value} delay={shouldReduce ? 0 : index * 100 + 100}>{item.value}</Level>
                                </div>
                            </IdeTextGroup>
                        </motion.div>
                    ))}
                </IdeTextGroup>
            </IdeTextGroup>
        </main>
    )
}
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Visual check — open skills.json tab**

```bash
npm run dev
```

Open http://localhost:3000, click `skills.json` in the sidebar. Expected: each skill row clip-reveals left→right in sequence (100ms apart), then each progress bar fills up. Switch to another tab and back — animation replays.

- [ ] **Step 4: Commit**

```bash
git add components/core/pages/skills/skills.tsx
git commit -m "feat(animations): clip-reveal entrance on skills page"
```

---

## Task 3: Contact Page (`contact.tsx`)

**Files:**
- Modify: `components/core/pages/contact/contact.tsx`

This file already has `"use client"`. Add motion import and wrap each ContactCard in a `motion.div`.

- [ ] **Step 1: Add motion import and `useReducedMotion` to `contact.tsx`**

Add to the imports at the top (after `"use client"`):
```tsx
import { motion, useReducedMotion } from "motion/react";
```

- [ ] **Step 2: Add `shouldReduce` and update the JSX in `Contact`**

Add `const shouldReduce = useReducedMotion()` inside the `Contact` function body (after the existing `useState` and `useRef` lines).

Replace the `{CONTACT_DATA.map(...)}` block with:
```tsx
{CONTACT_DATA.map((contact, index) => (
    <motion.div
        key={contact.value}
        initial={shouldReduce ? undefined : { clipPath: 'inset(0 100% 0 0)' }}
        animate={shouldReduce ? undefined : { clipPath: 'inset(0 0% 0 0)' }}
        transition={shouldReduce ? undefined : { duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
    >
        <ContactCard
            title={contact.title}
            value={contact.value}
            isEmail={contact.isEmail}
            isCopied={copiedValue === contact.value}
            onCopyValue={handleCopy}
        />
    </motion.div>
))}
```

Note: the `key` moves from `<ContactCard>` to `<motion.div>`.

- [ ] **Step 3: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Visual check — open contact.yml tab**

Click `contact.yml` in the sidebar. Expected: 3 contact cards reveal one by one (0ms, 100ms, 200ms delays). Switch away and back — replays.

- [ ] **Step 5: Commit**

```bash
git add components/core/pages/contact/contact.tsx
git commit -m "feat(animations): clip-reveal entrance on contact page"
```

---

## Task 4: Package Page (`package.tsx`)

**Files:**
- Modify: `components/core/pages/package/package.tsx`

This is currently a server component. Add `"use client"`, import motion, wrap each JSON section group with a `motion.div`. The helper `animItem(index)` returns motion props or `{}` for reduced motion.

- [ ] **Step 1: Rewrite `components/core/pages/package/package.tsx`**

```tsx
"use client"

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { IdeText, IdeTextGroup, IdeTextHighlighted } from "../ideTextComponents";

const meta: [string, string][] = [
    ["name", "victor-santos"],
    ["version", "5.0.0"],
    ["description", "engenheiro de software fullstack"],
    ["license", "MIT — disponível para conversa"],
    ["repository", "https://github.com/vitozaap"],
];

const keywords = [
    "typescript", "node", "nest", "next", "react",
    "angular", "postgres", "prisma", "aws", "arquitetura",
];

const dependencies: [string, string][] = [
    ["café", "^∞"],
    ["curiosidade", "^1.0.0"],
    ["código-limpo", "^3.2.0"],
    ["pragmatismo", "^2.0.0"],
];

const devDependencies: [string, string][] = [
    ["experimentos", "latest"],
    ["side-projects", "~beta"],
];

const scripts: [string, string][] = [
    ["build", "vite build"],
    ["deploy", "aws s3 sync ..."],
    ["learn", "continuous"],
];

function Key({ children }: { children: ReactNode }) {
    return <IdeTextHighlighted>{`"${children}"`}</IdeTextHighlighted>;
}

function Value({ children }: { children: ReactNode }) {
    return <IdeTextHighlighted variant="dotted">{`"${children}"`}</IdeTextHighlighted>;
}

function Property({
    name,
    value,
    column,
    last,
}: {
    name: string;
    value: string;
    column?: number;
    last?: boolean;
}) {
    return (
        <div className="flex leading-6">
            <span
                className="shrink-0"
                style={column ? { minWidth: `${column}ch` } : undefined}
            >
                <Key>{name}</Key>
                <IdeText>: </IdeText>
            </span>
            <IdeText className="min-w-0 break-all">
                <Value>{value}</Value>
                {last ? "" : ","}
            </IdeText>
        </div>
    );
}

function ObjectGroup({
    title,
    entries,
    last,
}: {
    title: string;
    entries: [string, string][];
    last?: boolean;
}) {
    const column = Math.max(...entries.map(([k]) => k.length)) + 4;
    return (
        <IdeTextGroup tight curlyBrackets comma={!last} groupTitle={<IdeText className="leading-6"><Key>{title}</Key>:</IdeText>}>
            {entries.map(([name, value], i) => (
                <Property
                    key={name}
                    name={name}
                    value={value}
                    column={column}
                    last={i === entries.length - 1}
                />
            ))}
        </IdeTextGroup>
    );
}

export default function Package() {
    const shouldReduce = useReducedMotion()

    const animItem = (index: number) => ({
        initial: shouldReduce ? undefined : { clipPath: 'inset(0 100% 0 0)' } as const,
        animate: shouldReduce ? undefined : { clipPath: 'inset(0 0% 0 0)' } as const,
        transition: shouldReduce ? undefined : { duration: 0.4, ease: 'easeOut', delay: index * 0.1 },
    })

    return (
        <main className="flex flex-col w-full min-h-full leading-6 tracking-wide">
            <IdeText className="leading-6">{"{"}</IdeText>
            <div className="flex flex-col ps-4">
                <motion.div {...animItem(0)}>
                    {meta.map(([name, value]) => (
                        <Property key={name} name={name} value={value} />
                    ))}
                </motion.div>

                <motion.div {...animItem(1)}>
                    <IdeTextGroup tight brackets comma groupTitle={<IdeText className="leading-6"><Key>keywords</Key>:</IdeText>}>
                        <IdeText className="leading-6 whitespace-normal">
                            {keywords.map((kw, i) => (
                                <span key={kw}>
                                    <Value>{kw}</Value>
                                    {i === keywords.length - 1 ? "" : ", "}
                                </span>
                            ))}
                        </IdeText>
                    </IdeTextGroup>
                </motion.div>

                <motion.div {...animItem(2)}>
                    <ObjectGroup title="dependencies" entries={dependencies} />
                </motion.div>
                <motion.div {...animItem(3)}>
                    <ObjectGroup title="devDependencies" entries={devDependencies} />
                </motion.div>
                <motion.div {...animItem(4)}>
                    <ObjectGroup title="scripts" entries={scripts} last />
                </motion.div>
            </div>
            <IdeText className="leading-6">{"}"}</IdeText>
        </main>
    );
}
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Visual check — open package.json tab**

Click `package.json` in the sidebar. Expected: meta block, keywords, dependencies, devDependencies, scripts reveal sequentially (0ms, 100ms, 200ms, 300ms, 400ms delays). Switch away and back — replays.

- [ ] **Step 4: Commit**

```bash
git add components/core/pages/package/package.tsx
git commit -m "feat(animations): clip-reveal entrance on package page"
```

---

## Task 5: About Page (`about.tsx`)

**Files:**
- Modify: `components/core/pages/about/about.tsx`

Add `"use client"`. Animate 3 items: the top `IdeComment`, the `interface Engineer` block, and the `export class Victor` block. The `IdeRunnable` section at the bottom already has its own `AnimatePresence` animation — leave it untouched (not wrapped in motion).

- [ ] **Step 1: Rewrite `components/core/pages/about/about.tsx`**

```tsx
"use client"

import { motion, useReducedMotion } from "motion/react";
import { IdeComment, IdeText, IdeTextGroup, IdeTextHighlighted } from "../ideTextComponents";
import { IdeRunnable } from "./ideRunnable";

const BIO = "Me chamo Victor Santos, e adoro tecnologia. Comecei bem cedo a me interessar pela área, e hoje, venho me desenvolvendo como programador fullstack.";
const GREET = "olá, vamos construir algo?";

export default function About() {
    const shouldReduce = useReducedMotion()

    const animItem = (index: number) => ({
        initial: shouldReduce ? undefined : { clipPath: 'inset(0 100% 0 0)' } as const,
        animate: shouldReduce ? undefined : { clipPath: 'inset(0 0% 0 0)' } as const,
        transition: shouldReduce ? undefined : { duration: 0.4, ease: 'easeOut', delay: index * 0.1 },
    })

    return (
        <main className="flex flex-col w-full min-h-full gap-6 tracking-wide">
            <motion.div {...animItem(0)}>
                <IdeComment>Quem sou? Leia o código abaixo.</IdeComment>
            </motion.div>
            <section className="flex flex-col gap-4 max-w-full md:max-w-8/12">
                <motion.div {...animItem(1)}>
                    <IdeTextGroup curlyBrackets groupTitle={<IdeText><b>interface</b> Engineer</IdeText>}>
                        <IdeText>
                            name: string  {"\n"}
                            role: string  {"\n"}
                            location: string  {"\n"}
                            passions: string[]  {"\n"}
                        </IdeText>
                    </IdeTextGroup>
                </motion.div>
                <motion.div {...animItem(2)}>
                    <IdeTextGroup curlyBrackets groupTitle={<IdeText><b>export class</b> Victor <b>implements</b> Engineer</IdeText>}>
                        <IdeText>
                            name     = <IdeTextHighlighted variant={"dotted"}>"Victor Santos"</IdeTextHighlighted> {"\n"}
                            role     = <IdeTextHighlighted variant={"dotted"}>"Software Engineer"</IdeTextHighlighted> {"\n"}
                            location = <IdeTextHighlighted variant={"dotted"}>"Brasil"</IdeTextHighlighted> {"\n"}
                            {"\n"}
                            <IdeComment>o que me move</IdeComment> {"\n"}
                            <IdeTextGroup brackets groupTitle={<IdeText>passions =</IdeText>}>
                                <IdeTextHighlighted variant={"dotted"}>
                                    "construir sistemas que escalam", {"\n"}
                                    "arquitetura limpa e pragmática", {"\n"}
                                    "aprender continuamente", {"\n"}
                                    "código que outros conseguem ler", {"\n"}
                                </IdeTextHighlighted>
                            </IdeTextGroup>
                        </IdeText>
                        <IdeTextGroup curlyBrackets groupTitle={<IdeText><IdeTextHighlighted>bio</IdeTextHighlighted>(): string</IdeText>}>
                            <IdeText>
                                <b>return</b> <IdeTextHighlighted variant={"dotted"}>{`\`${BIO}\``}</IdeTextHighlighted>
                            </IdeText>
                        </IdeTextGroup>
                        <IdeTextGroup curlyBrackets groupTitle={<IdeText><IdeTextHighlighted>greet</IdeTextHighlighted>(): string</IdeText>} >
                            <IdeText>
                                <b>return</b> <IdeTextHighlighted variant={"dotted"}>{`"${GREET}"`}</IdeTextHighlighted>
                            </IdeText>
                        </IdeTextGroup>
                    </IdeTextGroup>
                </motion.div>
            </section>
            <section className="flex flex-col gap-2">
                <IdeComment>→ const v = new Victor()</IdeComment>
                <IdeRunnable command="v.bio()" output={BIO} />
                <IdeRunnable command="v.greet()" output={GREET} />
            </section>
        </main>
    )
}
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Visual check — open about.ts tab**

Click `about.ts` in the sidebar. Expected: comment line reveals first, then interface block, then class block (each 100ms apart). IdeRunnable section (EXECUTAR buttons) appears instantly with no clip animation — this is correct, it has its own animation. Switch away and back — replays.

- [ ] **Step 4: Commit**

```bash
git add components/core/pages/about/about.tsx
git commit -m "feat(animations): clip-reveal entrance on about page"
```

---

## Task 6: README Page (`readme.tsx`)

**Files:**
- Modify: `components/core/pages/readme/readme.tsx`

12 animated items: hero block (0), "olá, mundo" TextCard (1), "navegação" TextCard (2), each of the 7 FileCards (3–9), and the tl;dr TextCard (10). The hero `div` is converted to `motion.div` directly (no extra wrapper).

- [ ] **Step 1: Rewrite `components/core/pages/readme/readme.tsx`**

```tsx
"use client"

import { motion, useReducedMotion } from "motion/react";
import { findItemByPage } from "@/components/sidebar/items";
import { usePagesActions } from "../store";
import { FileCard, FileCardDescription, FileCardKicker, fileCards, FileCardTitle } from "./fileCard";
import { TextCard, TextCardTitle, TextCardDescription } from "./textCard";

export default function Readme() {
    const pagesActions = usePagesActions()
    const shouldReduce = useReducedMotion()

    const animItem = (index: number) => ({
        initial: shouldReduce ? undefined : { clipPath: 'inset(0 100% 0 0)' } as const,
        animate: shouldReduce ? undefined : { clipPath: 'inset(0 0% 0 0)' } as const,
        transition: shouldReduce ? undefined : { duration: 0.4, ease: 'easeOut', delay: index * 0.1 },
    })

    return (
        <main className="flex flex-col min-h-full w-full gap-6">
            <motion.div {...animItem(0)} className="flex w-full p-1.5 bg-foreground">
                <div className="flex flex-col w-full gap-3 justify-center text-background p-3 border border-background/30">
                    <h1 className="font-bold text-4xl sm:text-6xl md:text-8xl tracking-tight font-heading">VICTOR<span className="text-background/50 px-2">/</span>SANTOS</h1>
                    <div className="flex flex-wrap gap-2 sm:gap-4 items-center uppercase tracking-wider text-xs">
                        <p className="border border-background p-2">Software Engineer</p>
                        <p>Fullstack • TS • INGLÊS • AWS • DOCKER</p>
                    </div>
                </div>
            </motion.div>

            <motion.div {...animItem(1)}>
                <TextCard>
                    <TextCardTitle>olá, mundo.</TextCardTitle>
                    <TextCardDescription>Eu sou o <b>Victor Santos</b>, engenheiro de software fullstack.
                        Comecei cedo, por curiosidade. Hoje construo sistemas que rodam
                        em produção: APIs, infra, front, banco — o pacote completo.</TextCardDescription>
                </TextCard>
            </motion.div>

            <motion.div {...animItem(2)}>
                <TextCard>
                    <TextCardTitle>navegação</TextCardTitle>
                    <TextCardDescription>
                        Clique nos cards abaixo ou navegue pela sidebar ao seu lado. <br /> Ou use o atalho: <b>⌘K (Ctrl+K)</b> → command palette.
                    </TextCardDescription>
                </TextCard>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {fileCards.map((item, index) => (
                    <motion.div key={item.page} {...animItem(index + 3)}>
                        <FileCard onClick={() => {
                            const target = findItemByPage(item.page)
                            if (target) pagesActions.changePage(target)
                        }}>
                            <FileCardKicker>
                                {String(index + 1).padStart(2, "0")} / {item.kicker}
                            </FileCardKicker>
                            <FileCardTitle>{item.title}</FileCardTitle>
                            <FileCardDescription>{item.description}</FileCardDescription>
                        </FileCard>
                    </motion.div>
                ))}
            </div>

            <motion.div {...animItem(fileCards.length + 3)}>
                <TextCard className="max-w-xl">
                    <TextCardTitle>tl;dr</TextCardTitle>
                    <TextCardDescription>
                        - typescript, node, react, next, nest, angular <br />
                        - postgres, prisma, aws cloud, infra como código <br />
                        - arquiteta, escreve, deploya, mantém <br />
                        <br />
                        <div className="flex gap-1">
                            <div className="p-0.25 bg-foreground"></div>
                            <span className="text-xs py-0.5 ">dica: digite `help` no command palette para ver tudo que dá pra fazer aqui.</span>
                        </div>
                    </TextCardDescription>
                </TextCard>
            </motion.div>
        </main>
    );
}
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Visual check — open README.md tab**

Navigate to the site root (README.md is the default tab). Expected: hero block reveals first, then the two TextCards, then each FileCard in sequence, then tl;dr. Switch to another tab and back — replays. Click each FileCard — navigation still works.

- [ ] **Step 4: Commit**

```bash
git add components/core/pages/readme/readme.tsx
git commit -m "feat(animations): clip-reveal entrance on README page"
```

---

## Final Verification

- [ ] `npm run lint` — no lint errors across all modified files
- [ ] `npm run typecheck` — clean
- [ ] Cycle through all 5 tabs multiple times rapidly — no visual glitches, animations always restart
- [ ] Check `skills.json` — progress bars fill after each row reveals (not instant)
- [ ] Check `about.ts` — EXECUTAR button and its output animation still work correctly (unaffected)
- [ ] Mobile: open sidebar, navigate between tabs — animations work on smaller viewport

Once verified, this feature branch is ready for PR into `develop`.
