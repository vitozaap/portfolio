import { Icon, type IconifyIcon } from "@iconify/react"
import { Button } from "./ui/button"

type SocialMedia = {
  title: string
  icon: string | IconifyIcon
  url: string
}

const socials: SocialMedia[] = [
  {
    title: "Linkedin",
    icon: "simple-icons:linkedin",
    url: "https://linkedin.com/in/vitomenezes",
  },
  {
    title: "Github",
    icon: "simple-icons:github",
    url: "https://github.com/vitozaap",
  },
  {
    title: "Email",
    icon: "mi:email",
    url: "mailto:menezes.victorsantos@outlook.com",
  },
]

export default function Social() {
  return socials.map(({ title, url, icon }) => (
    <Button
      size={"lg"}
      className={"rounded-full"}
      variant={"secondary"}
      key={title}
      render={
        <a href={url}>
          <Icon icon={icon} /> {title}
        </a>
      }
    />
  ))
}
