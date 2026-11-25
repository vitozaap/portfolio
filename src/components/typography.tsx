import { cn } from "cn"
import type { ComponentProps } from "react"

export function Title({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn("font-heading text-lg font-semibold", className)}
      {...props}
    />
  )
}

export function Subtitle({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "uppercase font-medium font-heading text-muted-foreground text-xs",
        className
      )}
      {...props}
    />
  )
}

export function Paragraph({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("text-sm font-light", className)} {...props} />
}
