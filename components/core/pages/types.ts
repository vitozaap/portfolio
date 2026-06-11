import z from "zod"
import { ThirdBracketSquareIcon } from "@hugeicons/core-free-icons"
import { IconSvgElement } from "@hugeicons/react"
import { JSX, ReactElement, ReactNode } from "react"

export const pagesSchema = z.object({
  value: z.enum([
    "README",
    "Contact",
    "About",
    "Skills",
    "Package",
    "Comprez",
    "Git",
  ]),
  component: z.custom<JSX.Element>(),
})
export type Pages = z.infer<typeof pagesSchema>

export const itemSchema = z.object({
  name: z.string(),
  page: pagesSchema,
  icon: z.custom<IconSvgElement>().default(ThirdBracketSquareIcon),
})

export const groupsSchema = z.array(
  z.object({
    name: z.string().default("folder/"),
    items: z.array(itemSchema),
  })
)

export type Item = z.infer<typeof itemSchema>
export type Groups = z.infer<typeof groupsSchema>
