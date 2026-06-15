"use client"
import { HugeiconsIcon } from "@hugeicons/react"
import { usePagesStore } from "./pages/store"

export function AppFooter() {
  const currentPage = usePagesStore((state) => state.currentPage)
  return (
    <footer className="relative z-50 flex h-max w-full shrink-0 items-center gap-3 bg-foreground px-2 text-[10px] font-bold text-primary-foreground md:gap-6 md:px-0 md:text-xs">
      <div className="flex shrink-0 items-center gap-2">
        <div className="size-1.5 bg-primary-foreground"></div>
        <p>MAIN</p>
      </div>
      <div className="hidden items-center gap-3 md:flex">
        <p>↑ 0</p>
        <p>↓ 0</p>
      </div>
      <div className="flex min-w-0 items-center gap-2 border px-1 md:px-0">
        <HugeiconsIcon
          icon={currentPage.icon}
          size={17}
          className="shrink-0"
        />
        <p className="truncate">{currentPage.name.toUpperCase()}</p>
      </div>
      <div className="ml-auto flex shrink-0 items-center">
        <p className="p-1 md:p-2">
          LN 21<span className="hidden md:inline">, COL 1</span>
        </p>
        <p className="p-1 md:p-2">MD</p>
        <p className="hidden p-2 md:block">UTF-8</p>
        <div className="flex items-center gap-2 p-1 md:p-2">
          <div className="size-1.5 rounded-full bg-primary-foreground"></div>
          <p className="hidden md:block">READY</p>
        </div>
      </div>
    </footer>
  )
}
