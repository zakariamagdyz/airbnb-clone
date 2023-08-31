import "./globals.css"

import type { Metadata } from "next"
import { Nunito } from "next/font/google"

import Navbar from "@/components/header"

const inter = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone by zakaria magdy",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
