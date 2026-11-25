import type { IconifyIcon } from "@iconify/react"
import { bullmqIcon } from "./icons/bullmq"

type Technology = {
  name: string
  icon: string | IconifyIcon
  color?: string
}

export const technologies: Technology[] = [
  { name: "Typescript", icon: "logos:typescript-icon" },
  { name: "JavaScript", icon: "logos:javascript" },
  { name: "Node", icon: "logos:nodejs-icon-alt" },
  { name: "Angular", icon: "logos:angular-icon" },
  { name: "React", icon: "logos:react" },
  { name: "Next.js", icon: "logos:nextjs-icon" },
  { name: "Nest", icon: "logos:nestjs" },
  { name: "PrismaORM", icon: "simple-icons:prisma" },
  { name: "DrizzleORM", icon: "logos:drizzle-icon" },
  { name: "shadcn/ui", icon: "simple-icons:shadcnui" },
  { name: "better-auth", icon: "simple-icons:betterauth" },
  { name: "BullMQ", icon: bullmqIcon },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "PostgreSQL", icon: "logos:postgresql" },
  { name: "MySQL", icon: "logos:mysql-icon" },
  { name: "Java", icon: "logos:java" },
  {
    name: "Amazon Web Services",
    icon: "simple-icons:amazonwebservices",
    color: "#FF9900",
  },
  { name: "Python", icon: "logos:python" },
  { name: "Spring Boot", icon: "logos:spring-icon" },
  { name: "Claude Code", icon: "logos:claude-code" },
  { name: "Git", icon: "logos:git-icon" },
  { name: "GitHub", icon: "simple-icons:github" },
  { name: "CI/CD", icon: "carbon:continuous-integration" },
  { name: "Bun", icon: "logos:bun" },
  { name: "Redis", icon: "logos:redis" },
  { name: "Vite", icon: "logos:vitejs" },
]
