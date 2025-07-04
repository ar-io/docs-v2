import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SquareArrowOutUpRight } from 'lucide-react'

import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from '@/components/MobileNavigation'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { MobileSearch, Search } from '@/components/Search'
import { ThemeToggle } from '@/components/ThemeToggle'

function TopLevelNavItem({
  href,
  children,
  target = '_self',
}: {
  href: string
  children: React.ReactNode
  target?: string
}) {
  const isExternal = href.startsWith('http') || href.startsWith('ar://')

  return (
    <li>
      <Link
        href={href}
        target={target}
        className="inline-flex items-center gap-1 text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
        {isExternal && (
          <SquareArrowOutUpRight className="h-2.5 w-2.5 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white" />
        )}
      </Link>
    </li>
  )
}

export const Header = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<typeof motion.div>
>(function Header({ className, ...props }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

  return (
    <motion.div
      {...props}
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80',
        !isInsideMobileNavigation &&
          'backdrop-blur-sm lg:left-72 xl:left-80 dark:backdrop-blur',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-zinc-900'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]',
      )}
      style={
        {
          '--bg-opacity-light': bgOpacityLight,
          '--bg-opacity-dark': bgOpacityDark,
        } as React.CSSProperties
      }
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            'bg-zinc-900/7.5 dark:bg-white/7.5',
        )}
      />
      <Search />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        {/* <Link href="/" aria-label="Home">
          <Logo className="h-6" />
        </Link> */}
        {/* <Link href="/introduction" aria-label="Home">
          Learn
        </Link>
        <Link href="/ar-io-sdk" aria-label="Home">
          Build
        </Link> */}
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
            {/* <TopLevelNavItem href="/">Home</TopLevelNavItem> */}
            {/* <TopLevelNavItem href="https://whitepaper.arweave.net/" target='_blank'>White Paper</TopLevelNavItem> */}
            {/* <TopLevelNavItem href="/introduction">Learn</TopLevelNavItem>
            <TopLevelNavItem href="/ar-io-sdk">Build</TopLevelNavItem>
            <TopLevelNavItem href="/community-resources">
              Community Resources
            </TopLevelNavItem> */}
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-5">
        <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
        <div className="flex gap-4">
          <MobileSearch />
          <ThemeToggle />
        </div>
        {/* <div className="hidden min-[416px]:contents">
          <Button href="#">Back to Site</Button>
        </div> */}
      </div>
    </motion.div>
  )
})
