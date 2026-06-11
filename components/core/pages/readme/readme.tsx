import { findItemByPage } from "@/components/sidebar/items";
import { usePagesActions } from "../store";
import { FileCard, FileCardDescription, FileCardKicker, fileCards, FileCardTitle } from "./fileCard";
import { TextCard, TextCardTitle, TextCardDescription } from "./textCard";

export default function Readme() {
  const pagesActions = usePagesActions()
  return (
    <main className="flex flex-col min-h-full w-full gap-6">
      <div className="flex w-full p-1.5 bg-foreground">
        <div className="flex flex-col w-full gap-3 justify-center text-background p-3 border border-background/30">
          <h1 className="font-bold text-8xl tracking-tight font-heading">VICTOR<span className="text-background/50 px-2">/</span>SANTOS</h1>
          <div className="flex gap-4 items-center uppercase tracking-wider text-xs">
            <p className="border border-background p-2">Software Engineer</p>
            <p>Fullstack • TS • INGLÊS • AWS • DOCKER</p>
          </div>
        </div>
      </div>

      <TextCard>
        <TextCardTitle>olá, mundo.</TextCardTitle>
        <TextCardDescription>Eu sou o <b>Victor Santos</b>, engenheiro de software fullstack.
          Comecei cedo, por curiosidade. Hoje construo sistemas que rodam
          em produção: APIs, infra, front, banco — o pacote completo.</TextCardDescription>
      </TextCard>

      <TextCard>
        <TextCardTitle>navegação</TextCardTitle>
        <TextCardDescription>
          Clique nos cards abaixo ou navegue pela sidebar ao seu lado. <br /> Ou use o atalho: <b>⌘K (Ctrl+K)</b> → command palette.
        </TextCardDescription>
      </TextCard>

      <div className="grid grid-cols-2 gap-6">
        {fileCards.map((item, index) =>
        (
          <FileCard key={item.page} onClick={() => {
            const target = findItemByPage(item.page)
            if (target) pagesActions.changePage(target)
          }}>
            <FileCardKicker>
              {String(index + 1).padStart(2, "0")} / {item.kicker}
            </FileCardKicker>
            <FileCardTitle>{item.title}</FileCardTitle>
            <FileCardDescription>{item.description}</FileCardDescription>
          </FileCard>))}
      </div>

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
    </main>
  );
}
