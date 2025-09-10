'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export interface PageSection {
  id: string
  title: string
  tag?: string
}

export function usePageSections() {
  const pathname = usePathname()
  const [sections, setSections] = useState<PageSection[]>([])

  useEffect(() => {
    // Extract sections from the current page by looking for headings
    const extractSections = () => {
      // Only look for headings in the main content area, not in navigation
      const mainContent = document.querySelector('main') || document.body
      const headings = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const extractedSections: PageSection[] = []

      headings.forEach((heading) => {
        const id = heading.id
        const title = heading.textContent?.trim() || ''

        // Filter out navigation-related headings
        if (id && title && !title.toLowerCase().includes('on this page')) {
          extractedSections.push({
            id,
            title,
          })
        }
      })

      setSections(extractedSections)
    }

    // Wait for the page to load before extracting sections
    const timer = setTimeout(extractSections, 100)

    // Also extract sections when the DOM changes
    const observer = new MutationObserver(extractSections)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [pathname])

  return sections
}
