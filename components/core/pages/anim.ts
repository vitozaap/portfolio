// Shared entrance-animation tokens and helpers for the page views.
// Keeping these in one place avoids drift in timing/easing across pages.

export const STAGGER = 0.1 // seconds between consecutive items
export const DURATION = 0.4 // seconds per item
export const EASE = "easeOut" as const

// Clip-reveal (left → right), used on the code-like pages (about, skills, package).
export const clipReveal = (index: number, reduce: boolean | null) =>
    reduce
        ? {}
        : {
            initial: { clipPath: "inset(0 100% 0 0)" },
            animate: { clipPath: "inset(0 0% 0 0)" },
            transition: { duration: DURATION, ease: EASE, delay: index * STAGGER },
        }

// Slide-up + fade, used on the card-based pages (readme, contact).
export const slideUp = (index: number, reduce: boolean | null) =>
    reduce
        ? {}
        : {
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: DURATION, ease: EASE, delay: index * STAGGER },
        }

// Delay (in ms) for a skills progress bar to start filling: one stagger step
// after its row begins revealing, so the bar grows just behind the text.
export const barDelayMs = (index: number) => (index + 1) * STAGGER * 1000
