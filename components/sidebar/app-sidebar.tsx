import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarSeparator,
} from "@/components/ui/sidebar"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex p-2 gap-2 w-full items-center ">
                    <div className="flex bg-foreground p-1.25"></div> {/* The square */}
                    <p className="text-sm font-bold">PORTFOLIO.VICTORSANTOS</p>
                </div>
                <SidebarSeparator />
                <div className="flex p-2 w-full items-center ">
                    <p className="text-xs font-bold">EXPLORER</p>
                </div>
                <SidebarSeparator />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}