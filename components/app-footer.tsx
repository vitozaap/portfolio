export function AppFooter() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 flex bg-foreground items-center h-max text-xs text-primary-foreground font-bold">
            <div className="flex gap-3 items-center p-2">
                <div className="flex bg-primary-foreground p-1.25"></div>
                <p>MAIN</p>
            </div>
            <div className="flex gap-3 items-center p-2">
                <p>↑ 0</p>
                <p>↓ 0</p>
            </div>
            <div className="flex gap-2 items-center p-2">
                <div className="flex bg-primary-foreground p-1.25"></div>
                <p>README.MD</p>
            </div>
            <div className="flex ml-auto items-center">
                <p className="p-2">LN 21, COL 1</p>
                <p className="p-2">MD</p>
                <p className="p-2">UTF-8</p>
                <div className="flex gap-2 items-center p-2">
                    <div className="size-1.5 rounded-full bg-primary-foreground"></div>
                    <p>READY</p>
                </div>
            </div>
        </footer>
    )
}
