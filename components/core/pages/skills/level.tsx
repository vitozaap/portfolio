import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"


export function Level({ className, children, value }: ProgressPrimitive.Root.Props) {
    return (
        <div className={cn("flex gap-2 items-center w-full", className)}>
            <Progress value={value} className={"w-full"} />
            <span className="text-xs font-bold">{children}</span>
        </div>
    )
}