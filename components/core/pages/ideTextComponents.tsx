import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, ReactNode } from "react";

interface IdeTextGroupProps extends ComponentProps<"div"> {
    groupTitle: ReactNode
    curlyBrackets?: boolean
    brackets?: boolean
    comma?: boolean
    // `tight` drops the inter-line spacing so each line maps 1:1 to the
    // line-number gutter — the compact look of a real editor (e.g. package.json).
    tight?: boolean
}

const highlightedTextVariants = cva("text-sm text-foreground underline underline-offset-4", {
    variants: {
        variant: {
            underline: "font-bold not-italic",
            dotted: "decoration-dotted font-normal italic"
        }
    },
    defaultVariants: {
        variant: "underline"
    }
})

function IdeComment({ className, children, ...props }: ComponentProps<"span">) {
    return <span className={cn("italic text-sm text-foreground/50", className)} {...props}>// {children} </span>
}

function IdeText({ className, ...props }: ComponentProps<"span">) {
    return <span className={cn("whitespace-pre-line text-sm", className)} {...props} />
}

function IdeTextHighlighted({ className, variant = "underline", ...props }: ComponentProps<"span"> & VariantProps<typeof highlightedTextVariants>) {
    return <span className={cn(highlightedTextVariants({ variant, className }))} {...props} />
}


function IdeTextGroup({ className, children, groupTitle, curlyBrackets, brackets, comma, tight, ...props }: IdeTextGroupProps) {
    return (
        <div className={cn("flex flex-col", className)} {...props}>
            <div className="flex">{groupTitle} &nbsp; {brackets || curlyBrackets ? <IdeText>{curlyBrackets ? '{' : '['}</IdeText> : null}</div>
            <div className={cn("flex flex-col ps-4", tight ? "gap-0" : "gap-3")}>{children}</div>
            {brackets || curlyBrackets ? <IdeText>{curlyBrackets ? '}' : ']'}{comma ? ',' : ''}</IdeText> : null}
        </div>
    )
}


export {
    IdeComment,
    IdeText,
    IdeTextHighlighted,
    IdeTextGroup
}