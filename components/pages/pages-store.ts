import z from "zod"
import { create } from "zustand"



export const pagesSchema = z.enum(["README", "Contact", "About", "Skills", "Package", "Comprez", "Git"])
export type Pages = z.infer<typeof pagesSchema>

interface PagesStore {
    currentPage: Pages
    openedPages: Pages[]
    changePage: (page: Pages) => void
}


export const usePagesStore = create<PagesStore>((set) => ({
    currentPage: "README",
    openedPages: ["README"],
    changePage: (page: Pages) => set((state) => {
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