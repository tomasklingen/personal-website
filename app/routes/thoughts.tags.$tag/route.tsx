import { ThoughtListItem } from '~/components/ThoughtListItem'
import { getAllThoughtsSummary } from '~/lib/thoughts'
import type { Route } from './+types/route'

export async function loader({ params }: Route.ClientLoaderArgs) {
	const { tag } = params

	if (!tag) {
		throw new Response('Tag not found', { status: 404 })
	}

	const allThoughts = await getAllThoughtsSummary()
	const filteredThoughts = allThoughts.filter((thought) =>
		thought.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
	)

	return {
		tag,
		thoughts: filteredThoughts,
	}
}

export default function TagPage({ loaderData }: Route.ComponentProps) {
	const { tag, thoughts } = loaderData

	return (
		<div className="mx-auto py-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
					Thoughts tagged:{' '}
					<span className="text-emerald-600 dark:text-emerald-300">
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
					{thoughts.map((thought) => (
						<ThoughtListItem
							key={`${thought.year}-${thought.slug}`}
							thought={thought}
							className="py-2"
							highlightedTag={tag}
						/>
					))}
				</div>
			)}
		</div>
	)
}
