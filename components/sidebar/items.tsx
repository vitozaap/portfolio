import z from "zod";
import { pagesSchema } from "../pages/pages-store";
import { ReactNode } from "react";
import { ThirdBracketSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";


const itemSchema = z.object({
    name: z.string(),
    page: pagesSchema,
    icon: z.custom<ReactNode>().default(<HugeiconsIcon icon={ThirdBracketSquareIcon} />).optional()
})

type Item = z.infer<typeof itemSchema>

export const items: Item[] = [
    {
        page: "README",
        name: "README.md"
    },
    {
        page: "About",
        name: "about.ts"
    },
    {
        page: "Comprez",
        name: "comprez.tsx"
    },
    {
        page: "Contact",
        name: "contact.yml"
    },
    {
        page: "Git",
        name: ".git"
    },
    {
        page: "Package",
        name: "package.json"
    },
    {
        page: "Skills",
        name: "skills.json"
    }
]