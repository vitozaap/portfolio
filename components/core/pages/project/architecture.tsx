export interface ArchNode {
  // Two-digit step marker, e.g. "01" — mirrors the design's numbered blocks.
  step: string
  kind: string
  name: string
  description: string
  repo?: string
}

// A distributed system laid out as numbered blocks: one row on desktop, a stack
// on mobile. Dividers flip from vertical to horizontal so the borders never double.
export function Architecture({ nodes }: { nodes: ArchNode[] }) {
  return (
    <div className="grid grid-cols-1 border-2 border-foreground md:grid-cols-4">
      {nodes.map((node) => (
        <div
          key={node.step}
          data-cursor="target"
          className="flex flex-col border-b-2 border-foreground p-4 last:border-b-0 md:border-r-2 md:border-b-0 md:last:border-r-0"
        >
          <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
            {node.step} · {node.kind}
          </span>
          <h3 className="mt-1 font-heading text-xl font-black tracking-tight uppercase">
            {node.name}
          </h3>
          <p className="mt-2 text-sm text-foreground/80 max-sm:text-xs">
            {node.description}
          </p>
          {node.repo ? (
            <span className="mt-auto border-t-2 border-dashed border-muted-foreground pt-2 text-[10px] tracking-widest text-muted-foreground uppercase max-sm:mt-3">
              {node.repo}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  )
}
