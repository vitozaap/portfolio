import { Geist, Geist_Mono, JetBrains_Mono, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppFooter } from "@/components/core/app-footer";
import AppHeader from "@/components/core/app-header";

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
          <AppSidebar />
          <div className="flex-1 min-h-0 flex flex-col">
            <AppHeader />
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </div>
          <AppFooter />

        </SidebarProvider>


      </body>
    </html>
  )
}
