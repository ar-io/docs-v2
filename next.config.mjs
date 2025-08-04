import nextMDX from '@next/mdx'

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.BASE_PATH || '',
  // Only set assetPrefix for GitHub Pages builds to fix chunk loading
  assetPrefix: process.env.BASE_PATH || '',
  trailingSlash: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '**/*': ['./src/app/**/*.mdx'],
  },
  // experimental: {
  //   disableRuntimeJS: true
  // },
  // Note: headers() doesn't work with static export
  // WebContainer requires COOP/COEP headers which need to be set by the hosting server
  // For development, you can use a proxy or configure your dev server
  webpack: (config, { isServer }) => {
    config.plugins.push(new NodePolyfillPlugin())

    // Fix OpenTelemetry Node.js modules for client-side builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
        child_process: false,
        fs: false,
        net: false,
        tls: false,
      }
    }

    // Fix chunk loading for GitHub Pages with basePath
    if (
      !isServer &&
      process.env.BASE_PATH &&
      process.env.NODE_ENV === 'production'
    ) {
      config.output.publicPath = `${process.env.BASE_PATH}/_next/`
    }

    return config
  },
}

export default withSearch(withMDX(nextConfig))
