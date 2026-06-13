"use client"

import { cn } from "@/lib/utils"
import { PlayIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { IdeComment } from "./ideTextComponents"

interface IdeRunnableProps {
    command: string
    output: string
    className?: string
}

const TYPING_SPEED_MS = 20

function Typewriter({ text }: { text: string }) {
    const reduceMotion = useReducedMotion()
    const [count, setCount] = useState(reduceMotion ? text.length : 0)

    useEffect(() => {
        if (reduceMotion) return
        const id = setInterval(() => {
            setCount((c) => {
                if (c >= text.length) {
                    clearInterval(id)
                    return c
                }
                return c + 1
            })
        }, TYPING_SPEED_MS)
        return () => clearInterval(id)
    }, [text, reduceMotion])

    return (
        <span className="whitespace-pre-wrap">
            {text.slice(0, count)}
            <span className="animate-pulse" aria-hidden>
                █
            </span>
        </span>
    )
}

function IdeRunnable({ command, output, className }: IdeRunnableProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className={cn("flex flex-col items-start gap-2", className)}>
            <IdeComment>→ {command}</IdeComment>
            <Button
                variant="outline"
                size="sm"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className="border-2 border-foreground font-bold tracking-wider hover:bg-foreground! hover:text-background! aria-expanded:bg-foreground! aria-expanded:text-background!"
            >
                <HugeiconsIcon icon={PlayIcon} className="size-3 fill-current" />
                EXECUTAR
            </Button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="w-full overflow-hidden"
                    >
                        <div className="bg-secondary px-4 py-2.5 text-sm text-foreground">
                            <Typewriter text={output} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { IdeRunnable }
