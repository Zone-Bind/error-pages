import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 Not Found | Zone Bind Network",
  description: "The page you are looking for could not be found.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "404 Not Found - Zone Bind Network",
    description: "The page you are looking for could not be found.",
    images: ["https://cdn.ricardoneud.com/zone-bind/logo.png"],
  },
  twitter: {
    card: "summary",
    title: "404 Not Found - Zone Bind Network",
    description: "The page you are looking for could not be found.",
    images: ["https://cdn.ricardoneud.com/zone-bind/logo.png"],
  },
  icons: {
    icon: "https://cdn.ricardoneud.com/zone-bind/logo.png",
  }
}

export default function Error404Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="icon"
          href="https://cdn.ricardoneud.com/zone-bind/logo.png"
          type="image/png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
