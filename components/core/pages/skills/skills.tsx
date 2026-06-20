import { IdeComment, IdeText, IdeTextGroup, IdeTextHighlighted } from "../ideTextComponents";
import { Level } from "./level";

const items: { name: string, value: number, comment?: string }[] = [
    {
        name: "Typescript",
        value: 85
    },
    {
        name: "Python",
        value: 48,
        comment: "Cursando CS50P de Harvard"
    },
    {
        name: "Dev com IA",
        value: 90,
        comment: "3x Anthropic Claude code and AI Fluency"
    },
    {
        name: "AWS Cloud",
        value: 70,
        comment: "Em proceso para Cloud Practitioner."
    },
    {
        name: "Git & CI/CD",
        value: 70,
    },
    {
        name: "Inglês",
        value: 90,
        comment: "Nível C1"
    },
    {
        name: "Node.js",
        value: 80
    },
    {
        name: "NestJs",
        value: 70
    },
    {
        name: "Docker",
        value: 65
    },
    {
        name: "React",
        value: 75
    },
    {
        name: "Postgres + ORMs",
        value: 75
    },
]

export default function Skills() {
    return (
        <main className="flex flex-col gap-6 w-full">
            <IdeTextGroup curlyBrackets>
                <IdeTextGroup groupTitle={<IdeTextHighlighted variant={"dotted"}>"stack": </IdeTextHighlighted>} brackets>
                    {items.map((item) => (
                        <div className="flex flex-col gap-1" key={item.name}>
                            <IdeTextGroup curlyBrackets>
                                <div className="flex gap-2 items-center max-sm:grid max-sm:grid-cols-[auto_1fr]">
                                    <IdeTextHighlighted variant={"dotted"} className="whitespace-nowrap">"name"{":"} <b>"{item.name}"</b></IdeTextHighlighted>
                                    <IdeTextHighlighted variant={"dotted"} className="whitespace-nowrap max-sm:justify-self-end">"level"{":"} <b>"{item.value}"</b></IdeTextHighlighted>
                                    {item.comment ? <IdeComment className="max-sm:col-span-2">{item.comment}</IdeComment> : null}
                                </div>
                                <div className="flex w-full gap-2 justify-between items-center">
                                    <IdeText className="whitespace-nowrap max-sm:hidden"><b>{item.name}</b></IdeText> <Level className={"w-10/12"} value={item.value}>{item.value}</Level>
                                </div>
                            </IdeTextGroup>
                        </div>
                    ))}
                </IdeTextGroup>
            </IdeTextGroup>
        </main>
    )
} 