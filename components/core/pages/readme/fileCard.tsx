import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import z from "zod";
import { pagesEnum } from "../types";


const fileCardSchema = z.array(z.object({
    page: pagesEnum,
    kicker: z.string().nonempty(),
    title: z.string().nonempty(),
    description: z.string().nonempty()
}))

export const fileCards = fileCardSchema.parse([
    {
        page: "About",
        kicker: "About.ts",
        title: "Sobre mim",
        description: "Quem sou, no que acredito.",
    },
    {
        page: "Skills",
        kicker: "Skills.json",
        title: "Skills",
        description: "Stack, ferramentas e mais.",
    },
    {
        page: "Saturn",
        kicker: "projects/saturn.tsx",
        title: "Saturn",
        description: "Compressor de vídeo em nuvem na AWS.",
    },
    {
        page: "Contact",
        kicker: "Contact.yml",
        title: "Contato",
        description: "Formas de falar comigo.",
    },
    {
        page: "Certs",
        kicker: "Certs.yml",
        title: "Certificados",
        description: "Minhas qualificações e cursos.",
    },
    {
        page: "Git",
        kicker: ".git/.gitlogs",
        title: "Trajetória",
        description: "Quando comecei, como desenvolvi e quando.",
    },
    {
        page: "Package",
        kicker: "package.json",
        title: "Manifesto",
        description: "meu package.json pessoal.",
    }

])

function FileCard({ className, ...props }: ComponentProps<"div">) {
    return <div role="button" className={cn("flex cursor-pointer flex-col gap-2 p-3 border-2 hover:bg-foreground group", className)} {...props} />
}

function FileCardKicker({ className, children, ...props }: ComponentProps<"span">) {
    return (
        <div className="flex group">
            <span className={cn("text-[10px] group-hover:text-background text-gray-500 uppercase tracking-widest", className)}>{children}</span>
        </div>
    );
}

function FileCardTitle({ className, ...props }: ComponentProps<"h1">) {
    return <h1 className={cn("font-bold text-xl group-hover:text-background font-heading", className)} {...props} />
}

function FileCardDescription({ className, ...props }: ComponentProps<"span">) {
    return <span className={cn("text-xs tracking-wide text-foreground/80 group-hover:text-background/80", className)} {...props} />
}

export {
    FileCard,
    FileCardTitle,
    FileCardDescription,
    FileCardKicker
}
