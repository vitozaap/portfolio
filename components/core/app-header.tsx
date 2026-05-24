"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { SidebarHeader, SidebarSeparator } from "../ui/sidebar"
import { usePagesStore } from "./pages/store"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

export default function AppHeader() {
    const { openedPages, changePage, currentPage, removePage } = usePagesStore()
    console.log(openedPages)
    return (
        <SidebarHeader className="px-0!">
            <div className="flex p-2 gap-5 w-full items-center">
                <p className="text-xs">BRUTALIST IDE V1.0</p>
                <span className="text-xs font-extralight opacity-70">/</span>
                <p className="text-xs">BRANCH: MAIN</p>
                <span className="text-xs font-extralight opacity-70">/</span>
                <p className="text-xs">ENCODING: UTF-8</p>
                <span className="text-xs font-extralight opacity-70">/</span>
                <p className="text-xs">LF</p>
            </div>
            <div className="flex border-y-2 min-h-11 shrink-0 w-full items-center">
                {openedPages.map((page) => (
                    <div
                        key={page.page}
                        role="button"
                        tabIndex={0}
                        data-active={currentPage.page === page.page || undefined}
                        onClick={() => changePage(page)}
                        className="inline-flex h-full shrink-0 items-center justify-center gap-2 border-r-2 border-border bg-background px-2 text-xs font-medium whitespace-nowrap cursor-pointer select-none outline-none transition-all hover:bg-muted hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50 has-[button:hover]:bg-background! data-active:bg-foreground! data-active:text-background! data-active:font-bold data-active:hover:bg-foreground! data-active:hover:text-background! data-active:has-[button:hover]:bg-foreground! data-active:has-[button:hover]:text-background!"
                    >
                        <HugeiconsIcon icon={page.icon!} className="scale-60" />
                        {page.name}
                        <Button
                            size={"icon-xs"}
                            variant={"ghost"}
                            className="dark:hover:bg-background/20! "
                            onClick={(e) => {
                                e.stopPropagation()
                                removePage(page)
                            }}
                        >
                            <HugeiconsIcon icon={Cancel01Icon} className="scale-65" />
                        </Button>
                    </div>
                ))}
            </div>

        </SidebarHeader>
    )
}
