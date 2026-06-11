"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "../ui/button"
import { SidebarHeader } from "../ui/sidebar"
import { usePagesActions, usePagesStore } from "./pages/store"
import { Cancel01Icon, CommandIcon } from "@hugeicons/core-free-icons"
import { useTheme } from "next-themes"
import { useShallow } from "zustand/shallow"
import { useSyncExternalStore } from "react"
import { useCrtActions, useCrtStore } from "./crt/store"
import { cn } from "@/lib/utils"

const emptySubscribe = () => () => { }
// true after hydration, false during SSR — keeps server and first client render in sync
const useMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

export default function AppHeader() {
  const { openedPages, currentPage } = usePagesStore(
    useShallow((s) => ({
      openedPages: s.openedPages,
      currentPage: s.currentPage,
    }))
  )
  const pagesActions = usePagesActions()
  const scanlines = useCrtStore((s) => s.scanlines)
  const crtActions = useCrtActions()
  const { resolvedTheme, setTheme } = useTheme()
  // resolvedTheme is undefined on the server; resolve the label only after mount
  const mounted = useMounted()
  const themeLabel = mounted && resolvedTheme === "dark" ? "LIGHT" : "DARK"
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
            <p className="font-semibold tracking-wider">{themeLabel}</p>
          </div>
          <div
            role="button"
            tabIndex={0}
            className="group -mt-2 -mb-1 flex cursor-pointer items-center gap-1 self-stretch border-l-2 px-4 transition-all hover:bg-foreground hover:text-background focus-visible:ring-1 focus-visible:ring-ring/50"
            onClick={crtActions.toggleScanlines}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                crtActions.toggleScanlines()
              }
            }}
          >
            <div
              className={cn(
                "size-1.5 rounded-full border border-foreground transition-all group-hover:border-background",
                scanlines && "bg-foreground group-hover:bg-background"
              )}
            ></div>
            <p className="font-semibold tracking-wider">CRT</p>
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
        {openedPages.map((item) => (
          <div
            key={item.page.value}
            role="button"
            tabIndex={0}
            data-active={currentPage.page === item.page || undefined}
            onClick={() => pagesActions.changePage(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                pagesActions.changePage(item)
              }
            }}
            className="inline-flex h-full shrink-0 cursor-pointer items-center justify-center gap-2 border-r-2 border-border bg-background px-2 text-xs font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50 has-[button:hover]:bg-background! data-active:bg-foreground! data-active:font-bold data-active:text-background! data-active:hover:bg-foreground! data-active:hover:text-background! data-active:has-[button:hover]:bg-foreground! data-active:has-[button:hover]:text-background!"
          >
            <HugeiconsIcon icon={item.icon} className="scale-60" />
            {item.name}
            {openedPages.length > 1 && (
              <Button
                size={"icon-xs"}
                variant={"ghost"}
                className="hover:bg-background/20 dark:hover:bg-background/20!"
                onClick={(e) => {
                  e.stopPropagation()
                  pagesActions.removePage(item)
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
