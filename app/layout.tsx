import type { Metadata } from "next"
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { AppFooter } from "@/components/core/app-footer"
import AppHeader from "@/components/core/app-header"
import { MobileDock } from "@/components/core/mobile-dock"
import CrtOverlay from "@/components/core/crt/overlay"
import CustomCursor from "@/components/core/cursor/custom-cursor"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  metadataBase: new URL("https://vitozap.dev"),
  title: "Victor Santos — Software Engineer",
  description: "Software Engineer. Portfólio em formato de IDE brutalista.",
  openGraph: {
    title: "Victor Santos — Software Engineer",
    description: "Software Engineer. Portfólio em formato de IDE brutalista.",
    url: "https://vitozap.dev",
    siteName: "Victor Santos",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Santos — Software Engineer",
    description: "Software Engineer. Portfólio em formato de IDE brutalista.",
  },
}

const spaceGroteskHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        "font-mono",
        jetbrainsMono.variable,
        spaceGroteskHeading.variable
      )}
    >
      <body className="flex h-dvh w-dvw flex-col">
        <ThemeProvider>
          <SidebarProvider className="min-h-0 flex-1">
            <AppSidebar />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <AppHeader />
              {children}
              <MobileDock />
            </div>
          </SidebarProvider>
          <AppFooter />
          <CrtOverlay />
          <CustomCursor />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
