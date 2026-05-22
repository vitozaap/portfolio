import { create } from "zustand"
import { Item, itemSchema, Pages } from "./types"



interface PagesStore {
    currentPage: Item
    openedPages: Item[]
    changePage: (page: Item) => void
}

const defaultPage = itemSchema.parse({ name: "README.md", page: "README" })

export const usePagesStore = create<PagesStore>((set) => ({
    currentPage: defaultPage,
    openedPages: [{ name: "README.md", page: "README" }],
    changePage: (page: Item) => set((state) => {
        const alreadyOpened = state.openedPages.includes(page)

        //Will insert the page to the openedPages list if not opened before 
        return alreadyOpened
            ? { currentPage: page }
            : {
                currentPage: page,
                openedPages: [...state.openedPages, page]
            }
    })
}))