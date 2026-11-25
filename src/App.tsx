import { Section } from "./components/section"
import { ThemeSwitcher } from "./components/theme-switcher"
import { Paragraph, Subtitle, Title } from "./components/typography"
export function App() {
  return (
    <div className="flex min-h-svh p-2 items-center flex-col">
      <div className="w-full p-2 h-min">
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col w-1/2 border border-blue-400 gap-6">
        <Section>
          <Title>Title placeholder</Title>
          <Subtitle>Subtitle placeholder</Subtitle>
          <Paragraph>Paragraph placeholder</Paragraph>
        </Section>
      </div>
    </div>
  )
}

export default App
