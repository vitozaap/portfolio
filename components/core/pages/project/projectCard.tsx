import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface ProjectLink {
    label: string
    href: string
    // The primary link renders inverted — reserved for the live product, not a repo.
    primary?: boolean
}

export interface Project {
    name: string
    tagline: string
    status: string
    stack: string[]
    summary: string
    role: string
    links: ProjectLink[]
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div>
            <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</dt>
            <dd className="mt-1 font-semibold">{children}</dd>
        </div>
    )
}

export function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="grid grid-cols-1 border-2 border-foreground bg-background shadow-[4px_4px_0_0_var(--foreground)] md:grid-cols-2">
            {/* visual panel — inverted, like the design's .proj-preview .visual */}
            <div className="relative flex min-h-60 flex-col justify-between overflow-hidden bg-foreground p-6 text-background">
                <div className="flex flex-col gap-3">
                    <span className="w-max border border-background px-2 py-0.5 text-[10px] uppercase tracking-widest">
                        ● {project.status}
                    </span>
                    <h2 className="font-heading text-4xl font-black uppercase leading-none tracking-tight md:text-5xl">
                        {project.name}
                    </h2>
                </div>
                <p className="text-[11px] uppercase tracking-widest text-background/80">{project.tagline}</p>
                <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-6 -right-6 h-44 w-44 opacity-20 [background-image:repeating-linear-gradient(45deg,var(--background)_0_2px,transparent_2px_12px)]"
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
                <Field label="Links">
                    <div className="flex flex-wrap gap-1.5">
                        {project.links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className={cn(
                                    "inline-flex w-max items-center gap-1.5 border-2 border-foreground px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors",
                                    link.primary
                                        ? "bg-foreground text-background hover:bg-background hover:text-foreground"
                                        : "hover:bg-foreground hover:text-background"
                                )}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </Field>
            </dl>
        </div>
    )
}
