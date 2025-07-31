'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { MDXProvider } from '@mdx-js/react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { type Section, SectionProvider } from '@/components/SectionProvider'
import DiagramWithWayfinder from '@/components/DiagramWithWayfinder'
import Tip from '@/components/Tip'
import { Table } from '@/components/Table'
import { GatewayProvider } from '@/components/GatewayProvider'
import { HeroPattern } from '@/components/HeroPattern'
import {
  CodeExecutor,
  JavaScriptExecutor,
  TypeScriptExecutor,
} from '@/components/CodeExecutor'

export function Layout({
  children,
  allSections = {},
}: {
  children: React.ReactNode
  allSections?: Record<string, Array<Section>>
}) {
  let pathname = usePathname()

  // Define custom components for MDX
  const components = {
    Diagram: DiagramWithWayfinder, // Automatically replaces <Diagram /> in MDX
    Tip: Tip,
    Table: Table, // Make Table component globally available in MDX
    CodeExecutor: CodeExecutor,
    JavaScriptExecutor: JavaScriptExecutor,
    TypeScriptExecutor: TypeScriptExecutor,
  }

  return (
    <GatewayProvider>
      <SectionProvider sections={allSections[pathname] ?? []}>
        <script
          type="module"
          src="https://junction.ar.io/sdk/browser.js"
          data-dispatcher-id="c_IREeVUlhdlOBZGWldCiPLE4rcH-dv9I64OjGo1cQQ"
          data-track-url-hashes="true"
          defer
          onError={() => console.warn('Junction script failed to load')}
        ></script>
        <script
          src="https://plausible.io/js/script.js"
          defer
          data-domain="docs.ar.io"
          onError={() => console.warn('Plausible script failed to load')}
        ></script>

        <div className="h-full lg:ml-72 xl:ml-80">
          <motion.header
            layoutScroll
            className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
          >
            <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 xl:w-80 lg:dark:border-white/10">
              <div className="hidden lg:flex">
                <Link href="/" aria-label="Home">
                  <Logo className="h-6" />
                </Link>
              </div>
              <Header />
              <Navigation className="hidden lg:mt-10 lg:block" />
            </div>
          </motion.header>
          <div className="relative flex h-full justify-center px-3 pt-14 sm:px-4 md:px-6 lg:px-8">
            <div className="flex h-full w-full max-w-sm flex-col overflow-hidden sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-none">
              <HeroPattern />
              <MDXProvider components={components}>
                <main className="w-full flex-auto overflow-x-hidden">
                  <div className="hyphens-auto break-words">{children}</div>
                </main>
              </MDXProvider>
              <Footer />
            </div>
          </div>
        </div>
      </SectionProvider>
    </GatewayProvider>
  )
}
