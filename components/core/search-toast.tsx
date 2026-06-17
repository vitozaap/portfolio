import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon } from "@hugeicons/core-free-icons"
import { toast } from "sonner"

// Shared by the desktop header, the mobile top bar and the mobile dock so every
// "search" affordance shows the same coming-soon notice. The fixed id means
// spamming any of them refreshes the toast instead of stacking copies.
export function notifySearchComingSoon() {
  toast("Em desenvolvimento", {
    id: "search-coming-soon",
    description: "A busca (⌘K) ainda está sendo construída.",
    icon: <HugeiconsIcon icon={Search01Icon} size={16} />,
  })
}
