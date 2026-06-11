import { create } from "zustand"
import { Item } from "./types"
import { groups } from "@/components/sidebar/items"

interface PagesStore {
  currentPage: Item
  openedPages: Item[]
}
interface PagesActions {
  changePage: (page: Item) => void
  removePage: (page: Item) => void
}

export const defaultPage = groups[0].items[0]

export const usePagesStore = create<PagesStore & { actions: PagesActions }>(
  (set) => ({
    currentPage: defaultPage,
    openedPages: [defaultPage],
    actions: {
      changePage: (page) =>
        set((state) => {
          if (state.openedPages.some((p) => p.page === page.page)) {
            return state.currentPage.page === page.page
              ? state
              : { currentPage: page }
          }

          return {
            currentPage: page,
            openedPages: [...state.openedPages, page],
          }
        }),
      removePage: (page) =>
        set((state) => {
          if (state.openedPages.length === 1) return state

          const idx = state.openedPages.findIndex(
            (opened) => opened.page === page.page
          )
          if (idx === -1) return state
          const openedPages = state.openedPages.filter((_, i) => i !== idx)
          const isCurrent = state.currentPage.page === page.page
          const currentPage = isCurrent
            ? (state.openedPages[idx + 1] ??
              state.openedPages[idx - 1] ??
              openedPages[0])
            : state.currentPage
          return { openedPages, currentPage }
        }),
    },
  })
)

export const usePagesActions = () => usePagesStore((state) => state.actions)
