'use client'

import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

// Import ARIO SDK at the component level
let ARIOSDK: any = null
try {
  // Dynamic import to avoid SSR issues
  if (typeof window !== 'undefined') {
    // Try to load from CDN for production deployments
    const loadSDK = async () => {
      try {
        // For production/GitHub Pages, try CDN version
        if (
          window.location.hostname !== 'localhost' &&
          window.location.hostname !== '127.0.0.1'
        ) {
          // Use CDN version for production
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/@ar.io/sdk@latest/dist/browser.js'
          script.onload = () => {
            if ((window as any).ARIO) {
              ARIOSDK = (window as any).ARIO
            }
          }
          script.onerror = () => {
            // Fallback to local import if CDN fails
            import('@ar.io/sdk')
              .then((module) => {
                ARIOSDK = module.ARIO
              })
              .catch((error) => {
                console.warn('Failed to load ARIO SDK:', error)
              })
          }
          document.head.appendChild(script)
        } else {
          // Use local import for development
          const { ARIO } = await import('@ar.io/sdk')
          ARIOSDK = ARIO
        }
      } catch (error) {
        console.warn('Failed to load ARIO SDK:', error)
      }
    }

    loadSDK()
  }
} catch (error) {
  console.warn('ARIO SDK import failed:', error)
}

interface CodeExecutorProps {
  children?: React.ReactNode
  title?: string
  code?: string
  language?: 'javascript' | 'typescript'
  theme?: 'dark' | 'light'
  height?: number
  className?: string
  autorun?: boolean
  showConsole?: boolean
  showOutput?: boolean
}

interface ConsoleMessage {
  type: 'log' | 'error' | 'warn' | 'info'
  message: string
  timestamp: Date
}

export function CodeExecutor({
  children,
  title,
  code = '',
  language = 'javascript',
  theme = 'dark',
  height = 400,
  className,
  autorun = false,
  showConsole = true,
  showOutput = true,
}: CodeExecutorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [output, setOutput] = useState<string>('')
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([])
  const [error, setError] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [editableCode, setEditableCode] = useState<string>(
    code || (typeof children === 'string' ? children : ''),
  )

  const containerClassName = clsx(
    'my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10',
    className,
  )

  // Initialize console capture
  useEffect(() => {
    // Store original console methods
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
    }

    // Override console methods to capture output
    const addConsoleMessage = (
      type: ConsoleMessage['type'],
      ...args: any[]
    ) => {
      const message = args
        .map((arg) =>
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg),
        )
        .join(' ')

      // Filter out Wayfinder and component initialization messages from custom panel
      const shouldFilter = [
        'Creating global AR.IO Wayfinder',
        'Global Wayfinder created successfully',
        'Gateway provider ready with global wayfinder',
        'Failed to preload ARIO SDK:',
        'ARIO SDK import failed:',
      ].some((filterText) => message.includes(filterText))

      if (!shouldFilter) {
        setConsoleMessages((prev) => [
          ...prev,
          {
            type,
            message,
            timestamp: new Date(),
          },
        ])
      }
    }

    console.log = (...args: any[]) => {
      originalConsole.log(...args)
      addConsoleMessage('log', ...args)
    }
    console.error = (...args: any[]) => {
      originalConsole.error(...args)
      addConsoleMessage('error', ...args)
    }
    console.warn = (...args: any[]) => {
      originalConsole.warn(...args)
      addConsoleMessage('warn', ...args)
    }
    console.info = (...args: any[]) => {
      originalConsole.info(...args)
      addConsoleMessage('info', ...args)
    }

    // Restore original console methods on cleanup
    return () => {
      console.log = originalConsole.log
      console.error = originalConsole.error
      console.warn = originalConsole.warn
      console.info = originalConsole.info
    }
  }, [])

  const executeCode = async () => {
    if (!editableCode.trim()) return

    setIsRunning(true)
    setError('')
    setConsoleMessages([])
    setOutput('')

    try {
      // Load ARIO SDK outside the function context
      let arioSDK = null
      try {
        if (ARIOSDK) {
          arioSDK = ARIOSDK
        } else if ((window as any).ARIO) {
          // Check if CDN-loaded SDK is available
          arioSDK = (window as any).ARIO
        } else {
          // Fallback to local import
          const { ARIO } = await import('@ar.io/sdk')
          arioSDK = ARIO
        }
      } catch (sdkError) {
        console.error('Failed to load ARIO SDK:', sdkError)
        const errorMessage =
          sdkError instanceof Error ? sdkError.message : String(sdkError)
        throw new Error('ARIO SDK failed to load: ' + errorMessage)
      }

      // Create a function that can access the ARIO SDK
      const executeFunction = new Function(
        'ARIO',
        `
          return (async function() {
            try {
              // ARIO is now available in the execution context
              ${editableCode}
            } catch (error) {
              console.error('Code execution error:', error.message);
              throw error;
            }
          })();
        `,
      )

      const result = await executeFunction(arioSDK)

      if (result !== undefined && result !== null) {
        const resultStr =
          typeof result === 'object'
            ? JSON.stringify(result, null, 2)
            : String(result)
        setOutput(resultStr)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(errorMessage)
      // Don't log this to console.error since it will be filtered out
      // The error is already displayed in the custom panel
    } finally {
      setIsRunning(false)
    }
  }

  const clearOutput = () => {
    setOutput('')
    setError('')
    setConsoleMessages([])
  }

  return (
    <div className={containerClassName}>
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4 py-2">
          <h3 className="mr-auto pt-3 text-xs font-semibold text-white">
            {title}
          </h3>
          <div className="flex gap-2">
            <button
              className="mt-2 rounded border border-emerald-600 bg-emerald-700 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
              onClick={executeCode}
              disabled={isRunning}
            >
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
            <button
              className="mt-2 rounded border border-zinc-600 bg-zinc-700 px-3 py-1 text-xs font-medium text-white hover:bg-zinc-600"
              onClick={clearOutput}
            >
              Clear
            </button>
            <button
              className="mt-2 rounded border border-zinc-600 bg-zinc-700 px-3 py-1 text-xs font-medium text-white hover:bg-zinc-600"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div
        className="not-prose"
        style={{
          height: isExpanded ? 'auto' : `${height}px`,
          maxHeight: isExpanded ? 'none' : `${height}px`,
          overflow: isExpanded ? 'visible' : 'hidden',
        }}
      >
        <div className="flex h-full">
          {/* Code Editor */}
          <div className="flex-1 bg-zinc-900">
            <div className="border-b border-zinc-700 bg-zinc-800 px-4 py-2">
              <span className="text-xs font-medium text-zinc-300">
                {language.toUpperCase()}
              </span>
            </div>
            <div className="p-4">
              <textarea
                value={editableCode}
                onChange={(e) => setEditableCode(e.target.value)}
                className="h-full min-h-[300px] w-full resize-none border-none bg-zinc-900 font-mono text-sm text-zinc-100 outline-none"
                placeholder="Enter your code here..."
                spellCheck={false}
                style={{
                  fontFamily:
                    'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                  lineHeight: '1.5',
                }}
              />
            </div>
          </div>

          {/* Output Panel */}
          {(showOutput || showConsole) && (
            <div className="w-1/2 border-l border-zinc-700 bg-zinc-900">
              <div className="border-b border-zinc-700 bg-zinc-800 px-4 py-2">
                <span className="text-xs font-medium text-zinc-300">
                  Output
                </span>
              </div>

              <div className="h-full overflow-auto p-4">
                {/* Error Display */}
                {error && (
                  <div className="mb-4 rounded border border-red-700 bg-red-900/20 p-3">
                    <div className="mb-1 text-sm font-medium text-red-400">
                      ❌ Execution Error:
                    </div>
                    <pre className="whitespace-pre-wrap text-sm text-red-300">
                      {error}
                    </pre>
                  </div>
                )}

                {/* Output Display */}
                {showOutput && output && (
                  <div className="mb-4">
                    <div className="mb-1 text-sm font-medium text-zinc-400">
                      Result:
                    </div>
                    <pre className="overflow-auto rounded bg-zinc-800 p-2 text-sm text-zinc-200">
                      {output}
                    </pre>
                  </div>
                )}

                {/* Console Messages */}
                {showConsole && consoleMessages.length > 0 && (
                  <div>
                    <div className="mb-1 text-sm font-medium text-zinc-400">
                      Console:
                    </div>
                    <div className="space-y-1">
                      {consoleMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`font-mono text-sm ${
                            msg.type === 'error'
                              ? 'text-red-400'
                              : msg.type === 'warn'
                                ? 'text-yellow-400'
                                : msg.type === 'info'
                                  ? 'text-blue-400'
                                  : 'text-zinc-300'
                          }`}
                        >
                          <span className="text-zinc-500">
                            [{msg.timestamp.toLocaleTimeString()}]
                          </span>{' '}
                          <span className="text-zinc-600">
                            {msg.type.toUpperCase()}:
                          </span>{' '}
                          {msg.message}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!error && !output && consoleMessages.length === 0 && (
                  <div className="py-8 text-center text-zinc-500">
                    <div className="text-sm">
                      Click &quot;Run Code&quot; to execute the code
                    </div>
                  </div>
                )}

                {/* Error-only state */}
                {error && !output && consoleMessages.length === 0 && (
                  <div className="py-4 text-center text-zinc-500">
                    <div className="text-sm">
                      Error occurred during execution
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expand/Collapse Button for non-titled versions */}
      {!title && (
        <div className="flex justify-end bg-zinc-900 px-4 pb-4">
          <button
            className="mt-2 rounded border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-white hover:bg-zinc-700"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      )}
    </div>
  )
}

// Convenience components for different languages
export function JavaScriptExecutor(props: Omit<CodeExecutorProps, 'language'>) {
  return <CodeExecutor {...props} language="javascript" />
}

export function TypeScriptExecutor(props: Omit<CodeExecutorProps, 'language'>) {
  return <CodeExecutor {...props} language="typescript" />
}
