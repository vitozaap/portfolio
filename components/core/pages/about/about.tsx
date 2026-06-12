import { IdeComment, IdeText, IdeTextGroup, IdeTextHighlighted } from "./ideTextComponents";

export default function About() {
    return (
        <main className="flex flex-col w-full min-h-full gap-6 tracking-wide">
            <IdeComment>Quem sou? Leia o código abaixo.</IdeComment>
            <section className="flex flex-col gap-4 max-w-8/12">
                <IdeTextGroup curlyBrackets groupTitle={<IdeText><b>interface</b> Engineer</IdeText>}>
                    <IdeText>
                        name: string  {"\n"}
                        role: string  {"\n"}
                        location: string  {"\n"}
                        passions: string[]  {"\n"}
                    </IdeText>
                </IdeTextGroup>
                <IdeTextGroup curlyBrackets groupTitle={<IdeText><b>export class</b> Victor <b>implements</b> Engineer</IdeText>}>
                    <IdeText>
                        name     = <IdeTextHighlighted variant={"dotted"}>"Victor Santos"</IdeTextHighlighted> {"\n"}
                        role     = "<IdeTextHighlighted variant={"dotted"}>Software Engineer"</IdeTextHighlighted> {"\n"}
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
                            return `Me chamo Victor Santos, e adoro tecnologia. Comecei bem cedo a me interessar pela área, e hoje, venho me desenvolvendo como programador fullstack.`
                        </IdeText>
                    </IdeTextGroup>
                    <IdeTextGroup curlyBrackets groupTitle={<IdeText><IdeTextHighlighted>greet</IdeTextHighlighted>(): string</IdeText>} >
                        <IdeText>
                            return "olá, vamos construir algo?"
                        </IdeText>
                    </IdeTextGroup>
                </IdeTextGroup>
            </section>
        </main>
    )
}