'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { usePageSections } from '@/hooks/usePageSections'
import { useEffect, useState } from 'react'

export function OnThisPage() {
  const pathname = usePathname()
  const sections = usePageSections()
  const [visibleSections, setVisibleSections] = useState<string[]>([])

  // Track which section is currently in viewport for the indicator bar
  useEffect(() => {
    const handleScroll = () => {
      const viewportTop = window.scrollY
      const viewportCenter = viewportTop + window.innerHeight / 2

      let currentSection = ''
      let closestDistance = Infinity

      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          const elementTop = element.offsetTop
          const elementBottom = elementTop + element.offsetHeight
          const elementCenter = elementTop + element.offsetHeight / 2

          // Check if section is in viewport
          if (
            elementTop <= viewportTop + 200 &&
            elementBottom >= viewportTop + 100
          ) {
            // Calculate distance from viewport center to element center
            const distance = Math.abs(viewportCenter - elementCenter)

            if (distance < closestDistance) {
              closestDistance = distance
              currentSection = section.id
            }
          }
        }
      })

      if (currentSection) {
        setVisibleSections([currentSection])
      }
    }

    // Initial check
    const timer = setTimeout(handleScroll, 100)

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sections])

  if (sections.length === 0) {
    return null
  }

  return (
    <div className="hidden xl:fixed xl:right-8 xl:top-32 xl:z-10 xl:block xl:w-64">
      <nav aria-labelledby="on-this-page-title" className="w-64">
        <h2
          id="on-this-page-title"
          className="font-display border-b border-zinc-200 pb-3 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-white"
        >
          On this page
        </h2>
        <div className="relative mt-6">
          {/* Scrolling indicator bar */}
          <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div
            className="absolute left-0 w-1 rounded-full bg-emerald-500 transition-all duration-200 ease-out"
            style={{
              height: `${sections.length > 0 ? 100 / sections.length : 0}%`,
              top: `${sections.findIndex((s) => s.id === visibleSections[0]) * (100 / sections.length)}%`,
            }}
          />

          <ol role="list" className="space-y-2 text-sm">
            {sections.map((section) => {
              return (
                <li key={section.id}>
                  <Link
                    href={`${pathname}#${section.id}`}
                    className="block py-2 pl-4 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300"
                  >
                    <span className="truncate">{section.title}</span>
                  </Link>
                  {section.tag && (
                    <span className="ml-7 text-xs text-zinc-400 dark:text-zinc-500">
                      {section.tag}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </nav>
    </div>
  )
}
