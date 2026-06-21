"use client"

import { motion, useReducedMotion } from "motion/react"
import { IdeComment, IdeText, IdeTextGroup, IdeTextHighlighted } from "../ideTextComponents";
import { IdeRunnable } from "./ideRunnable";

const BIO = "Me chamo Victor Santos, e adoro tecnologia. Comecei bem cedo a me interessar pela área, e hoje, venho me desenvolvendo como programador fullstack.";
const GREET = "olá, vamos construir algo?";

export default function About() {
    const shouldReduce = useReducedMotion()

    function animItem(index: number) {
        return {
            initial: shouldReduce ? undefined : { clipPath: 'inset(0 100% 0 0)' as const },
            animate: shouldReduce ? undefined : { clipPath: 'inset(0 0% 0 0)' as const },
            transition: shouldReduce ? undefined : { duration: 0.4, ease: 'easeOut' as const, delay: index * 0.1 },
        }
    }

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
                            name     = <IdeTextHighlighted variant={"dotted"}>{'"'}Victor Santos{'"'}</IdeTextHighlighted> {"\n"}
                            role     = <IdeTextHighlighted variant={"dotted"}>{'"'}Software Engineer{'"'}</IdeTextHighlighted> {"\n"}
                            location = <IdeTextHighlighted variant={"dotted"}>{'"'}Brasil{'"'}</IdeTextHighlighted> {"\n"}
                            {"\n"}
                            <IdeComment>o que me move</IdeComment> {"\n"}
                            <IdeTextGroup brackets groupTitle={<IdeText>passions =</IdeText>}>
                                <IdeTextHighlighted variant={"dotted"}>
                                    {'"'}construir sistemas que escalam{'"'}, {"\n"}
                                    {'"'}arquitetura limpa e pragmática{'"'}, {"\n"}
                                    {'"'}aprender continuamente{'"'}, {"\n"}
                                    {'"'}código que outros conseguem ler{'"'}, {"\n"}
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
