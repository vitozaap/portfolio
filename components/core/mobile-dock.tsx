"use client"

import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"
import { Menu01Icon, Search01Icon, Tv01Icon } from "@hugeicons/core-free-icons"
import { useSidebar } from "../ui/sidebar"
import { useCrtActions, useCrtStore } from "./crt/store"
import { cn } from "@/lib/utils"

/**
 * Bottom action dock shown only on mobile (`md:hidden`). Mirrors the desktop
 * header affordances as large tap targets: Files (toggles the explorer),
 * Search (command palette — placeholder until built, like the desktop CMD
 * button) and CRT (scanline toggle, replacing the design's "Tweaks" button).
 */
export function MobileDock() {
  const { toggleSidebar } = useSidebar()
  const scanlines = useCrtStore((s) => s.scanlines)
  const crtActions = useCrtActions()

  return (
    <nav
      aria-label="Mobile actions"
      className="grid h-14 w-full shrink-0 grid-cols-3 border-t-2 md:hidden"
    >
      <DockButton icon={Menu01Icon} label="Files" onClick={toggleSidebar} />
      <DockButton icon={Search01Icon} label="Search" />
      <DockButton
        icon={Tv01Icon}
        label="CRT"
        active={scanlines}
        onClick={crtActions.toggleScanlines}
      />
    </nav>
  )
}

function DockButton({
  icon,
  label,
  onClick,
  active,
}: {
  icon: IconSvgElement
  label: string
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex flex-col items-center justify-center gap-1 border-l-2 transition-colors first:border-l-0 active:bg-foreground active:text-background",
        active && "bg-foreground text-background"
      )}
    >
      <HugeiconsIcon icon={icon} size={20} />
      <span className="text-[9px] font-bold tracking-[0.18em] uppercase opacity-80">
        {label}
      </span>
    </button>
  )
}
