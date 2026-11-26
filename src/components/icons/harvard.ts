import type { IconifyIcon } from "@iconify/react"

// O ícone de Harvard no Iconify (thesvg-color:harvard) tem o viewBox quebrado
export const harvardIcon: IconifyIcon = {
  width: 24,
  height: 24,
  body: '<path fill="#A51C30" d="M3 3h18v8.5c0 5-3.8 8.6-9 10.5c-5.2-1.9-9-5.5-9-10.5Z"/><path fill="#fff" d="M5.5 6h5v4h-5ZM13.5 6h5v4h-5ZM9.5 13h5v4h-5Z"/>',
}
