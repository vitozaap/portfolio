import { BinaryCodeIcon, GithubIcon } from "@hugeicons/core-free-icons";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { defaultPage, usePagesActions } from "./pages/store";
import { cn } from "@/lib/utils";




export default function StillDeveloping() {
    const pageActions = usePagesActions();
    return (
        <main className="flex w-full min-h-full items-center justify-center">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon-lg">
                        <HugeiconsIcon icon={BinaryCodeIcon} size={24} />
                    </EmptyMedia>

                    <EmptyTitle className="text-xl">Em desenvolvimento...</EmptyTitle>
                    <EmptyDescription className="font-medium">
                        Ainda estou desenvolvendo esta página. Em breve estará pronta e disponível para visualização. Caso queira, você pode acompanhar o desenvolvimento no github.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex-col md:flex-row justify-center gap-2">
                    <Button
                        size={"lg"}
                        className={"max-sm:w-full"}
                        onClick={() => pageActions.changePage(defaultPage)}
                    >
                        Voltar para ./Readme.md
                    </Button>
                    <Link href={"https://github.com/vitozaap/portfolio/tree/main"} className={cn("max-sm:w-full", buttonVariants({ size: "lg", variant: "secondary" }))}>Acompanhe no <HugeiconsIcon icon={GithubIcon} />
                        <b>Github.</b></Link>
                </EmptyContent>
            </Empty>
        </main>
    )
}