'use client'

import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { WebContainer } from '@webcontainer/api'

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

// Global WebContainer instance to avoid "Unable to create more instances" error
let globalWebContainer: WebContainer | null = null
let globalWebContainerPromise: Promise<WebContainer> | null = null

export function WebContainerExecutor({
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
  const [isInitialized, setIsInitialized] = useState(false)
  const [editableCode, setEditableCode] = useState<string>(
    code || (typeof children === 'string' ? children : ''),
  )

  const webcontainerRef = useRef<WebContainer | null>(null)

  const containerClassName = clsx(
    'my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10',
    className,
  )

  // Initialize WebContainer
  useEffect(() => {
    const initWebContainer = async () => {
      try {
        console.log('Initializing WebContainer...')

        // Use global instance if available, otherwise create new one
        let webcontainerInstance: WebContainer

        if (globalWebContainer) {
          webcontainerInstance = globalWebContainer
          console.log('Using existing WebContainer instance')
        } else if (globalWebContainerPromise) {
          webcontainerInstance = await globalWebContainerPromise
          console.log('Using existing WebContainer promise')
        } else {
          console.log('Creating new WebContainer instance')
          globalWebContainerPromise = WebContainer.boot()
          webcontainerInstance = await globalWebContainerPromise
          globalWebContainer = webcontainerInstance
          globalWebContainerPromise = null
        }

        webcontainerRef.current = webcontainerInstance

        // Mount initial files
        await webcontainerInstance.mount({
          'package.json': {
            file: {
              contents: JSON.stringify({
                name: 'ario-example',
                type: 'module',
                dependencies: {
                  '@ar.io/sdk': 'latest',
                },
              }),
            },
          },
          'index.js': {
            file: {
              contents:
                editableCode || 'console.log("Hello from WebContainer!");',
            },
          },
        })

        setIsInitialized(true)
        console.log('WebContainer initialized successfully')
      } catch (error) {
        console.error('Failed to initialize WebContainer:', error)
        const errorMessage =
          error instanceof Error ? error.message : String(error)

        // Check if it's a CORS/WebAssembly error
        if (
          errorMessage.includes('WebAssembly.Memory') ||
          errorMessage.includes('Cross-Origin')
        ) {
          setError(
            'WebContainer requires specific CORS headers that are not available in this environment. ' +
              'This is a known limitation with static exports. ' +
              'Please use the browser-based CodeExecutor instead.',
          )
        } else {
          setError('Failed to initialize WebContainer: ' + errorMessage)
        }
      }
    }

    if (typeof window !== 'undefined') {
      initWebContainer()
    }
  }, [])

  const executeCode = async () => {
    if (!editableCode.trim() || !webcontainerRef.current || !isInitialized) {
      setError('WebContainer not ready. Please wait for initialization.')
      return
    }

    setIsRunning(true)
    setError('')
    setConsoleMessages([])
    setOutput('')

    try {
      const webcontainerInstance = webcontainerRef.current

      // Update the index.js file with new code
      await webcontainerInstance.mount({
        'index.js': {
          file: {
            contents: editableCode,
          },
        },
      })

      // Install dependencies if needed
      try {
        await webcontainerInstance.spawn('npm', ['install'])
      } catch (installError) {
        console.warn(
          'Dependencies already installed or install failed:',
          installError,
        )
      }

      // Run the code
      const process = await webcontainerInstance.spawn('node', ['index.js'])

      let processOutput = ''
      let processError = ''

      // Capture stdout
      process.output.pipeTo(
        new WritableStream({
          write(chunk) {
            const message = chunk
            processOutput += message
            setConsoleMessages((prev) => [
              ...prev,
              {
                type: 'log',
                message,
                timestamp: new Date(),
              },
            ])
          },
        }),
      )

      // Capture stderr
      process.exit
        .then((exitCode) => {
          if (exitCode !== 0) {
            setError(`Process exited with code ${exitCode}`)
          }
          if (processOutput) {
            setOutput(processOutput)
          }
          setIsRunning(false)
        })
        .catch((error) => {
          setError(
            'Execution failed: ' +
              (error instanceof Error ? error.message : String(error)),
          )
          setIsRunning(false)
        })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(errorMessage)
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
              disabled={isRunning || !isInitialized}
            >
              {!isInitialized
                ? 'Initializing...'
                : isRunning
                  ? 'Running...'
                  : 'Run Code'}
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
                      {!isInitialized
                        ? 'Initializing WebContainer...'
                        : 'Click "Run Code" to execute the code'}
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
export function WebContainerJavaScriptExecutor(
  props: Omit<CodeExecutorProps, 'language'>,
) {
  return <WebContainerExecutor {...props} language="javascript" />
}

export function WebContainerTypeScriptExecutor(
  props: Omit<CodeExecutorProps, 'language'>,
) {
  return <WebContainerExecutor {...props} language="typescript" />
}
