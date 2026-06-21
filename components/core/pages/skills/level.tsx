"use client"
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

export function Level({ className, children, value, delay = 0 }: ProgressPrimitive.Root.Props & { delay?: number }) {
    const [displayValue, setDisplayValue] = useState(0)
    useEffect(() => {
        const num = typeof value === 'number' ? value : 0
        const timer = setTimeout(() => setDisplayValue(num), delay)
        return () => clearTimeout(timer)
    }, [value, delay])
    return (
        <div className={cn("flex gap-2 items-center w-full", className)}>
            <Progress value={displayValue} className={"w-full"} indicatorClassName="duration-[400ms] ease-out" />
            <span className="text-xs font-bold">{children}</span>
        </div>
    )
}
