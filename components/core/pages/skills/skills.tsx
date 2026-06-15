import { IdeComment, IdeText, IdeTextGroup, IdeTextHighlighted } from "../ideTextComponents";
import { Level } from "./level";

const items: { name: string, value: number, comment?: string }[] = [
    {
        name: "Typescript",
        value: 85
    },
    {
        name: "Node.js",
        value: 80
    },
    {
        name: "Prisma ORM",
        value: 75
    },
    {
        name: "Next.js",
        value: 80
    },
    {
        name: "Postgres",
        value: 75
    },
    {
        name: "AWS Cloud",
        value: 80,
        comment: "Em proceso para Cloud Practitioner."
    }
]

export default function Skills() {
    return (
        <main className="flex flex-col gap-6 w-full">
            <IdeTextGroup curlyBrackets>
                <IdeTextGroup groupTitle={<IdeTextHighlighted variant={"dotted"}>"stack": </IdeTextHighlighted>} brackets>
                    {items.map((item) => (
                        <div className="flex flex-col gap-1" key={item.name}>
                            <IdeTextGroup curlyBrackets>
                                <div className="flex gap-2 items-center">
                                    <IdeTextHighlighted variant={"dotted"}>"name"{":"} "{item.name}"</IdeTextHighlighted>
                                    <IdeTextHighlighted variant={"dotted"}>"level" {":"} "{item.value}"</IdeTextHighlighted>
                                    {item.comment ? <IdeComment>{item.comment}</IdeComment> : null}
                                </div>
                                <div className="flex w-full justify-between items-center">
                                    <IdeText><b>{item.name}</b></IdeText> <Level className={"w-10/12"} value={item.value}>{item.value}</Level>
                                </div>
                            </IdeTextGroup>
                        </div>
                    ))}
                </IdeTextGroup>
            </IdeTextGroup>
        </main>
    )
} 