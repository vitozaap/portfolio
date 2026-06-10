"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "../ui/button"
import { SidebarHeader } from "../ui/sidebar"
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
      <div className="flex max-h-8 w-full shrink-0 items-center justify-between p-2">
        <div className="flex gap-5">
          <p className="text-xs">BRUTALIST IDE V1.0</p>
          <span className="text-xs font-extralight opacity-70">/</span>
          <p className="text-xs">BRANCH: MAIN</p>
          <span className="text-xs font-extralight opacity-70">/</span>
          <p className="text-xs">ENCODING: UTF-8</p>
          <span className="text-xs font-extralight opacity-70">/</span>
          <p className="text-xs">LF</p>
        </div>
        <div className="-my-2 flex items-center justify-center self-stretch text-xs">
          <div
            role="button"
            tabIndex={0}
            className="group -mt-2 -mb-1 flex cursor-pointer items-center gap-1 self-stretch border-l-2 px-4 transition-all hover:bg-foreground hover:text-background focus-visible:ring-1 focus-visible:ring-ring/50"
            onClick={changeTheme}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                changeTheme()
              }
            }}
          >
            <div className="size-1.5 rounded-full bg-foreground transition-all group-hover:bg-background"></div>
            <p className="font-semibold tracking-wider">DARK</p>
          </div>
          <div className="group -mt-2 -mr-2 -mb-1 flex cursor-pointer items-center gap-1 self-stretch border-l-2 px-4 transition-all hover:bg-foreground hover:text-background focus-visible:ring-1 focus-visible:ring-ring/50">
            <div className="flex items-center justify-center border border-foreground px-1 transition-all group-hover:border-background">
              <HugeiconsIcon icon={CommandIcon} size={12} />
              <p className="font-bold">K</p>
            </div>
            <p className="font-semibold tracking-wider">CMD</p>
          </div>
        </div>
      </div>
      <div className="flex min-h-11 w-full shrink-0 items-center border-y-2">
        {openedPages.map((page) => (
          <div
            key={page.page}
            role="button"
            tabIndex={0}
            data-active={currentPage.page === page.page || undefined}
            onClick={() => pagesActions.changePage(page)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                pagesActions.changePage(page)
              }
            }}
            className="inline-flex h-full shrink-0 cursor-pointer items-center justify-center gap-2 border-r-2 border-border bg-background px-2 text-xs font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50 has-[button:hover]:bg-background! data-active:bg-foreground! data-active:font-bold data-active:text-background! data-active:hover:bg-foreground! data-active:hover:text-background! data-active:has-[button:hover]:bg-foreground! data-active:has-[button:hover]:text-background!"
          >
            <HugeiconsIcon icon={page.icon} className="scale-60" />
            {page.name}
            {openedPages.length > 1 && (
              <Button
                size={"icon-xs"}
                variant={"ghost"}
                className="hover:bg-background/20 dark:hover:bg-background/20!"
                onClick={(e) => {
                  e.stopPropagation()
                  pagesActions.removePage(page)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation()
                  }
                }}
              >
                <HugeiconsIcon icon={Cancel01Icon} className="scale-65" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </SidebarHeader>
  )
}
