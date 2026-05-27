"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { SidebarHeader, SidebarSeparator } from "../ui/sidebar"
import { usePagesActions, usePagesStore } from "./pages/store"
import { Cancel01Icon, CommandIcon } from "@hugeicons/core-free-icons"
import { useTheme } from "next-themes"
import { useShallow } from "zustand/shallow"

export default function AppHeader() {
    const { openedPages, currentPage } = usePagesStore(
        useShallow((s) => ({
            openedPages: s.openedPages,
            currentPage: s.currentPage,
        }))
    )
    const pagesActions = usePagesActions()
    const { resolvedTheme, setTheme } = useTheme()
    function changeTheme() {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }
    return (
        <SidebarHeader className="px-0!">
            <div className="flex p-2 w-full items-center justify-between shrink-0 max-h-8">
                <div className="flex gap-5">
                    <p className="text-xs">BRUTALIST IDE V1.0</p>
                    <span className="text-xs font-extralight opacity-70">/</span>
                    <p className="text-xs">BRANCH: MAIN</p>
                    <span className="text-xs font-extralight opacity-70">/</span>
                    <p className="text-xs">ENCODING: UTF-8</p>
                    <span className="text-xs font-extralight opacity-70">/</span>
                    <p className="text-xs">LF</p>
                </div>
                <div className="flex text-xs items-center justify-center self-stretch -my-2" >
                    <div className="group flex items-center gap-1 border-l-2 self-stretch px-4 -mt-2 -mb-1 cursor-pointer transition-all hover:bg-foreground hover:text-background focus-visible:ring-1 focus-visible:ring-ring/50" onClick={changeTheme} >
                        <div className="size-1.5 bg-foreground group-hover:bg-background transition-all rounded-full" ></div>
                        <p className="font-semibold tracking-wider">DARK</p>
                    </div>
                    <div className="group flex items-center gap-1 border-l-2 self-stretch px-4 -mt-2 -mb-1 -mr-2 cursor-pointer transition-all hover:bg-foreground hover:text-background focus-visible:ring-1 focus-visible:ring-ring/50" >
                        <div className="flex items-center justify-center px-1 border-foreground border transition-all group-hover:border-background">
                            <HugeiconsIcon icon={CommandIcon} size={12} />
                            <p className="font-bold">K</p>
                        </div>
                        <p className="font-semibold tracking-wider">CMD</p>
                    </div>
                </div>
            </div>
            <div className="flex border-y-2 min-h-11 shrink-0 w-full items-center">
                {openedPages.map((page) => (
                    <div
                        key={page.page}
                        role="button"
                        tabIndex={0}
                        data-active={currentPage.page === page.page || undefined}
                        onClick={() => pagesActions.changePage(page)}
                        className="inline-flex h-full shrink-0 items-center justify-center gap-2 border-r-2 border-border bg-background px-2 text-xs font-medium whitespace-nowrap cursor-pointer select-none outline-none transition-all hover:bg-muted hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50 has-[button:hover]:bg-background! data-active:bg-foreground! data-active:text-background! data-active:font-bold data-active:hover:bg-foreground! data-active:hover:text-background! data-active:has-[button:hover]:bg-foreground! data-active:has-[button:hover]:text-background!"
                    >
                        <HugeiconsIcon icon={page.icon} className="scale-60" />
                        {page.name}
                        <Button
                            size={"icon-xs"}
                            variant={"ghost"}
                            className="dark:hover:bg-background/20! hover:bg-background/20"
                            onClick={(e) => {
                                e.stopPropagation()
                                pagesActions.removePage(page)
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
