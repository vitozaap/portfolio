import { IdeComment, IdeText, IdeTextGroup } from "./ideTextComponents";

export default function About() {
    return (
        <main className="flex flex-col w-full min-h-full gap-6 tracking-wide">
            <IdeComment>Quem sou? Leia o código abaixo.</IdeComment>
            <section className="flex flex-col gap-4 max-w-8/12">
                <IdeTextGroup curlyBrackets groupTitle={<IdeText><b>interface</b> Engineer</IdeText>}>
                    name: string  {"\n"}
                    role: string  {"\n"}
                    location: string  {"\n"}
                    passions: string[]  {"\n"}
                </IdeTextGroup>
                <IdeTextGroup curlyBrackets groupTitle={<IdeText><b>export class</b> Victor <b>implements</b> Engineer</IdeText>}>
                    <IdeText>
                        name     = "Victor Santos" {"\n"}
                        role     = "Software Engineer" {"\n"}
                        location = "Brasil" {"\n"}
                        {"\n"}
                        <IdeComment>o que me move</IdeComment> {"\n"}
                        <IdeTextGroup brackets groupTitle={<IdeText>passions =</IdeText>}>
                            construir sistemas que escalam", {"\n"}
                            "arquitetura limpa e pragmática", {"\n"}
                            "aprender continuamente", {"\n"}
                            "código que outros conseguem ler", {"\n"}
                        </IdeTextGroup>
                    </IdeText>
                    <IdeTextGroup curlyBrackets groupTitle={<IdeText>bio(): string</IdeText>}>
                        <IdeText>
                            return `Me chamo Victor Santos, e adoro tecnologia. Comecei bem cedo a me interessar pela área, e hoje, venho me desenvolvendo como programador fullstack.`
                        </IdeText>
                    </IdeTextGroup>
                    <IdeTextGroup curlyBrackets groupTitle={<IdeText>greet(): string</IdeText>} >
                        <IdeText>
                            return "olá, vamos construir algo?"
                        </IdeText>
                    </IdeTextGroup>
                </IdeTextGroup>
            </section>
        </main>
    )
}