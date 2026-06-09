import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FolderStore {
  openFolders: Record<string, boolean>
}

interface FolderActions {
  setFolder: (name: string, open: boolean) => void
}

export const DEFAULT_FOLDER_OPEN = true

export const isFolderOpen = (
  openFolders: Record<string, boolean>,
  name: string
) => openFolders[name] ?? DEFAULT_FOLDER_OPEN

export const useFolderStore = create<
  FolderStore & { actions: FolderActions }
>()(
  persist(
    (set) => ({
      openFolders: {},
      actions: {
        setFolder: (name, open) =>
          set((state) => ({
            openFolders: { ...state.openFolders, [name]: open },
          })),
      },
    }),
    {
      name: "sidebar-folders",
      version: 1,
      partialize: (state) => ({ openFolders: state.openFolders }),
      // Start from defaults on the server and first client render (all
      // folders open), then load persisted state after mount to avoid a
      // hydration mismatch. AppSidebar calls rehydrate() in an effect.
      skipHydration: true,
    }
  )
)

export const useFolderActions = () => useFolderStore((state) => state.actions)
