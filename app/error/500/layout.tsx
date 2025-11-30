import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "500 Internal Server Error | Zone Bind Network",
  description: "The server encountered an internal error.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "500 Internal Server Error - Zone Bind Network",
    description: "The server encountered an internal error.",
    images: ["https://cdn.ricardoneud.com/zone-bind/logo.png"],
  },
  twitter: {
    card: "summary",
    title: "500 Internal Server Error - Zone Bind Network",
    description: "The server encountered an internal error.",
    images: ["https://cdn.ricardoneud.com/zone-bind/logo.png"],
  },
  icons: {
    icon: "https://cdn.ricardoneud.com/zone-bind/logo.png",
  },
}

export default function Error500Layout({
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
