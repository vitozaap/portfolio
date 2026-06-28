"use client"

import { motion, useReducedMotion } from "motion/react"
import {
    AiBrain01Icon,
    CloudServerIcon,
    TestTube01Icon,
    WorkflowSquare01Icon,
} from "@hugeicons/core-free-icons"
import { IdeComment, IdeText, IdeTextGroup, IdeTextHighlighted } from "../ideTextComponents"
import { clipReveal, slideUp } from "../anim"
import { ProjectCard, type Project } from "./projectCard"
import { Highlights, type Highlight } from "./highlights"

const SATURN: Project = {
    name: "Saturn",
    tagline: "API de compressão de vídeo em nuvem",
    status: "em desenvolvimento",
    stack: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "AWS", "Docker", "Vitest"],
    summary:
        "Control-plane em NestJS que emite URLs S3 pré-assinadas, orquestra o ciclo de vida do job em Postgres e dispara workers Fargate (ffmpeg) via SQS, entregando o resultado de volta no S3.",
    role: "Arquiteto e desenvolvedor — back-end, infra AWS e CI/CD.",
    url: "https://github.com/vitozaap/saturn-api",
}

const HIGHLIGHTS: Highlight[] = [
    {
        icon: CloudServerIcon,
        title: "AWS escalável",
        description:
            "S3 + URLs pré-assinadas, fila SQS e workers Fargate sob demanda; deploy em ECR/ECS (sa-east-1).",
    },
    {
        icon: WorkflowSquare01Icon,
        title: "CI/CD",
        description:
            "GitHub Actions: testes em cada PR e deploy automático da imagem Docker no ECR via OIDC.",
    },
    {
        icon: TestTube01Icon,
        title: "Testes unitários",
        description:
            "Vitest cobrindo controller, service, DTOs e integração S3, com cobertura v8 no CI.",
    },
    {
        icon: AiBrain01Icon,
        title: "IA no fluxo",
        description:
            "Construído com Claude Code: arquitetura, testes e PRs assistidos por IA seguindo Conventional Commits.",
    },
]

export default function Saturn() {
    const shouldReduce = useReducedMotion()

    return (
        <main className="flex w-full min-h-full flex-col gap-6 tracking-wide">
            <motion.div {...clipReveal(0, shouldReduce)}>
                <IdeComment>saturn — API de compressão de vídeo em nuvem. veja o preview abaixo.</IdeComment>
            </motion.div>

            <section className="flex flex-col gap-4 max-w-full md:max-w-10/12">
                <motion.div {...clipReveal(1, shouldReduce)}>
                    <IdeText>
                        <b>import</b> {"{ CompressorModule }"} <b>from</b>{" "}
                        <IdeTextHighlighted variant="dotted">{'"@saturn/compressor"'}</IdeTextHighlighted> {"\n"}
                        <b>import</b> {"{ S3Service }"} <b>from</b>{" "}
                        <IdeTextHighlighted variant="dotted">{'"@saturn/aws"'}</IdeTextHighlighted> {"\n"}
                        <b>import</b> {"{ PrismaService }"} <b>from</b>{" "}
                        <IdeTextHighlighted variant="dotted">{'"@saturn/db"'}</IdeTextHighlighted>
                    </IdeText>
                </motion.div>

                <motion.div {...clipReveal(2, shouldReduce)}>
                    <IdeTextGroup curlyBrackets groupTitle={<IdeText><b>export const</b> Saturn = () =&gt;</IdeText>}>
                        <IdeText>
                            <IdeComment>upload pré-assinado → SQS → workers Fargate (ffmpeg) → S3</IdeComment> {"\n"}
                            <b>return</b> pipeline {"\n"}
                            .presign()&nbsp;&nbsp;<IdeComment>S3 presigned URL</IdeComment> {"\n"}
                            .enqueue()&nbsp;&nbsp;<IdeComment>SQS on ObjectCreated</IdeComment> {"\n"}
                            .compress()&nbsp;<IdeComment>ffmpeg em Fargate</IdeComment> {"\n"}
                            .deliver()&nbsp;&nbsp;<IdeComment>grava em compressed/ + status COMPLETED</IdeComment>
                        </IdeText>
                    </IdeTextGroup>
                </motion.div>
            </section>

            <section className="flex flex-col gap-3">
                <motion.div {...slideUp(3, shouldReduce)}>
                    <IdeComment>preview ↓</IdeComment>
                </motion.div>
                <motion.div {...slideUp(4, shouldReduce)}>
                    <ProjectCard project={SATURN} />
                </motion.div>
            </section>

            <section className="flex flex-col gap-3">
                <motion.div {...slideUp(5, shouldReduce)}>
                    <IdeComment>destaques</IdeComment>
                </motion.div>
                <motion.div {...slideUp(6, shouldReduce)}>
                    <Highlights items={HIGHLIGHTS} />
                </motion.div>
            </section>

            <motion.div {...clipReveal(7, shouldReduce)} className="flex flex-col gap-1">
                <IdeComment>próximos passos</IdeComment>
                <IdeComment>- dashboard de jobs em tempo real</IdeComment>
                <IdeComment>- presets configuráveis por usuário</IdeComment>
                <IdeComment>- billing por minuto processado</IdeComment>
            </motion.div>
        </main>
    )
}
