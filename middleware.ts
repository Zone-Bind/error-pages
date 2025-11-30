import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const errorCodes = ["401", "403", "404", "500", "502", "503"]

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname.slice(1)
  if (errorCodes.includes(pathname)) {
    return NextResponse.rewrite(new URL(`/error/${pathname}`, req.url))
  }
  return NextResponse.next()
}
