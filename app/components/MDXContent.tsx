import { compile } from '@mdx-js/mdx'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'

type MDXContentProps = {
	content: string
	className?: string
}

/**
 * Component to render MDX content
 */
export const MDXContent: React.FC<MDXContentProps> = ({
	content,
	className,
}) => {
	const [Component, setComponent] = React.useState<React.ComponentType | null>(
		null,
	)
	const [error, setError] = React.useState<string | null>(null)

	React.useEffect(() => {
		async function compileContent() {
			try {
				const compiled = await compile(content, {
					outputFormat: 'function-body',
					development: false,
				})

				// Create a function from the compiled code
				const fn = new Function('React', compiled.toString())
				const MDXComponent = fn(React)

				setComponent(() => MDXComponent)
				setError(null)
			} catch (err) {
				console.error('MDX compilation error:', err)
				setError(err instanceof Error ? err.message : 'Unknown error')
			}
		}

		compileContent()
	}, [content])

	if (error) {
		return (
			<div className="text-red-600 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded">
				Error rendering content: {error}
			</div>
		)
	}

	if (!Component) {
		return (
			<div className="animate-pulse">
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
			</div>
		)
	}

	return (
		<div className={className}>
			<MDXProvider
				components={{
					h1: ({ children }) => (
						<h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
							{children}
						</h1>
					),
					h2: ({ children }) => (
						<h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
							{children}
						</h2>
					),
					p: ({ children }) => (
						<p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
							{children}
						</p>
					),
					code: ({ children }) => (
						<code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
							{children}
						</code>
					),
					pre: ({ children }) => (
						<pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
							{children}
						</pre>
					),
				}}
			>
				<Component />
			</MDXProvider>
		</div>
	)
}
