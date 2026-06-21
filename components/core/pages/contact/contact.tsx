"use client";

import { ComponentProps, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { IdeComment, IdeText, IdeTextHighlighted } from "../ideTextComponents";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";



const CONTACT_DATA: Pick<ContactCardProps, "title" | "value" | "isEmail">[] = [{
    title: "email",
    isEmail: true,
    value: "menezes.victorsantos@outlook.com"
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
    isEmail?: boolean
    value: string
    isCopied?: boolean
    onCopyValue?: (value: string) => void
}

function ContactCard({ title, value, isEmail, isCopied, onCopyValue, className, ...props }: ContactCardProps) {
    return <div className={cn("flex flex-col gap-3", className)} {...props}>
        <IdeText className="break-words max-md:text-xs">
            <b>{title}:</b> {value}
        </IdeText>
        <div className="flex flex-col gap-4 border-2 border-foreground p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-col gap-2">
                <IdeText className="text-[11px] tracking-widest text-muted-foreground">{title.toUpperCase()}</IdeText>
                <Link href={isEmail ? `mailto:${value}` : value} className="min-w-0 max-w-full">
                    <IdeTextHighlighted variant={"underline"} className="break-words max-md:text-xs">
                        {value}
                    </IdeTextHighlighted>
                </Link>
            </div>
            <Button variant={"outline"} size={"lg"} onClick={() => onCopyValue?.(value)} className="w-full shrink-0 tracking-wide sm:w-auto">{isCopied ? "COPIADO!" : "COPIAR"}</Button>
        </div>
    </div >
}

export default function Contact() {
    const [copiedValue, setCopiedValue] = useState<string | null>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const shouldReduce = useReducedMotion()

    const handleCopy = async (value: string) => {
        await navigator.clipboard.writeText(value)
        setCopiedValue(value)

        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopiedValue(null), 2000)
    }

    return (
        <main className="flex flex-col w-full gap-6">
            <IdeComment character="#">meus canais de contato:</IdeComment>
            {CONTACT_DATA.map((contact, index) => (
                <motion.div
                    key={contact.value}
                    initial={shouldReduce ? undefined : { clipPath: 'inset(0 100% 0 0)' }}
                    animate={shouldReduce ? undefined : { clipPath: 'inset(0 0% 0 0)' }}
                    transition={shouldReduce ? undefined : { duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
                >
                    <ContactCard
                        title={contact.title}
                        value={contact.value}
                        isEmail={contact.isEmail}
                        isCopied={copiedValue === contact.value}
                        onCopyValue={handleCopy}
                    />
                </motion.div>
            ))}
        </main>
    )
}