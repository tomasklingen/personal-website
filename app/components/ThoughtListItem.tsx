import type React from 'react'
import { formatDate } from '~/lib/date'
import type { ThoughtPostSummary } from '~/lib/thoughts'
import { Link } from './Link'
import { Tags } from './Tags'

type ThoughtListItemProps = {
	thought: ThoughtPostSummary
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
		? 'font-medium mb-2'
		: 'text-xl font-semibold text-neutral-900 dark:text-white mb-2'
	const timeClass = isCompact
		? 'text-sm text-gray-400'
		: 'text-sm text-neutral-500 dark:text-neutral-400'

	return (
		<article className={className}>
			<header className={showReadMore ? 'mb-3' : 'mb-2'}>
				{isCompact ? (
					<h3 className={headingClass}>
						<Link
							to={`/thoughts/${thought.year}/${thought.slug}/`}
							variant="default"
						>
							{thought.title}
						</Link>
					</h3>
				) : (
					<h2 className={headingClass}>
						<Link
							to={`/thoughts/${thought.year}/${thought.slug}/`}
							variant="default"
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
								variant="tag"
								className={
									highlightedTag &&
									tag.toLowerCase() === highlightedTag.toLowerCase()
										? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100'
										: undefined
								}
							>
								{tag}
							</Link>
						))}
					</div>
				))}
		</article>
	)
}
