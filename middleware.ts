import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const errorCodes = ["401", "403", "404", "500", "502", "503"]

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const pathname = url.pathname

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|map)$/)
  ) {
    return NextResponse.next()
  }

  const cleanPath = pathname.slice(1)

  if (errorCodes.includes(cleanPath)) {
    return NextResponse.rewrite(new URL(`/error/${cleanPath}`, req.url))
  }

  return NextResponse.next()
}
