import type React from 'react'
import { Link } from 'react-router'
import { formatDate } from '~/lib/date'
import type { ThoughtPost } from '~/lib/thoughts'
import { Tags } from './Tags'

type ThoughtListItemProps = {
	thought: ThoughtPost
	className?: string
	showReadMore?: boolean
	highlightedTag?: string
	variant?: 'default' | 'compact'
	dateFormat?: 'default' | 'short'
}

/**
 * Shared component for displaying an individual thought item
 */
export const ThoughtListItem: React.FC<ThoughtListItemProps> = ({
	thought,
	className = '',
	showReadMore = false,
	highlightedTag,
	variant = 'default',
	dateFormat = 'default',
}) => {
	const isCompact = variant === 'compact'
	const headingClass = isCompact
		? 'font-medium text-gray-200 mb-2'
		: 'text-xl font-semibold text-neutral-900 dark:text-white mb-2'
	const timeClass = isCompact
		? 'text-sm text-gray-400'
		: 'text-sm text-neutral-500 dark:text-neutral-400'

	return (
		<article className={className}>
			<header className={showReadMore ? 'mb-3' : 'mb-2'}>
				{isCompact ? (
					<h4 className={headingClass}>
						<Link
							to={`/thoughts/${thought.year}/${thought.slug}/`}
							className="hover:text-emerald-400 transition-colors"
						>
							{thought.title}
						</Link>
					</h4>
				) : (
					<h2 className={headingClass}>
						<Link
							to={`/thoughts/${thought.year}/${thought.slug}/`}
							className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
						>
							{thought.title}
						</Link>
					</h2>
				)}
				<time
					dateTime={thought.dateCreated.toISOString()}
					className={timeClass}
				>
					{formatDate(
						thought.dateCreated,
						dateFormat === 'short' ? 'short' : undefined,
					)}
				</time>
			</header>

			{/* Tags */}
			{thought.tags &&
				thought.tags.length > 0 &&
				(isCompact ? (
					<Tags tags={thought.tags} className="mt-2" />
				) : (
					<div className="flex flex-wrap gap-2 my-3">
						{thought.tags.map((tag) => (
							<Link
								key={tag}
								to={`/thoughts/tags/${encodeURIComponent(tag.toLowerCase())}`}
								className={`inline-block px-2 py-1 rounded text-sm font-medium transition-colors ${
									highlightedTag &&
									tag.toLowerCase() === highlightedTag.toLowerCase()
										? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100'
										: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
								}`}
							>
								{tag}
							</Link>
						))}
					</div>
				))}

			{/* Read more link */}
			{showReadMore && (
				<div className="text-neutral-600 dark:text-neutral-300">
					<Link
						to={`/thoughts/${thought.year}/${thought.slug}/`}
						className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
					>
						Read more →
					</Link>
				</div>
			)}
		</article>
	)
}
