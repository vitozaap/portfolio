import { Section } from "./components/section"
import { ThemeSwitcher } from "./components/theme-switcher"
import { Paragraph, Subtitle, Title } from "./components/typography"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "./components/ui/avatar"
import { Badge } from "./components/ui/badge"
import { Icon } from "@iconify/react"
import Me from "./assets/me.jpeg"
import { FaAws } from "react-icons/fa"
import { Button } from "./components/ui/button"
import { technologies } from "./components/technologies"

export function App() {
  return (
    <div className="flex min-h-svh p-2 items-center flex-col">
      <div className="w-full p-2 min-h-28">
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col max-w-2xl gap-6">
        <Section>
          <Avatar size="lg">
            <AvatarImage src={Me} alt="@vitozaap" />
            <AvatarFallback>V</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </Section>
        <Section>
          <Title>
            Prazer,{" "}
            <Button
              variant={"link"}
              className={
                "font-heading text-xl p-0! font-semibold text-blue-500 dark:text-blue-400"
              }
            >
              <a
                href="https://linkedin.com/in/vitomenezes"
                target="_blank"
                rel="noopener noreferrer"
              >
                Victor Santos
              </a>
            </Button>
            !
          </Title>
          <Paragraph>
            Programador fullstack apaixonado por tecnologia. Em busca de um
            estágio aqui em{" "}
            <Badge variant={"outline"}>São Paulo, Brasil 🇧🇷</Badge>
          </Paragraph>
          <Paragraph>
            Desenvolvo aplicações majoritariamente em{" "}
            <Badge variant={"outline"}>
              <Icon icon={"logos:typescript-icon"} data-icon="inline-start" />{" "}
              TypeScript{" "}
            </Badge>{" "}
            no ecossistema{" "}
            <Badge variant={"outline"}>
              <Icon icon={"logos:nodejs-icon-alt"} data-icon="inline-start" />
              Node.js
            </Badge>
          </Paragraph>
          <Paragraph>
            Tenho experiência prática construindo aplicações que escalam em
            nuvem{" "}
            <Badge variant={"outline"}>
              <FaAws data-icon="inline-start" /> AWS
            </Badge>
          </Paragraph>
        </Section>
        <Section>
          <Subtitle>TECNOLOGIAS</Subtitle>
          <Paragraph>
            Essas são as tecnologias que tenho familiaridade e/ou projetos
            desenvolvidos dentro e fora de minha vida acadêmica:
          </Paragraph>
          <div className="flex flex-wrap gap-2">
            {technologies.map(({ name, icon }) => (
              <Badge key={name} variant={"outline"}>
                <Icon icon={icon} data-icon="inline-start" />
                {name}
              </Badge>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}

export default App
