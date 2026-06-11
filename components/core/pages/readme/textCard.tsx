import { cn } from "@/lib/utils";
import { ComponentProps } from "react";


function TextCard({ className, ...props }: ComponentProps<"div">) {
    return <div className={cn("flex flex-col gap-4 max-w-[34rem]", className)} {...props} />
}

function TextCardTitle({ className, ...props }: ComponentProps<"h2">) {
    return <h2 className={cn("font-bold text-lg font-heading", className)} {...props} />
}

function TextCardDescription({ className, ...props }: ComponentProps<"span">) {
    return <span className={cn("text-sm tracking-wide text-foreground/80", className)} {...props} />
}

export {
    TextCard,
    TextCardTitle,
    TextCardDescription
}