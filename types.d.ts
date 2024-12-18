import { type SearchOptions } from 'flexsearch'

declare module '@/mdx/search.mjs' {
  export type Result = {
    url: string
    title: string
    pageTitle?: string
    sectionTitle?: string
    preview?: string
    type?: string
  }

  export function search(query: string, options?: SearchOptions): Array<Result>
}
