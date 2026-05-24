import { create } from "zustand"
import { Item, itemSchema, Pages } from "./types"
import { Note01Icon } from "@hugeicons/core-free-icons"

interface PagesStore {
    currentPage: Item
    openedPages: Item[]
    changePage: (page: Item) => void
    removePage: (page: Item) => void
}

const defaultPage = itemSchema.parse({ name: "README.md", page: "README", icon: Note01Icon })

export const usePagesStore = create<PagesStore>((set) => ({
    currentPage: defaultPage,
    openedPages: [defaultPage],
    changePage: (page: Item) => set((state) => {
        const alreadyOpened = state.openedPages.some(p => p.page === page.page)
        return alreadyOpened
            ? { currentPage: page }
            : {
                currentPage: page,
                openedPages: [...state.openedPages, page]
            }
    }),
    removePage: (page: Item) => set((state) => {
        const newPages = state.openedPages.filter(item => item.page !== page.page)
        if (state.openedPages.length == 1) {
            return {}
        }
        return {
            openedPages: newPages
        }
    })
}))