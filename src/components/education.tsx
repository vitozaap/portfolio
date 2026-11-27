import { Icon, type IconifyIcon } from "@iconify/react"
import { ArrowUpRight } from "lucide-react"
import { compareDatesDesc } from "@/lib/date"
import { harvardIcon } from "./icons/harvard"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "./ui/item"
import { Progress } from "./ui/progress"

type Education = {
  title: string
  url?: string
  description?: string
  provider: string
  icon?: string | IconifyIcon
  date: string
  progress?: number
}

const educations: Education[] = [
  {
    title: "Análise e Desenvolvimento de Sistemas",
    provider: "SENAC SP",
    description: "3º de 5 semestres · Previsão Dez/2027",
    progress: 60,
    url: "https://www.sp.senac.br/graduacao/tecnologia-em-analise-e-desenvolvimento-de-sistemas",
    date: "2025 - atual",
  },
  {
    title: "AWS Cloud Practitioner",
    provider: "Amazon Web Services",
    icon: "simple-icons:amazonwebservices",
    url: "https://www.credly.com/badges/aa9c6f00-2b7e-4422-bd34-21793e61452f/public_url",
    date: "2026",
  },
  {
    title: "Técnico em Engenharia de Sistemas",
    provider: "Instituto NS de Fátima",
    url: "https://vestibular.acaonsfatima.org.br/cursos/68b8f0b6528e20aa67a1e477",
    date: "2022",
  },
  {
    title: "Inglês avançado",
    provider: "Instituto NS de Fátima",
    url: "https://vestibular.acaonsfatima.org.br/cursos/68b8f0b6528e20aa67a1e47e",
    date: "2024",
  },
  {
    title: "Inglês Básico - Intermediário",
    provider: "Instituto NS de Fátima",
    url: "https://vestibular.acaonsfatima.org.br/cursos/68b8f0b6528e20aa67a1e47d",
    date: "2023",
  },
  {
    title: "Github Essentials",
    provider: "Datacamp",
    icon: "simple-icons:datacamp",
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/bce41791ee2337815d46e71d247046af479bb4ec?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa",
    date: "2026",
  },
  {
    title: "Prompt Design in Vertex AI Skill Badge",
    provider: "Google Cloud",
    icon: "logos:google-cloud",
    url: "https://www.credly.com/badges/4288a29b-1ae6-4ce6-84d4-2aa2f7891d4b/public_url",
    date: "2026",
  },
  {
    title: "Harvard's Introduction to Programming with Python",
    provider: "HarvardX",
    icon: harvardIcon,
    url: "https://certificates.cs50.io/cc135a27-67e6-45e4-b1f5-75b62c6d0c84.pdf?size=letter",
    date: "2026",
  },
  {
    title: "AWS Developer Associate",
    provider: "Amazon Web Services",
    icon: "simple-icons:amazonwebservices",
    progress: 35,
    date: "2026 - atual",
  },
]

function compareEducation(a: Education, b: Education) {
  const aInProgress = a.progress !== undefined
  const bInProgress = b.progress !== undefined
  if (aInProgress !== bInProgress) return aInProgress ? -1 : 1

  return (
    compareDatesDesc(a.date, b.date) || a.title.localeCompare(b.title, "pt-BR")
  )
}

const sortedEducations = [...educations].sort(compareEducation)
const inProgress = sortedEducations.filter((e) => e.progress !== undefined)
const completed = sortedEducations.filter((e) => e.progress === undefined)

function ExternalLinkIcon() {
  return (
    <ArrowUpRight
      aria-hidden
      className="size-4 text-muted-foreground transition-colors group-hover/link:text-foreground"
    />
  )
}

function ProviderIcon({ icon }: { icon?: string | IconifyIcon }) {
  return (
    <ItemMedia className="size-8 rounded-md border bg-background">
      <Icon icon={icon ?? "lucide:graduation-cap"} width={16} />
    </ItemMedia>
  )
}

function InProgressCard({
  title,
  provider,
  icon,
  description,
  progress,
  date,
  url,
}: Education) {
  const card = (
    <Card size="sm" className="transition-colors group-hover/link:bg-muted">
      <CardHeader className="flex items-center gap-2.5">
        <ProviderIcon icon={icon} />
        <div className="flex flex-1 flex-col">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{provider}</CardDescription>
        </div>
        {url && <ExternalLinkIcon />}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Progress
          value={progress ?? 0}
          aria-label={`Progresso em ${title}`}
          className="**:data-[slot=progress-indicator]:bg-amber-500 **:data-[slot=progress-track]:h-1.5"
        />
        <p className="text-muted-foreground">
          {description ?? `${progress}% concluído · ${date}`}
        </p>
      </CardContent>
    </Card>
  )

  if (!url) return card
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      {card}
    </a>
  )
}

function CompletedItem({ title, provider, icon, date, url }: Education) {
  const content = (
    <>
      <ProviderIcon icon={icon} />
      <ItemContent className="gap-0">
        <ItemTitle className="font-heading text-sm">{title}</ItemTitle>
        <ItemDescription>
          {provider} · {date}
        </ItemDescription>
      </ItemContent>
      {url && (
        <ItemActions>
          <ExternalLinkIcon />
        </ItemActions>
      )}
    </>
  )

  if (!url) return <Item size="sm">{content}</Item>
  return (
    <Item
      size="sm"
      className="group/link"
      render={
        <a href={url} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      }
    />
  )
}

export default function Education() {
  return (
    <div className="flex flex-col gap-2">
      {inProgress.map((education) => (
        <InProgressCard key={education.title} {...education} />
      ))}
      <ItemGroup className="gap-1">
        {completed.map((education) => (
          <CompletedItem key={education.title} {...education} />
        ))}
      </ItemGroup>
    </div>
  )
}
