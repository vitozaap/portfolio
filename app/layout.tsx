import { Geist, Geist_Mono, JetBrains_Mono, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const spaceGroteskHeading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, "font-mono", jetbrainsMono.variable, spaceGroteskHeading.variable)}
    >
      <body className="w-dvw h-dvh">

        <SidebarProvider>
          <div className="flex flex-col w-full h-full">
            <AppSidebar />
            <ThemeProvider>
              {children}
            </ThemeProvider>

          </div>
        </SidebarProvider>


      </body>
    </html>
  )
}
