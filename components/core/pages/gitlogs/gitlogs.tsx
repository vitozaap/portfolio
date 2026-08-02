"use client"

import { motion, useReducedMotion } from "motion/react"
import { IdeComment } from "../ideTextComponents"
import { clipReveal, slideUp } from "../anim"
import { CommitRow } from "./commitRow"
import { RefChip } from "./refChip"
import { commits } from "./data"

export default function Gitlogs() {
  const shouldReduce = useReducedMotion()

  return (
    <main className="flex min-h-full w-full flex-col gap-6 tracking-wide">
      <motion.div
        {...clipReveal(0, shouldReduce)}
        className="flex flex-col gap-1"
      >
        <IdeComment character="#">
          minha trajetória em forma de commits — do mais recente ao primeiro.
        </IdeComment>
        <IdeComment character="$">git log --graph --decorate --all</IdeComment>
      </motion.div>

      <section className="flex flex-col">
        {commits.map((commit, index) => (
          <motion.div key={commit.hash} {...slideUp(index + 1, shouldReduce)}>
            <CommitRow commit={commit} isLast={index === commits.length - 1} />
          </motion.div>
        ))}
      </section>

      <motion.div
        {...clipReveal(commits.length + 1, shouldReduce)}
        className="flex flex-col gap-2 border-t-2 border-dashed border-muted-foreground pt-4"
      >
        <IdeComment character="#">legenda das refs</IdeComment>
        <div className="flex flex-wrap items-center gap-2">
          <RefChip kind="head" label="HEAD → main" />
          <IdeComment character="—">onde estou agora</IdeComment>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RefChip kind="branch" label="feat/exemplo" />
          <IdeComment character="—">em curso, ainda mudando</IdeComment>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RefChip kind="tag" label="exemplo" />
          <IdeComment character="—">concluído, ponto fixo</IdeComment>
        </div>
      </motion.div>

      <motion.div {...clipReveal(commits.length + 2, shouldReduce)}>
        <IdeComment character="#">
          fim do histórico. o próximo commit pode ser com você.
        </IdeComment>
      </motion.div>
    </main>
  )
}
