import type { Metadata } from "next"
import "../globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import Header from "@/components/header"
import { SanityLive } from "@/sanity/lib/live"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={`antialiased`}>
          <main>
            <Header />
            {children}
          </main>

          {/* Higher order component for live settings when product is published */}
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  )
}
