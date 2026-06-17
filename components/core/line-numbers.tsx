"use client"

import * as React from "react"

// Must stay in sync with the gutter's `leading-6` (24px) so numbers map 1:1 to visual lines.
const LINE_HEIGHT = 24

export default function LineNumbers({
  children,
}: {
  children: React.ReactNode
}) {
  const rowRef = React.useRef<HTMLDivElement>(null)
  const [lineCount, setLineCount] = React.useState(0)

  React.useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const observer = new ResizeObserver(([entry]) => {
      // floor: the numbers column is `overflow-hidden`, so a partial
      // trailing row would render taller than the gutter and get clipped — that
      // clipped half-line is the "extra hidden number" at the bottom.
      setLineCount(Math.floor(entry.contentRect.height / LINE_HEIGHT))
    })
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  const numbers = React.useMemo(
    () => Array.from({ length: lineCount }, (_, i) => i + 1).join("\n"),
    [lineCount]
  )

  return (
    <div ref={rowRef} className="flex w-full">
      {/* Numbers are absolutely positioned so the gutter never feeds its own
          height back into the row measured by the ResizeObserver. */}
      <div
        aria-hidden
        className="relative w-12 shrink-0 self-stretch border-r select-none"
      >
        <div className="absolute inset-0 overflow-hidden pr-2 text-right text-xs leading-6 font-medium whitespace-pre text-muted-foreground/60">
          {numbers}
        </div>
      </div>
      <div className="min-w-0 flex-1 px-4 py-6">{children}</div>
    </div>
  )
}
