import type { IconifyIcon } from "@iconify/react"

type Status = "Ativo" | "Desenvolvimento" | "Finalizado" | "Manutenção"

export const statusClassName: Record<Status, string> = {
  Ativo: "bg-green-500/15 text-green-700 dark:text-green-400",
  Desenvolvimento: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  Finalizado: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-400",
  Manutenção: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
}

type Project = {
  title: string
  about: string
  status: Status
  icon?: string | IconifyIcon
  url: string
}

export const projects: Project[] = [
  {
    title: "Squish",
    about:
      "Compressor de vídeo web com processamento em nuvem. Redução de tamanho de arquivo em até -90%",
    status: "Ativo",
    url: "https://github.com/vitozaap/saturn-api"
  },
  {
    title: "Modelo N-grama",
    about:
      "Modelo capaz de prever palavras dado um contexto usando grafos e treinado com contexto de PDFs.",
    status: "Finalizado",
    url: "https://github.com/vitozaap/ngrama"
  },
  {
    title: "Portfolio",
    about:
      "Este portfólio que está vendo :). Dê uma olhada em seu código fonte.",
    status: "Ativo",
    url: "https://github.com/vitozaap/portfolio"
  },
  {
    title: "Ffmpeg CLI Wrapper",
    about:
      "Wrapper em formato CLI do ffmpeg feito em python capaz de converter e comprimir arquivos de vídeo. Usei como projeto final do curso de Harvard.",
    status: "Manutenção",
    url: "https://github.com/vitozaap/cs50-python-final-project"
  },
]
