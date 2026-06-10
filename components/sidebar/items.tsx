import {
  FileCodeIcon,
  GithubIcon,
  Note01Icon,
  NpmIcon,
  ReactIcon,
  ThirdBracketSquareIcon,
  Typescript01Icon,
} from "@hugeicons/core-free-icons"
import { Groups, Item } from "../core/pages/types"

const root: Item[] = [
  {
    page: "README",
    name: "README.md",
    icon: Note01Icon,
  },
  {
    page: "About",
    name: "about.ts",
    icon: Typescript01Icon,
  },
  {
    page: "Contact",
    name: "contact.yml",
    icon: FileCodeIcon,
  },
  {
    page: "Package",
    name: "package.json",
    icon: NpmIcon,
  },
  {
    page: "Skills",
    name: "skills.json",
    icon: ThirdBracketSquareIcon,
  },
]

const projects: Item[] = [
  {
    page: "Comprez",
    name: "comprez.tsx",
    icon: ReactIcon,
  },
]

const git: Item[] = [
  {
    page: "Git",
    name: ".git",
    icon: GithubIcon,
  },
]

export const groups: Groups = [
  {
    name: "/",
    items: root,
  },
  {
    name: "projects/",
    items: projects,
  },
  {
    name: ".git/",
    items: git,
  },
]
