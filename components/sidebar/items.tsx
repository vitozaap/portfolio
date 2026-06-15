import {
  FileCodeIcon,
  Flag02Icon,
  GithubIcon,
  Note01Icon,
  NpmIcon,
  ReactIcon,
  ThirdBracketSquareIcon,
  Typescript01Icon,
} from "@hugeicons/core-free-icons"
import { Groups, Item, Pages } from "../core/pages/types"
import Readme from "../core/pages/readme/readme"
import About from "../core/pages/about/about"
import Package from "../core/pages/package/package"
import Skills from "../core/pages/skills/skills"




const root: Item[] = [
  {
    page: {
      value: "README",
      component: <Readme />
    },
    name: "README.md",
    icon: Note01Icon,
  },
  {
    page: {
      value: "About",
      component: <About />
    },
    name: "about.ts",
    icon: Typescript01Icon,
  },
  {
    page: {
      value: "Certs",
      component: <></>
    },
    name: "certs.yml",
    icon: Flag02Icon
  },
  {
    page: {
      value: "Contact",
      component: <></>
    },
    name: "contact.yml",
    icon: FileCodeIcon,
  },
  {
    page: {
      value: "Package",
      component: <Package />
    },
    name: "package.json",
    icon: NpmIcon,
  },
  {
    page: {
      value: "Skills",
      component: <Skills />
    },
    name: "skills.json",
    icon: ThirdBracketSquareIcon,
  },
]


const projects: Item[] = [
  {
    page: {
      value: "Comprez",
      component: <></>
    },
    name: "comprez.tsx",
    icon: ReactIcon,
  },
]

const git: Item[] = [
  {
    page: {
      value: "Git",
      component: <></>
    },
    name: ".gitlogs ",
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

export const findItemByPage = (value: Pages["value"]): Item | undefined =>
  groups.flatMap((group) => group.items).find((item) => item.page.value === value)
