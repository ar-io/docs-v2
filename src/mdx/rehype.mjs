import { slugifyWithCounter } from '@sindresorhus/slugify'
import * as acorn from 'acorn'
import { toString } from 'mdast-util-to-string'
import { mdxAnnotations } from 'mdx-annotations'
import shiki from 'shiki'
import { visit } from 'unist-util-visit'
import rehypeExternalLinks from 'rehype-external-links'

function rehypeParseCodeBlocks() {
  return (tree) => {
    visit(tree, 'element', (node, _nodeIndex, parentNode) => {
      if (node.tagName === 'code') {
        parentNode.properties.language = node.properties.className
          ? node.properties?.className[0]?.replace(/^language-/, '')
          : 'txt'
      }
    })
  }
}

let highlighter

function rehypeShiki() {
  return async (tree) => {
    highlighter =
      highlighter ?? (await shiki.getHighlighter({ theme: 'css-variables' }))

    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre' && node.children[0]?.tagName === 'code') {
        let codeNode = node.children[0]
        let textNode = codeNode.children[0]

        node.properties.code = textNode.value

        if (node.properties.language) {
          try {
            let tokens = highlighter.codeToThemedTokens(
              textNode.value,
              node.properties.language,
            )

            textNode.value = shiki.renderToHtml(tokens, {
              elements: {
                pre: ({ children }) => children,
                code: ({ children }) => children,
                line: ({ children }) => `<span>${children}</span>`,
              },
            })
          } catch (error) {
            // If Shiki fails (e.g., due to complex regex patterns), fall back to plain text
            console.warn(
              `Shiki highlighting failed for ${node.properties.language}:`,
              error.message,
            )
            // Keep the original text content without highlighting
            textNode.value = textNode.value
          }
        }
      }
    })
  }
}

function rehypeSlugify() {
  return (tree) => {
    let slugify = slugifyWithCounter()
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h2' && !node.properties.id) {
        node.properties.id = slugify(toString(node))
      }
    })
  }
}

function rehypeAddMDXExports(getExports) {
  return (tree) => {
    let exports = Object.entries(getExports(tree))

    for (let [name, value] of exports) {
      for (let node of tree.children) {
        if (
          node.type === 'mdxjsEsm' &&
          new RegExp(`export\\s+const\\s+${name}\\s*=`).test(node.value)
        ) {
          return
        }
      }

      let exportStr = `export const ${name} = ${value}`

      tree.children.push({
        type: 'mdxjsEsm',
        value: exportStr,
        data: {
          estree: acorn.parse(exportStr, {
            sourceType: 'module',
            ecmaVersion: 'latest',
          }),
        },
      })
    }
  }
}

function getSections(node) {
  let sections = []

  for (let child of node.children ?? []) {
    if (child.type === 'element' && child.tagName === 'h2') {
      sections.push(`{
        title: ${JSON.stringify(toString(child))},
        id: ${JSON.stringify(child.properties.id)},
        ...${child.properties.annotation}
      }`)
    } else if (child.children) {
      sections.push(...getSections(child))
    }
  }

  return sections
}

export const rehypePlugins = [
  mdxAnnotations.rehype,
  rehypeParseCodeBlocks,
  rehypeShiki,
  rehypeSlugify,
  [
    rehypeExternalLinks,
    {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
      test: (href) => {
        // Consider a link external if it starts with http://, https://, or ar://
        // Ensure href is a string before testing
        if (!href || typeof href !== 'string') {
          return false
        }
        return (
          href.startsWith('http://') ||
          href.startsWith('https://') ||
          href.startsWith('ar://')
        )
      },
      content: {
        type: 'element',
        tagName: 'svg',
        properties: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 12,
          height: 12,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          className: 'ml-1 inline-block',
        },
        children: [
          {
            type: 'element',
            tagName: 'path',
            properties: {
              d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
            },
          },
          {
            type: 'element',
            tagName: 'polyline',
            properties: {
              points: '15 3 21 3 21 9',
            },
          },
          {
            type: 'element',
            tagName: 'line',
            properties: {
              x1: '10',
              y1: '14',
              x2: '21',
              y2: '3',
            },
          },
        ],
      },
    },
  ],
  [
    rehypeAddMDXExports,
    (tree) => ({
      sections: `[${getSections(tree).join()}]`,
    }),
  ],
]
