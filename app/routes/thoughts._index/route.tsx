import { ThoughtListItem } from '~/components/ThoughtListItem'
import { getAllThoughtsSummary } from '~/lib/thoughts'
import type { Route } from './+types/route'

export function meta() {
	return [
		{ title: 'Some Thoughts | Tomas Klingen' },
		{
			name: 'description',
			content: 'Browse through all my thoughts, insights, and learnings.',
		},
	]
}

export async function loader() {
	return { thoughts: await getAllThoughtsSummary() }
}

export function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
	return serverLoader()
}

export const links: Route.LinksFunction = () => []

export default function ThoughtsIndex(props: Route.ComponentProps) {
	const { thoughts } = props.loaderData

	return (
		<div className="mx-auto py-6">
			<header className="mb-8">
				<p className="text-neutral-600 dark:text-neutral-300">
					A small collection of insights and bits of things I learned.
				</p>
			</header>

			{thoughts.length === 0 ? (
				<p className="text-neutral-500 dark:text-neutral-400 text-center py-12">
					No thoughts published yet.
				</p>
			) : (
				<div className="space-y-6">
					{thoughts.map((thought) => (
						<ThoughtListItem
							key={`${thought.year}-${thought.slug}`}
							thought={thought}
							className="py-2"
							showReadMore={true}
						/>
					))}
				</div>
			)}
		</div>
	)
}
