"use client"

import { useSearchParams } from "next/navigation"

export default function Location({ defaultLocation }: { defaultLocation: string }) {
  const searchParams = useSearchParams()
  const location = searchParams.get("location") || defaultLocation
  return <>{location}</>
}
