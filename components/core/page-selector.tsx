"use client"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { usePagesStore } from "./pages/store"
import { Item } from "./pages/types"

export function PageSelector() {
    const openedPages = usePagesStore((state) => state.openedPages)
    const currentPage = usePagesStore((state) => state.currentPage)

    return (
        <div>
            
        </div>
    )
}
