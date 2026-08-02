import { RefChip } from "./refChip"
import type { Commit } from "./data"

// One row of `git log --graph`: a node on the rail, then the commit body.
// The rail line is dropped on the last row so the graph terminates cleanly.
export function CommitRow({
  commit,
  isLast,
}: {
  commit: Commit
  isLast?: boolean
}) {
  return (
    <div className="grid grid-cols-[16px_1fr] gap-3">
      <div aria-hidden className="flex flex-col items-center">
        <span className="mt-1.5 size-2.5 shrink-0 bg-foreground" />
        {!isLast ? <span className="w-0.5 flex-1 bg-foreground/60" /> : null}
      </div>

      <div className={isLast ? "pb-1" : "pb-6"}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="text-[11px] tracking-wide text-muted-foreground">
            {commit.date} · {commit.hash}
          </span>
          {commit.refs?.map((ref) => (
            <RefChip key={ref.label} kind={ref.kind} label={ref.label} />
          ))}
        </div>
        <p className="mt-1.5 font-bold tracking-wide max-sm:text-sm">
          {commit.title}
        </p>
        <p className="mt-1 text-sm text-foreground/75 max-sm:text-xs">
          {commit.body}
        </p>
      </div>
    </div>
  )
}
