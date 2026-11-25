import { cn } from "cn"
import type { ComponentProps } from "react"

export function Section({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />
}