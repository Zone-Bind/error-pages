import type React from "react"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ code: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params

  const titles: Record<string, string> = {
    "401": "401 Unauthorized",
    "403": "403 Forbidden",
    "404": "404 Not Found",
    "500": "500 Internal Server Error",
    "502": "502 Bad Gateway",
    "503": "503 Service Unavailable",
  }

  const descriptions: Record<string, string> = {
    "401": "Authorization required to access this resource.",
    "403": "Access to this resource is forbidden.",
    "404": "The page you are looking for could not be found.",
    "500": "The server encountered an internal error.",
    "502": "The server is currently unavailable.",
    "503": "Service temporarily unavailable.",
  }

  const title = titles[code] || "404 Not Found"
  const description = descriptions[code] || "Page not found."

  return {
    title: `${title} | Zone Bind Network`,
    description,
    robots: "noindex, nofollow",
    openGraph: {
      title: `${title} - Zone Bind Network`,
      description,
      images: ["https://cdn.ricardoneud.com/zone-bind/logo.png"],
    },
    twitter: {
      card: "summary",
      title: `${title} - Zone Bind Network`,
      description,
      images: ["https://cdn.ricardoneud.com/zone-bind/logo.png"],
    },
    icons: {
      icon: "https://cdn.ricardoneud.com/zone-bind/logo.png",
    },
  }
}

export default function ErrorLayout({
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
        <meta name="theme-color" content="#00ff00" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
