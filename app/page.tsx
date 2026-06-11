"use client"

import { usePagesStore } from "@/components/core/pages/store"

export default function Page() {
  const currentPage = usePagesStore((s) => s.currentPage)
  return (
    <div className="flex min-h-0 w-full flex-1 px-4 py-6">{currentPage.page.component}</div>
  )
}
