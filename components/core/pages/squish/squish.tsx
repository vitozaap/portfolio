"use client"

import { motion, useReducedMotion } from "motion/react"
import {
  CloudUploadIcon,
  CpuIcon,
  LiveStreaming01Icon,
  WorkflowSquare01Icon,
} from "@hugeicons/core-free-icons"
import {
  IdeComment,
  IdeText,
  IdeTextGroup,
  IdeTextHighlighted,
} from "../ideTextComponents"
import { clipReveal, slideUp } from "../anim"
import { ProjectCard, type Project } from "../project/projectCard"
import { Highlights, type Highlight } from "../project/highlights"
import { Architecture, type ArchNode } from "../project/architecture"
import { RepoList, type Repo } from "../project/repoList"

const SQUISH: Project = {
  name: "Squish",
  tagline: "plataforma de compressão de vídeo",
  status: "em produção · aprimoramento constante",
  stack: [
    "NestJS 11",
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Prisma 7",
    "PostgreSQL",
    "BullMQ",
    "Redis",
    "MinIO",
    "FFmpeg",
    "Docker",
    "GitHub Actions",
    "Sentry",
  ],
  summary:
    "Plataforma fullstack de compressão de vídeo: o upload vai direto ao object storage por URL pré-assinada, um worker dedicado consome a fila com FFmpeg e o progresso volta em tempo real por SSE.",
  role: "Idealizador, arquiteto e dev fullstack — API, worker, front-end e infraestrutura.",
  links: [
    {
      label: "→ squish.digital",
      href: "https://squish.digital",
      primary: true,
    },
    { label: "→ api reference", href: "https://api.squish.digital/reference" },
  ],
}

const ARCHITECTURE: ArchNode[] = [
  {
    step: "01",
    kind: "client",
    name: "web",
    description:
      "Next.js 16 com XState e TanStack Query: envia o vídeo direto ao storage e acompanha o job por SSE.",
    repo: "saturn-web",
  },
  {
    step: "02",
    kind: "control plane",
    name: "api",
    description:
      "NestJS 11 com Prisma 7 e Better-Auth: emite a URL pré-assinada, abre sessão anônima e enfileira o job.",
    repo: "saturn-api",
  },
  {
    step: "03",
    kind: "fila",
    name: "redis",
    description:
      "BullMQ num Redis para a fila e um segundo Redis para o pub/sub que alimenta o SSE.",
    repo: "infra",
  },
  {
    step: "04",
    kind: "worker",
    name: "ffmpeg",
    description:
      "Node.js + FFmpeg: claim idempotente, download e upload em streaming, retry com backoff e graceful shutdown.",
    repo: "saturn-compression-worker",
  },
]

const REPOS: Repo[] = [
  {
    name: "saturn-web",
    description: "Next.js 16 · React 19 · XState · TanStack Query · shadcn/ui",
    url: "https://github.com/vitozaap/saturn-web",
  },
  {
    name: "saturn-api",
    description:
      "NestJS 11 · Prisma 7 · Better-Auth · BullMQ · SSE · Swagger/Scalar",
    url: "https://github.com/vitozaap/saturn-api",
  },
  {
    name: "saturn-compression-worker",
    description: "Node.js · TypeScript · FFmpeg · BullMQ · Zod",
    url: "https://github.com/vitozaap/saturn-compression-worker",
  },
]

const HIGHLIGHTS: Highlight[] = [
  {
    icon: CloudUploadIcon,
    title: "Upload direto ao storage",
    description:
      "URL pré-assinada do MinIO: o vídeo nunca passa pelo servidor web, e regras de ciclo de vida expiram o arquivo bruto depois de um dia.",
  },
  {
    icon: LiveStreaming01Icon,
    title: "Tempo real sem polling",
    description:
      "Progresso por SSE alimentado por pub/sub no Redis, com reconexão automática no cliente.",
  },
  {
    icon: CpuIcon,
    title: "Worker resiliente",
    description:
      "Claim idempotente (jobId = compressionId), streaming em vez de buffer, retry com backoff e shutdown que espera o encode terminar.",
  },
  {
    icon: WorkflowSquare01Icon,
    title: "Infra e CI/CD",
    description:
      "Docker Compose numa VPS ARM (API, MinIO, Redis e worker) e GitHub Actions publicando imagens ARM64 no ghcr.io.",
  },
]

export default function Squish() {
  const shouldReduce = useReducedMotion()

  return (
    <main className="flex min-h-full w-full flex-col gap-6 tracking-wide">
      <motion.div {...clipReveal(0, shouldReduce)}>
        <IdeComment>
          squish — plataforma de compressão de vídeo. veja o preview abaixo.
        </IdeComment>
      </motion.div>

      <section className="flex max-w-full flex-col gap-4 md:max-w-10/12">
        <motion.div {...clipReveal(1, shouldReduce)}>
          <IdeText>
            <b>import</b> {"{ CompressorModule }"} <b>from</b>{" "}
            <IdeTextHighlighted variant="dotted">
              {'"@squish/api"'}
            </IdeTextHighlighted>{" "}
            {"\n"}
            <b>import</b> {"{ CompressionWorker }"} <b>from</b>{" "}
            <IdeTextHighlighted variant="dotted">
              {'"@squish/worker"'}
            </IdeTextHighlighted>{" "}
            {"\n"}
            <b>import</b> {"{ MinioService }"} <b>from</b>{" "}
            <IdeTextHighlighted variant="dotted">
              {'"@squish/storage"'}
            </IdeTextHighlighted>
          </IdeText>
        </motion.div>

        <motion.div {...clipReveal(2, shouldReduce)}>
          <IdeTextGroup
            curlyBrackets
            groupTitle={
              <IdeText>
                <b>export const</b>&nbsp;Squish = () =&gt;
              </IdeText>
            }
          >
            <IdeText>
              <IdeComment>
                upload pré-assinado → BullMQ → worker ffmpeg → SSE
              </IdeComment>{" "}
              {"\n"}
              <b>return</b> pipeline {"\n"}
              .presign()&nbsp;&nbsp;
              <IdeComment>URL pré-assinada do MinIO</IdeComment> {"\n"}
              .enqueue()&nbsp;&nbsp;
              <IdeComment>BullMQ, jobId = compressionId</IdeComment> {"\n"}
              .compress()&nbsp;
              <IdeComment>
                ffmpeg libx264 — presets HIGH/MID/LOW
              </IdeComment>{" "}
              {"\n"}
              .stream()&nbsp;&nbsp;&nbsp;
              <IdeComment>status ao vivo via Redis pub/sub</IdeComment>
            </IdeText>
          </IdeTextGroup>
        </motion.div>
      </section>

      <section className="flex flex-col gap-3">
        <motion.div {...slideUp(3, shouldReduce)}>
          <IdeComment>preview ↓</IdeComment>
        </motion.div>
        <motion.div {...slideUp(4, shouldReduce)}>
          <ProjectCard project={SQUISH} />
        </motion.div>
      </section>

      <section className="flex flex-col gap-3">
        <motion.div {...slideUp(5, shouldReduce)}>
          <IdeComment>arquitetura</IdeComment>
        </motion.div>
        <motion.div {...slideUp(6, shouldReduce)}>
          <Architecture nodes={ARCHITECTURE} />
        </motion.div>
        <motion.div {...clipReveal(7, shouldReduce)}>
          <IdeComment>presign → enqueue → compress → deliver</IdeComment>
        </motion.div>
      </section>

      <section className="flex flex-col gap-3">
        <motion.div {...slideUp(8, shouldReduce)}>
          <IdeComment>repositórios</IdeComment>
        </motion.div>
        <motion.div {...slideUp(9, shouldReduce)}>
          <RepoList repos={REPOS} />
        </motion.div>
      </section>

      <section className="flex flex-col gap-3">
        <motion.div {...slideUp(10, shouldReduce)}>
          <IdeComment>destaques</IdeComment>
        </motion.div>
        <motion.div {...slideUp(11, shouldReduce)}>
          <Highlights items={HIGHLIGHTS} />
        </motion.div>
      </section>

      <motion.div
        {...clipReveal(12, shouldReduce)}
        className="flex flex-col gap-1"
      >
        <IdeComment>notas</IdeComment>
        <IdeComment>
          - presets libx264 HIGH/MID/LOW com limite de resolução por preset
        </IdeComment>
        <IdeComment>
          - documentação Swagger/Scalar, testes com Vitest e monitoramento com
          Sentry
        </IdeComment>
        <IdeComment>
          - os repositórios ainda carregam o codinome saturn, anterior ao nome
          do produto
        </IdeComment>
      </motion.div>
    </main>
  )
}
