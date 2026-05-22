"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { groups } from "./items"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight } from "@hugeicons/core-free-icons"
import { usePagesStore } from "../core/pages/store"

export function AppSidebar() {
    const page = usePagesStore((state) => state.currentPage.page)
    const changePage = usePagesStore((state) => state.changePage)
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex p-2 gap-2 w-full items-center ">
                    <div className="flex bg-foreground p-1.25"></div> {/* The square */}
                    <p className="text-sm font-bold">PORTFOLIO.VICTORSANTOS </p>
                </div>
                <SidebarSeparator />
                <div className="flex p-2 w-full items-center ">
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
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.page}>
                                    <SidebarMenuButton
                                        isActive={page === item.page}

                                        onClick={() => changePage(item)}
                                    >
                                        <HugeiconsIcon icon={item.icon!} /> {item.name}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarGroupContent>
                    </SidebarGroup>))}
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}