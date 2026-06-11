"use client"

import { usePagesStore } from "@/components/core/pages/store"

export default function Page() {
  const currentPage = usePagesStore((s) => s.currentPage)
  return (
    <div className="min-h-0 w-full flex-1 overflow-y-auto px-4 py-6">{currentPage.page.component}</div>
  )
}
