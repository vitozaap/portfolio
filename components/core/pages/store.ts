import { create } from "zustand"
import { Item, itemSchema, Pages } from "./types"

interface PagesStore {
    currentPage: Item
    openedPages: Item[]
    changePage: (page: Item) => void
    removePage: (page: Item) => void
}

const defaultPage = itemSchema.parse({ name: "README.md", page: "README" })

export const usePagesStore = create<PagesStore>((set) => ({
    currentPage: defaultPage,
    openedPages: [defaultPage],
    changePage: (page: Item) => set((state) => {
        const alreadyOpened = state.openedPages.includes(page)

        //Will insert the page to the openedPages list if not opened before 
        return alreadyOpened
            ? { currentPage: page }
            : {
                currentPage: page,
                openedPages: [...state.openedPages, page]
            }
    }),
    removePage: (page: Item) => set((state) => {
        //Creates a new array that does not contain the removed page 
        const newPages = state.openedPages.filter(item => item !== page)
        if (state.openedPages.length == 1) {
            return {}
        }
        return {
            openedPages: newPages
        }
    })
}))