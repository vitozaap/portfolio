"use client"
import { HugeiconsIcon } from "@hugeicons/react"
import { usePagesStore } from "./pages/store"

export function AppFooter() {
  const currentPage = usePagesStore((state) => state.currentPage)
  return (
    <footer className="fixed right-0 bottom-0 left-0 z-50 flex h-max items-center gap-6 bg-foreground text-xs font-bold text-primary-foreground">
      <div className="flex items-center gap-3">
        <div className="flex bg-primary-foreground"></div>
        <p>MAIN</p>
      </div>
      <div className="flex items-center gap-3">
        <p>↑ 0</p>
        <p>↓ 0</p>
      </div>
      <div className="flex items-center gap-2 border">
        <HugeiconsIcon icon={currentPage.icon} size={17} />
        <p>{currentPage.name.toUpperCase()}</p>
      </div>
      <div className="ml-auto flex items-center">
        <p className="p-2">LN 21, COL 1</p>
        <p className="p-2">MD</p>
        <p className="p-2">UTF-8</p>
        <div className="flex items-center gap-2 p-2">
          <div className="size-1.5 rounded-full bg-primary-foreground"></div>
          <p>READY</p>
        </div>
      </div>
    </footer>
  )
}
