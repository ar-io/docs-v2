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
    if (!isServer) {
      if (process.env.BASE_PATH && process.env.NODE_ENV === 'production') {
        config.output.publicPath = `${process.env.BASE_PATH}/_next/`
      }
      
      // Fix for ARIO SDK and other dynamic imports
      config.resolve.alias = {
        ...config.resolve.alias,
        // Ensure ARIO SDK uses the browser bundle
        '@ar.io/sdk': '@ar.io/sdk/web',
      }
      
      // Ensure all chunks use relative paths to avoid GitHub Pages issues
      config.output.chunkFilename = 'static/chunks/[name].[chunkhash].js'
      config.output.filename = 'static/chunks/[name].[chunkhash].js'
      
      // Fix for dynamic imports and chunk loading
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            default: {
              minChunks: 1,
              priority: -20,
              reuseExistingChunk: true,
            },
            // Bundle ARIO SDK into a single chunk to avoid chunk loading issues
            arioSDK: {
              test: /[\\/]node_modules[\\/]@ar\.io[\\/]sdk[\\/]/,
              name: 'ario-sdk',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      }
    }

    return config
  },
}

export default withSearch(withMDX(nextConfig))
