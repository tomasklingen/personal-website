import { Link } from 'react-router'
import { formatDate } from '~/lib/date'
import { getAllThoughts, type ThoughtPost } from '~/lib/thoughts'
import type { Route } from './+types/route'

export function loader({ params }: Route.ClientLoaderArgs) {
	const { tag } = params

	if (!tag) {
		throw new Response('Tag not found', { status: 404 })
	}

	const allThoughts = getAllThoughts()
	const filteredThoughts = allThoughts.filter((thought) =>
		thought.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
	)

	return {
		tag,
		thoughts: filteredThoughts,
	}
}

export function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
	return serverLoader()
}

export default function TagPage({ loaderData }: Route.ComponentProps) {
	const { tag, thoughts } = loaderData

	return (
		<div className="max-w-4xl mx-auto px-4">
			<div className="mb-8">
				<Link
					to="/thoughts"
					className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm mb-4 inline-block"
				>
					← Back to all thoughts
				</Link>
				<h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
					Thoughts tagged:{' '}
					<span className="text-emerald-600 dark:text-emerald-400">
						{tag}
					</span>
				</h1>
				<p className="text-neutral-600 dark:text-neutral-400 mt-2">
					{thoughts.length}{' '}
					{thoughts.length === 1 ? 'thought' : 'thoughts'} found
				</p>
			</div>

			{thoughts.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-neutral-500 dark:text-neutral-400">
						No thoughts found with tag "{tag}"
					</p>
				</div>
			) : (
				<div className="space-y-6">
					{thoughts.map((thought: ThoughtPost) => (
						<article
							key={`${thought.year}-${thought.slug}`}
							className="border-b border-neutral-200 dark:border-neutral-700 pb-6 last:border-b-0"
						>
							<h2 className="text-xl font-semibold mb-2">
								<Link
									to={`/thoughts/${thought.year}/${thought.slug}`}
									className="text-neutral-900 dark:text-neutral-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
								>
									{thought.title}
								</Link>
							</h2>
							<time className="text-sm text-neutral-500 dark:text-neutral-400">
								{formatDate(thought.dateCreated)}
							</time>
							{thought.tags && thought.tags.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-3">
									{thought.tags.map((thoughtTag: string) => (
										<Link
											key={thoughtTag}
											to={`/thoughts/tags/${encodeURIComponent(thoughtTag.toLowerCase())}`}
											className={`inline-block px-2 py-1 rounded text-sm font-medium transition-colors ${
												thoughtTag.toLowerCase() ===
												tag.toLowerCase()
													? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100'
													: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
											}`}
										>
											{thoughtTag}
										</Link>
									))}
								</div>
							)}
						</article>
					))}
				</div>
			)}
		</div>
	)
}
