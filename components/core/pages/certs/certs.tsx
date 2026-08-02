"use client"

import { motion, useReducedMotion } from "motion/react"
import { IdeComment, IdeText } from "../ideTextComponents"
import { clipReveal, slideUp } from "../anim"
import { CertCard } from "./certCard"
import { ResumeCard } from "./resumeCard"
import { certifications, courses, resume } from "./data"

// IdeText renders with `whitespace-pre-line`, which strips leading spaces at
// the start of a line — so YAML indentation has to be non-breaking.
const INDENT = "\u00A0\u00A0"

export default function Certs() {
  const shouldReduce = useReducedMotion()

  // Keeps the entrance stagger continuous across the two lists and the resume.
  let step = 0
  const next = () => ++step

  return (
    <main className="flex min-h-full w-full flex-col gap-6 tracking-wide">
      <motion.div
        {...clipReveal(0, shouldReduce)}
        className="flex flex-col gap-1"
      >
        <IdeComment character="#">
          certificações e cursos — emissores oficiais.
        </IdeComment>
        <IdeComment character="#">
          &apos;verificar&apos; abre a página do emissor.
        </IdeComment>
      </motion.div>

      <section className="flex flex-col gap-3">
        <motion.div {...clipReveal(next(), shouldReduce)}>
          <IdeText>
            <b>certifications:</b>{" "}
            <IdeComment character="#">exame oficial, verificável</IdeComment>
          </IdeText>
        </motion.div>
        {certifications.map((credential) => (
          <motion.div
            key={credential.name}
            {...slideUp(next(), shouldReduce)}
            className="flex flex-col gap-2"
          >
            <IdeText className="max-md:text-xs">
              {INDENT}- {credential.issuer.toLowerCase()}: &quot;
              {credential.name}&quot;
            </IdeText>
            <CertCard credential={credential} status="emitido" />
          </motion.div>
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <motion.div {...clipReveal(next(), shouldReduce)}>
          <IdeText>
            <b>courses:</b>{" "}
            <IdeComment character="#">conclusão de curso</IdeComment>
          </IdeText>
        </motion.div>
        {courses.map((credential) => (
          <motion.div
            key={credential.name}
            {...slideUp(next(), shouldReduce)}
            className="flex flex-col gap-2"
          >
            <IdeText className="max-md:text-xs">
              {INDENT}- {credential.issuer.toLowerCase().replace(/\s+/g, "-")}:
              &quot;{credential.name}&quot;
            </IdeText>
            <CertCard credential={credential} status="concluído" />
          </motion.div>
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <motion.div {...clipReveal(next(), shouldReduce)}>
          <IdeText>
            <b>resume:</b>
            {"\n"}
            {INDENT}file: {resume.name}
          </IdeText>
        </motion.div>
        <motion.div {...slideUp(next(), shouldReduce)}>
          <ResumeCard />
        </motion.div>
      </section>

      <motion.div {...clipReveal(next(), shouldReduce)}>
        <IdeComment character="#">
          lista viva — novas certificações e cursos entram aqui.
        </IdeComment>
      </motion.div>
    </main>
  )
}
