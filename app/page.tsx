"use client"

import LineNumbers from "@/components/core/line-numbers"
import { usePagesStore } from "@/components/core/pages/store"

export default function Page() {
  const currentPage = usePagesStore((s) => s.currentPage)
  return (
    <div className="min-h-0 w-full flex-1 overflow-y-auto">
      <LineNumbers>{currentPage.page.component}</LineNumbers>
    </div>
  )
}
