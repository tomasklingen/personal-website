import type React from 'react'
import { Link } from './Link'

type TagsProps = {
	tags: string[]
	className?: string
}

/**
 * Component to display tags as clickable links
 */
export const Tags: React.FC<TagsProps> = ({ tags, className = '' }) => {
	if (!tags || tags.length === 0) {
		return null
	}

	return (
		<div className={`flex flex-wrap gap-2 ${className}`}>
			{tags.map((tag) => (
				<Link
					key={tag}
					variant="tag"
					to={`/thoughts/tags/${encodeURIComponent(tag.toLowerCase())}`}
					className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 px-2 py-1 rounded text-sm font-medium transition-colors"
				>
					{tag}
				</Link>
			))}
		</div>
	)
}
