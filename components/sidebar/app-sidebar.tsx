"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { groups } from "./items"
import { Item } from "../core/pages/types"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight } from "@hugeicons/core-free-icons"
import { usePagesActions, usePagesStore } from "../core/pages/store"
import { isFolderOpen, useFolderActions, useFolderStore } from "./folder-store"
import { useEffect } from "react"

export function AppSidebar() {
  const page = usePagesStore((state) => state.currentPage.page)
  const pagesActions = usePagesActions()
  const openFolders = useFolderStore((state) => state.openFolders)
  const folderActions = useFolderActions()
  const { isMobile, setOpenMobile } = useSidebar()

  // On mobile the sidebar is an overlay sheet — close it after picking a file
  // so the content underneath becomes visible (matches the mobile design).
  function openPage(item: Item) {
    pagesActions.changePage(item)
    if (isMobile) setOpenMobile(false)
  }

  // Load persisted folder state only after mount (store uses skipHydration),
  // so server and first client render match before applying localStorage.
  useEffect(() => {
    useFolderStore.persist.rehydrate()
  }, [])

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex w-full items-center gap-2 p-2">
          <div className="flex bg-foreground p-1"></div> {/* The square */}
          <p className="text-xs font-bold">PORTFOLIO.VICTORSANTOS </p>
        </div>
        <SidebarSeparator />
        <div className="flex w-full items-center p-2">
          <p className="text-xs font-bold">EXPLORER</p>
        </div>
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group) => {
          const isOpen = isFolderOpen(openFolders, group.name)
          return (
            <Collapsible
              key={group.name}
              open={isOpen}
              onOpenChange={(open) => folderActions.setFolder(group.name, open)}
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  className="group/collapsible cursor-pointer font-extrabold"
                  render={<CollapsibleTrigger />}
                >
                  <div className="flex w-full items-center gap-1">
                    <HugeiconsIcon
                      icon={ArrowRight}
                      size={14}
                      className="transition-transform duration-200 group-data-panel-open/collapsible:rotate-90 motion-reduce:transition-none"
                    />{" "}
                    {group.name.toUpperCase()}
                  </div>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <SidebarMenuItem key={item.page.value}>
                          <SidebarMenuButton
                            isActive={page === item.page}
                            onClick={() => openPage(item)}
                          >
                            <HugeiconsIcon icon={item.icon} /> {item.name}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )
        })}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
