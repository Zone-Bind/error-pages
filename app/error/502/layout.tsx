import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "502 Bad Gateway | Zone Bind Network",
  description: "The server is currently unavailable.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "502 Bad Gateway - Zone Bind Network",
    description: "The server is currently unavailable.",
    images: ["https://cdn.ricardoneud.com/zone-bind/logo.png"],
  },
  twitter: {
    card: "summary",
    title: "502 Bad Gateway - Zone Bind Network",
    description: "The server is currently unavailable.",
    images: ["https://cdn.ricardoneud.com/zone-bind/logo.png"],
  },
  icons: {
    icon: "https://cdn.ricardoneud.com/zone-bind/logo.png",
  },
}

export default function Error502Layout({
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
