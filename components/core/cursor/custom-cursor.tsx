"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"

/** Elements the ring should magnetically wrap on hover. */
const TARGET_SELECTOR =
  'a, button, [role="button"], input, select, textarea, [data-cursor="target"]'

const DOT_SIZE = 8
const RING_SIZE = 28
const RING_PADDING = 12

const SPRING = { stiffness: 300, damping: 28, mass: 0.7 }

const PRECISE_POINTER_QUERY = "(pointer: fine)"

function subscribePrecisePointer(callback: () => void) {
  const mq = window.matchMedia(PRECISE_POINTER_QUERY)
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}

/** True on devices with a precise pointer (mouse/trackpad), false on touch. */
function usePrecisePointer() {
  return useSyncExternalStore(
    subscribePrecisePointer,
    () => window.matchMedia(PRECISE_POINTER_QUERY).matches,
    () => false
  )
}

/**
 * Brutalist IDE cursor: a sharp square dot tracks the pointer exactly while a
 * square ring trails behind with spring physics, expanding to wrap interactive
 * elements on hover. Falls back to the native cursor on coarse pointers and
 * when the user prefers reduced motion.
 */
export default function CustomCursor() {
  const reduceMotion = useReducedMotion()
  const precisePointer = usePrecisePointer()
  const enabled = !reduceMotion && precisePointer

  const [visible, setVisible] = useState(false)
  const hovering = useRef(false)

  // Raw pointer position (drives the instant dot).
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  // Ring source: pointer position, or the centre of the hovered element.
  const centerX = useMotionValue(-100)
  const centerY = useMotionValue(-100)
  const widthMV = useMotionValue(RING_SIZE)
  const heightMV = useMotionValue(RING_SIZE)

  const ringX = useSpring(centerX, SPRING)
  const ringY = useSpring(centerY, SPRING)
  const ringW = useSpring(widthMV, SPRING)
  const ringH = useSpring(heightMV, SPRING)

  useEffect(() => {
    if (!enabled) return

    // Hide the native cursor while this component is active. Injected here
    // rather than via globals.css because the Tailwind/Lightning CSS build
    // drops a hand-written `* { cursor: none }` rule; a runtime <style> can't
    // be dropped and keeps the cursor-hiding tied to the component lifecycle.
    const hideStyle = document.createElement("style")
    hideStyle.setAttribute("data-custom-cursor", "")
    hideStyle.textContent = "*{cursor:none!important}"
    document.head.appendChild(hideStyle)

    const wrapTarget = (el: Element) => {
      const r = el.getBoundingClientRect()
      hovering.current = true
      centerX.set(r.left + r.width / 2)
      centerY.set(r.top + r.height / 2)
      widthMV.set(r.width + RING_PADDING)
      heightMV.set(r.height + RING_PADDING)
    }

    const releaseRing = () => {
      hovering.current = false
      widthMV.set(RING_SIZE)
      heightMV.set(RING_SIZE)
      centerX.set(mouseX.get())
      centerY.set(mouseY.get())
    }

    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!hovering.current) {
        centerX.set(e.clientX)
        centerY.set(e.clientY)
      }
      setVisible(true)
    }

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(TARGET_SELECTOR)
      if (el) wrapTarget(el)
    }

    const onOut = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(TARGET_SELECTOR)
      if (!el) return
      // Ignore moves that stay inside the same target (between child elements).
      const related = e.relatedTarget as Node | null
      if (related && el.contains(related)) return
      releaseRing()
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    // While the ring wraps a target, a DOM change can remove that target with
    // the pointer held still (e.g. clicking a card swaps the page) — no pointer
    // event fires to release the ring. On DOM mutations, re-check what's under
    // the cursor and re-wrap or release accordingly (throttled to one rAF).
    let rafId = 0
    const syncFromPoint = () => {
      rafId = 0
      if (!hovering.current) return
      const el = document
        .elementFromPoint(mouseX.get(), mouseY.get())
        ?.closest?.(TARGET_SELECTOR)
      if (el) wrapTarget(el)
      else releaseRing()
    }
    const observer = new MutationObserver(() => {
      if (!rafId) rafId = requestAnimationFrame(syncFromPoint)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerover", onOver, { passive: true })
    window.addEventListener("pointerout", onOut, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    document.addEventListener("pointerenter", onEnter)

    return () => {
      hideStyle.remove()
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerover", onOver)
      window.removeEventListener("pointerout", onOut)
      document.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("pointerenter", onEnter)
    }
  }, [enabled, mouseX, mouseY, centerX, centerY, widthMV, heightMV])

  if (!enabled) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-101"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Ring — trails the pointer, wraps targets on hover. */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 border-2 border-foreground"
          style={{ width: ringW, height: ringH }}
        />
      </motion.div>

      {/* Dot — exact pointer position. */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: mouseX, y: mouseY }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 bg-foreground"
          style={{ width: DOT_SIZE, height: DOT_SIZE }}
        />
      </motion.div>
    </div>
  )
}
