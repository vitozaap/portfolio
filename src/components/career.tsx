import { compareDatesDesc, isCurrent } from "@/lib/date"
import { Badge } from "./ui/badge"

type Job = {
  title: string
  description: string
  date: string
  company: string
  location: string
}

const jobs: Job[] = [
  {
    title: "Analista de Monitoramento",
    description:
      "Monitoração de 20/30 servidores em nuvem AWS e GCP através de Grafana e Zabbix",
    date: "2025 - atual",
    company: "MC1 Global",
    location: "São Paulo",
  },
]

const sortedJobs = [...jobs].sort((a, b) => compareDatesDesc(a.date, b.date))

export default function Career() {
  return (
    <ol className="ml-1 border-l">
      {sortedJobs.map(({ title, description, date, company, location }) => (
        <li key={`${title}-${date}`} className="relative pb-6 pl-5 last:pb-2">
          <span
            aria-hidden
            className={`absolute top-1.5 left-[4.5px] size-2 rounded-full ${
              isCurrent(date) ? "bg-green-500" : "bg-muted-foreground"
            }`}
          />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {date}
            {isCurrent(date) && (
              <Badge className="bg-green-500/15 text-green-700 dark:text-green-400">
                Mais recente
              </Badge>
            )}
          </div>
          <h3 className="mt-1 font-heading text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">
            {company} · {location}
          </p>
          <p className="mt-1 text-xs/relaxed font-light">{description}</p>
        </li>
      ))}
    </ol>
  )
}
