"use client";

import { ComponentProps, useRef, useState } from "react";
import { IdeComment, IdeText, IdeTextHighlighted } from "../ideTextComponents";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";



const CONTACT_DATA: Pick<ContactCardProps, "title" | "value">[] = [{
    title: "email",
    value: "mailto:menezes.victorsantos@outlook.com"
},
{
    title: "linkedin",
    value: "https://linkedin.com/in/vitomenezes"
},
{
    title: "github",
    value: "https://github.com/vitozaap"
}]

interface ContactCardProps extends ComponentProps<"div"> {
    title: string
    value: string
    isCopied?: boolean
    onCopyValue?: (value: string) => void
}

function ContactCard({ title, value, isCopied, onCopyValue, className, ...props }: ContactCardProps) {
    return <div className={cn("flex flex-col gap-3", className)} {...props}>
        <IdeText>
            <b>{title}:</b> {value}
        </IdeText>
        <div className="flex items-center justify-between border-2 border-foreground p-4">
            <div className="flex flex-col gap-2">
                <IdeText className="text-[11px] tracking-widest text-muted-foreground">{title.toUpperCase()}</IdeText>
                <Link href={value}>
                    <IdeTextHighlighted variant={"underline"}>
                        {value}
                    </IdeTextHighlighted>
                </Link>
            </div>
            <Button variant={"outline"} size={"lg"} onClick={() => onCopyValue?.(value)} className={"tracking-wide"}>{isCopied ? "Copiado!" : "COPIAR"}</Button>
        </div>
    </div >
}

export default function Contact() {
    const [copiedValue, setCopiedValue] = useState<string | null>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleCopy = async (value: string) => {
        await navigator.clipboard.writeText(value)
        setCopiedValue(value)

        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopiedValue(null), 2000)
    }

    return (
        <main className="flex flex-col w-full gap-6">
            <IdeComment character="#">meus canais de contato:</IdeComment>
            {CONTACT_DATA.map((contact) => (
                <ContactCard
                    key={contact.value}
                    title={contact.title}
                    value={contact.value}
                    isCopied={copiedValue === contact.value}
                    onCopyValue={handleCopy}
                />
            ))}
        </main>
    )
}