import { evaluate } from '@mdx-js/mdx'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import * as runtime from 'react/jsx-runtime'

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
	const [MDXComponent, setMDXComponent] =
		React.useState<React.ComponentType | null>(null)
	const [error, setError] = React.useState<string | null>(null)

	React.useEffect(() => {
		async function compileContent() {
			try {
				const { default: Component } = await evaluate(content, {
					...runtime,
					development: false,
				})

				setMDXComponent(() => Component)
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

	if (!MDXComponent) {
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
						<h1 className="text-3xl font-bold mb-6 mt-8 first:mt-0 text-neutral-900 dark:text-neutral-100">
							{children}
						</h1>
					),
					h2: ({ children }) => (
						<h2 className="text-2xl font-semibold mb-4 mt-8 first:mt-0 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-2">
							{children}
						</h2>
					),
					h3: ({ children }) => (
						<h3 className="text-xl font-semibold mb-3 mt-6 first:mt-0 text-neutral-900 dark:text-neutral-100">
							{children}
						</h3>
					),
					p: ({ children }) => (
						<p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
							{children}
						</p>
					),
					code: ({ children, className }) => {
						// Inline code (not in pre block)
						if (!className) {
							return (
								<code className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.5 rounded text-sm font-mono">
									{children}
								</code>
							)
						}
						// Code block language detection
						const language = className?.replace('language-', '') || 'text'
						return (
							<code className={`language-${language} text-sm`}>
								{children}
							</code>
						)
					},
					pre: ({ children }) => (
						<pre className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 p-4 rounded-lg overflow-x-auto mb-6 border border-neutral-200 dark:border-neutral-600 shadow-sm">
							{children}
						</pre>
					),
					a: ({ children, href }) => (
						<a
							href={href}
							className="text-emerald-600 dark:text-emerald-400 hover:underline"
							target={href?.startsWith('http') ? '_blank' : undefined}
							rel={
								href?.startsWith('http')
									? 'noopener noreferrer'
									: undefined
							}
						>
							{children}
						</a>
					),
					ul: ({ children }) => (
						<ul className="mb-4 ml-6 list-disc space-y-1 text-neutral-700 dark:text-neutral-300">
							{children}
						</ul>
					),
					ol: ({ children }) => (
						<ol className="mb-4 ml-6 list-decimal space-y-1 text-neutral-700 dark:text-neutral-300">
							{children}
						</ol>
					),
					li: ({ children }) => (
						<li className="leading-relaxed">{children}</li>
					),
					blockquote: ({ children }) => (
						<blockquote className="border-l-4 border-emerald-500 pl-4 my-4 italic text-neutral-600 dark:text-neutral-400">
							{children}
						</blockquote>
					),
				}}
			>
				<MDXComponent />
			</MDXProvider>
		</div>
	)
}
