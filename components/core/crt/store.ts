import { create } from "zustand"

interface CrtStore {
  scanlines: boolean
}
interface CrtActions {
  toggleScanlines: () => void
}

export const useCrtStore = create<CrtStore & { actions: CrtActions }>(
  (set) => ({
    scanlines: true,
    actions: {
      toggleScanlines: () => set((state) => ({ scanlines: !state.scanlines })),
    },
  })
)

export const useCrtActions = () => useCrtStore((state) => state.actions)
