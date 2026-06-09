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
} from "@/components/ui/sidebar"
import { groups } from "./items"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight } from "@hugeicons/core-free-icons"
import { usePagesActions, usePagesStore } from "../core/pages/store"

export function AppSidebar() {
    const page = usePagesStore((state) => state.currentPage.page)
    const pagesActions = usePagesActions()
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex p-2 gap-2 w-full items-center">
                    <div className="flex bg-foreground p-1"></div> {/* The square */}
                    <p className="text-xs font-bold">PORTFOLIO.VICTORSANTOS </p>
                </div>
                <SidebarSeparator />
                <div className="flex p-2 w-full items-center">
                    <p className="text-xs font-bold">EXPLORER</p>
                </div>
                <SidebarSeparator />
            </SidebarHeader>
            <SidebarContent>
                {groups.map((group) => (
                    <SidebarGroup key={group.name}>
                        <SidebarGroupLabel className="font-extrabold">
                            <div className="flex items-center w-full gap-1">
                                <HugeiconsIcon icon={ArrowRight} size={14} /> {group.name.toUpperCase()}
                            </div>
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.page}>
                                        <SidebarMenuButton
                                            isActive={page === item.page}
                                            onClick={() => pagesActions.changePage(item)}
                                        >
                                            <HugeiconsIcon icon={item.icon} /> {item.name}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>))}
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}