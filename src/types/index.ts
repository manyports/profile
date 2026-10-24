export type Page = "projects" | "about" | "photos" | "contact"

export interface Education {
  id: string
  school: string
  location: string
  period: string
  major?: string
}
