import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "403 Forbidden | Zone Bind Network",
  description: "Access to this resource is forbidden.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "403 Forbidden - Zone Bind Network",
    description: "Access to this resource is forbidden.",
    images: ["https://cdn.ricardoneud.com/zone-bind/logo.png"],
  },
  twitter: {
    card: "summary",
    title: "403 Forbidden - Zone Bind Network",
    description: "Access to this resource is forbidden.",
    images: ["https://cdn.ricardoneud.com/zone-bind/logo.png"],
  },
  icons: {
    icon: "https://cdn.ricardoneud.com/zone-bind/logo.png",
  },
}

export default function Error403Layout({
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
