// Career milestones written as commits. Ordered newest first, like `git log`.
//
// Refs follow the metaphor literally: anything still running is a branch,
// anything finished and dated is a tag. Dates carry only the precision the
// underlying record actually has — a bare year where only the year is known.

export type RefKind = "head" | "branch" | "tag"

export interface CommitRef {
  kind: RefKind
  label: string
}

export interface Commit {
  hash: string
  date: string
  title: string
  body: string
  refs?: CommitRef[]
}

export const commits: Commit[] = [
  {
    hash: "a1f9c3d",
    date: "2026",
    title: "feat(squish): plataforma de compressão de vídeo em produção",
    body: "API em NestJS, worker FFmpeg consumindo BullMQ e front em Next.js 16. No ar em squish.digital.",
    refs: [{ kind: "head", label: "HEAD → main" }],
  },
  {
    hash: "6b02f47",
    date: "2026",
    title: "feat(portfolio): vitozap.dev — portfólio como IDE",
    body: "Next.js 16 e Tailwind v4, com árvore de arquivos, tab bar e estado em Zustand numa rota única.",
  },
  {
    hash: "7b42e08",
    date: "2026-07",
    title: "chore(course): GitHub Foundations",
    body: "Curso de 9h no DataCamp, preparatório para a certificação oficial da GitHub.",
    refs: [{ kind: "tag", label: "github-foundations" }],
  },
  {
    hash: "3d5a91c",
    date: "2026-06",
    title: "chore(cert): AWS Certified Cloud Practitioner",
    body: "Exame CLF-C02 aprovado. Badge verificável na Credly.",
    refs: [{ kind: "tag", label: "aws-clf-c02" }],
  },
  {
    hash: "e60c47a",
    date: "2026",
    title: "feat(ffmpyg): CLI de compressão de vídeo em Python",
    body: "Projeto final do CS50P: três presets, wizard interativo e testes com subprocess mockado.",
    refs: [{ kind: "tag", label: "cs50p" }],
  },
  {
    hash: "5f80b2e",
    date: "2025-08",
    title: "feat(edu): Análise e Desenvolvimento de Sistemas — SENAC",
    body: "Campus Jurubatuba, presencial. Terceiro semestre; conclusão prevista para dezembro de 2027.",
    refs: [{ kind: "branch", label: "feat/ads-senac" }],
  },
  {
    hash: "2a7e6d4",
    date: "2025-05",
    title: "feat(career): Analista de Monitoramento Júnior na MC1 Global",
    body: "De 15 a 30 servidores AWS e GCP com Zabbix e Grafana, e cerca de 200 incidentes por mês triados via Jira.",
    refs: [{ kind: "branch", label: "feat/mc1-global" }],
  },
  {
    hash: "c4b3f19",
    date: "2023",
    title: "chore(lang): inglês avançado — C1 Cambridge",
    body: "560 horas no Instituto Social Nossa Senhora de Fátima.",
    refs: [{ kind: "tag", label: "english-c1" }],
  },
  {
    hash: "8e2d05b",
    date: "2022",
    title: "feat(edu): Engenharia de Software — 1200h",
    body: "Node.js, React, C#, JavaScript e MySQL no Instituto Social Nossa Senhora de Fátima.",
    refs: [{ kind: "tag", label: "eng-software" }],
  },
  {
    hash: "init",
    date: "20xx",
    title: "init: curiosidade vira carreira",
    body: "Comecei cedo, mexendo em código por gosto. Continuo.",
  },
]
