import { ReactNode } from "react"

export interface Project {
    name: string
    tagline: string
    status: string
    stack: string[]
    summary: string
    role: string
    url: string
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div>
            <dt className="text-[9px] uppercase tracking-[0.18em] text-foreground/55">{label}</dt>
            <dd className="mt-1 font-semibold">{children}</dd>
        </div>
    )
}

export function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="grid grid-cols-1 border-2 border-foreground bg-background shadow-[6px_6px_0_0_var(--foreground)] md:grid-cols-2">
            {/* visual panel — inverted, like the design's .proj-preview .visual */}
            <div className="relative flex min-h-[210px] flex-col justify-between overflow-hidden bg-foreground p-6 text-background">
                <div className="flex flex-col gap-3">
                    <span className="w-max border border-background px-2 py-0.5 text-[9px] uppercase tracking-[0.16em]">
                        ● {project.status}
                    </span>
                    <h2 className="font-heading text-4xl font-black uppercase leading-none tracking-tight md:text-5xl">
                        {project.name}
                    </h2>
                </div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-background/80">{project.tagline}</p>
                <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-6 -right-6 h-44 w-44 opacity-15 [background-image:repeating-linear-gradient(45deg,var(--background)_0_2px,transparent_2px_12px)]"
                />
            </div>

            {/* info panel */}
            <dl className="flex flex-col gap-3 p-5 text-sm max-sm:text-xs">
                <Field label="Sumário">{project.summary}</Field>
                <Field label="Meu papel">{project.role}</Field>
                <Field label="Stack">
                    <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                            <span
                                key={tech}
                                className="border border-foreground px-1.5 py-0.5 text-[10px] font-bold tracking-wide"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </Field>
                <Field label="Repositório">
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-max items-center gap-1.5 border-2 border-foreground px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
                    >
                        → repo no github
                    </a>
                </Field>
            </dl>
        </div>
    )
}
