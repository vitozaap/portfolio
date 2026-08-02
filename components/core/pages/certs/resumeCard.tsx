import { Download01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { resume } from "./data"

export function ResumeCard() {
  return (
    <div className="flex flex-col gap-4 border-2 border-foreground p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
          currículo completo
        </span>
        <span className="font-bold tracking-wide max-sm:text-sm">
          {resume.name}
        </span>
        <span className="text-sm text-foreground/70 max-sm:text-xs">
          Experiência, formação e projetos em uma página. PDF.
        </span>
      </div>
      <a
        href={resume.file}
        download
        className="inline-flex w-max shrink-0 items-center gap-2 border-2 border-foreground bg-foreground px-3 py-2 text-[11px] font-bold tracking-wider text-background uppercase transition-colors hover:bg-background hover:text-foreground max-sm:w-full max-sm:justify-center"
      >
        <HugeiconsIcon icon={Download01Icon} size={16} />
        baixar cv
      </a>
    </div>
  )
}
