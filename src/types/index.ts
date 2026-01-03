export type Page = "home" | "work" | "about" | "photos" | "contact"

export interface DockItem {
  id: Page
  label: string
  icon: string
}
