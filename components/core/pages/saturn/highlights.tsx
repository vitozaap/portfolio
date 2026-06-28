import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

export interface Highlight {
    icon: IconSvgElement
    title: string
    description: string
}

export function Highlights({ items }: { items: Highlight[] }) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((item) => (
                <div
                    key={item.title}
                    data-cursor="target"
                    className="group flex flex-col gap-2 border-2 border-foreground p-4 transition-colors hover:bg-foreground hover:text-background"
                >
                    <HugeiconsIcon icon={item.icon} size={24} />
                    <h3 className="font-heading text-base font-bold uppercase tracking-tight">{item.title}</h3>
                    <p className="text-sm text-foreground/80 group-hover:text-background/80 max-sm:text-xs">
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
    )
}
