"use client"

import { useCrtStore } from "./store"

export default function CrtOverlay() {
  const scanlines = useCrtStore((s) => s.scanlines)
  if (!scanlines) return null
  return (
    <div
      aria-hidden
      className="crt-overlay pointer-events-none fixed inset-0 z-[100]"
    />
  )
}
