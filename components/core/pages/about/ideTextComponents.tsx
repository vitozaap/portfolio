import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

interface IdeTextGroupProps extends ComponentProps<"div"> {
    groupTitle: ReactNode
    curlyBrackets?: boolean
    brackets?: boolean
}

function IdeComment({ className, children, ...props }: ComponentProps<"span">) {
    return <span className={cn("italic text-sm text-foreground/50", className)} {...props}>// {children} </span>
}

function IdeText({ className, ...props }: ComponentProps<"span">) {
    return <span className={cn("whitespace-pre-line text-sm", className)} {...props} />
}

function IdeTextHighlighted({ className, ...props }: ComponentProps<"span">) {
    //todo  finish the Highlighted IDE text component
    return <span className={cn("", className)} {...props} />
}


function IdeTextGroup({ className, children, groupTitle, curlyBrackets, brackets, ...props }: IdeTextGroupProps) {
    return (
        <div className="flex flex-col" {...props}>
            <div className="flex">{groupTitle} &nbsp; {brackets || curlyBrackets ? <IdeText>{curlyBrackets ? '{' : '['}</IdeText> : null}</div>
            <div className="flex flex-col ps-4 gap-3">{children}</div>
            {brackets || curlyBrackets ? <IdeText>{curlyBrackets ? '}' : ']'}</IdeText> : null}
        </div>
    )
}


export {
    IdeComment,
    IdeText,
    IdeTextHighlighted,
    IdeTextGroup
}