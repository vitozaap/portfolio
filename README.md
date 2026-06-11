```
┌──────────────────────────────────────────────────────────────┐
│  portfolio/                                          ▢ ▢ ▢  │
│  ────────────────────────────────────────────────────────    │
│  > Meu `VSportfólio` semelhante a uma IDE.                   │
└──────────────────────────────────────────────────────────────┘
```

# Portfolio — Brutalist IDE

Meu portfólio pessoal construído em forma de  **IDE brutalista**: sidebar, abas e o "arquivo". 
Você pode navegar pelo portfólio abrindo arquivos como `about.ts` ou `readme.md` — só que **nada disso é
roteamento do Next.js**.

> Tentei sair do simples e comum, apostando em uma ideia diferente que chama a atenção pelo estilo diferenciado, rs.

---

## ✦ Como funciona (a ideia central)

Tentei imitar o máximo uma IDE, fugindo do normal de rotas como: `/about` e `/contato` por exemplo.
Usei components que renderizam em uma página só. Esses componentes são controlados por uma store do `zustand`.

```
┌─────────────┬──────────────────────────────────────────┐
│  SIDEBAR    │  TAB BAR   [ about.ts ×][ readme.md ×]   │
│             ├──────────────────────────────────────────┤
│             │                                          │
│             │   CONTENT PANE                           │
│             │   (renderiza a página atual)             │
│  / projects │                                          │
│  / .git     │   1 │ // conteúdo aqui                   │
│             │   2 │                                    │
└─────────────┴──────────────────────────────────────────┘
```

O site inteiro praticamente em: **`components/core/pages/`**:

- **`types.ts`** — `Pages` é um enum Zod com cada view selecionável (`README`, `About`,
  `Contact`, …). Um `Item` é `{ name, page, icon }`, onde `name` é o nome de arquivo exibido
  (ex.: `about.ts`) e `page` é a key do enum. Adicionar uma view = estender o `pagesSchema`.
- **`store.tsx`** — store **Zustand** com `currentPage` e `openedPages` (as abas abertas).
  `changePage` abre a aba se ainda não estiver aberta e foca nela; `removePage` fecha a aba e
  cai na aba adjacente (nunca fecha a última).
- **Componentes por view** (ex.: `readme/readme.tsx`) renderizam o conteúdo de cada `Pages`.

Três consumers leem desse store:

| Consumer | O que faz |
|---|---|
| `AppSidebar` | sidebar com as "páginas" — clicar num arquivo chama `changePage` |
| `AppHeader` | renderiza a barra de abas a partir de `openedPages`, com aba ativa e botão de fechar |
| Content pane | renderiza a página ativa |

### Toques extras

- **Gutter de números de linha** (`components/core/line-numbers.tsx`) — Contador de linhas, semelhante ao do VSCode.
- **Overlay CRT** (`components/core/crt/`) — _scanlines_ com toggle caso atrapalhe na visualização.
- **Sidebar com grupos de pastas colapsáveis** (`components/sidebar/`) — estado persistente usando `stores`.
- **Tema claro/escuro** (`components/theme-provider.tsx`) — `next-themes` + hotkey **`d`** pra alternar entre modos. (ignora quando você digita em algum input).

---

## ✦ Stack

| Camada | Tecnologia |
|---|---|
| Framework | **Next.js 16** (App Router) + **React 19** |
| Estilo | **Tailwind CSS v4** |
| Componentes | **shadcn/ui**  — usando **`@base-ui/react`** |
| Estado | **Zustand** (seletores + `useShallow`) |
| Tema | **next-themes** |
| Animação | **motion** |
| Validação | **Zod** |
| Ícones | **Hugeicons** |
| Linguagem | **TypeScript** |

---

## ✦ Começando

**Pré-requisitos:** Node.js 20.9+ e npm.

```bash
git clone https://github.com/vitozaap/portfolio.git
cd portfolio
npm install
npm run dev      # http://localhost:3000 (Next + Turbopack)
```

### Scripts

| Comando | Ação |
|---|---|
| `npm run dev` | roda o dev server |
| `npm run build` | build de produção |
| `npm run start` | serve o build de produção |
| `npm run lint` | ESLint (flat config via `eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier em `**/*.{ts,tsx}` |

---

## ✦ Estrutura do projeto

```
app/
  layout.tsx          ThemeProvider → SidebarProvider → AppSidebar + (AppHeader + children) + AppFooter
  page.tsx            única rota — shell do content pane
  globals.css         tokens de tema (CSS variables) + config Tailwind v4
components/
  core/
    pages/            ★ sistema de páginas/abas (types, store, views)
    crt/              overlay de scanlines + store
    line-numbers.tsx  gutter de números de linha
    app-header.tsx    barra de abas
    app-footer.tsx    rodapé para detalhamento
  sidebar/            sidebar de arquivos usando grupos colapsáveis
  theme-provider.tsx
  ui/                 componentes do shadcn
hooks/  ·  lib/
```

### Adicionando uma nova "página"

1. Adicione a key no enum do zod: `pagesSchema` em `components/core/pages/types.ts`.
2. Crie o componente da view que renderiza o conteúdo daquela "Página".
3. Adicione o "arquivo/página" na sidebar em `components/sidebar/items.tsx`.

---

<div align="center">

**Victor Santos** · feito com Next.js, claude e amor <3.

</div>
