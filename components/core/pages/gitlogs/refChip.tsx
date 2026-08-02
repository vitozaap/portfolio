import { cn } from "@/lib/utils"
import type { RefKind } from "./data"

// Mirrors `git log --decorate`: HEAD is filled, branches are dashed (still
// moving), tags are solid outlines (fixed points).
const kindStyles: Record<RefKind, string> = {
  head: "border-solid bg-foreground text-background",
  branch: "border-dashed",
  tag: "border-solid",
}

export function RefChip({ kind, label }: { kind: RefKind; label: string }) {
  return (
    <span
      className={cn(
        "w-max border-2 border-foreground px-1.5 py-0.5 text-[10px] font-bold tracking-widest uppercase",
        kindStyles[kind]
      )}
    >
      {label}
    </span>
  )
}
