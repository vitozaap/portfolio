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
        transition: shouldReduce ? undefined : { duration: 0.4, ease: 'easeOut' as const, delay: index * 0.1 },
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
