import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { SoundProvider } from "@/components/sound-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio - Desenvolvedor Full Stack",
  description: "Portfólio profissional com estética japonesa urbana em pixel art",
  viewport: "width=device-width, initial-scale=1",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-deep-purple text-cream overflow-x-hidden`}>
        <SoundProvider>
          <Navigation />
          <main className="min-h-screen pt-24">{children}</main>
        </SoundProvider>
         <div id="modal-portal" /> 
      </body>
    </html>
  )
}
