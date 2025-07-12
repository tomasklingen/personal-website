import { Link } from 'react-router'
import { formatDate } from '~/lib/date'
import { getAllThoughts } from '~/lib/thoughts'
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

export function loader() {
	return { thoughts: getAllThoughts() }
}

export function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
	return serverLoader()
}

export const links: Route.LinksFunction = () => []

export default function ThoughtsIndex(props: Route.ComponentProps) {
	const { thoughts } = props.loaderData

	return (
		<div className="max-w-4xl mx-auto p-6">
			<header className="mb-8">
				<h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
					All Thoughts
				</h1>
				<p className="text-neutral-600 dark:text-neutral-400">
					A collection of insights and learnings from my journey.
				</p>
			</header>

			{thoughts.length === 0 ? (
				<p className="text-neutral-500 dark:text-neutral-400 text-center py-12">
					No thoughts published yet.
				</p>
			) : (
				<div className="space-y-6">
					{thoughts.map((thought) => (
						<article
							key={`${thought.year}-${thought.slug}`}
							className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 hover:shadow-md transition-shadow"
						>
							<header className="mb-3">
								<h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
									<Link
										to={`/thoughts/${thought.year}/${thought.slug}/`}
										className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
									>
										{thought.title}
									</Link>
								</h2>
								<time
									dateTime={thought.dateCreated.toISOString()}
									className="text-sm text-neutral-500 dark:text-neutral-400"
								>
									{formatDate(thought.dateCreated)}
								</time>
							</header>
							<div className="text-neutral-600 dark:text-neutral-300">
								<Link
									to={`/thoughts/${thought.year}/${thought.slug}/`}
									className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
								>
									Read more →
								</Link>
							</div>
						</article>
					))}
				</div>
			)}
		</div>
	)
}
