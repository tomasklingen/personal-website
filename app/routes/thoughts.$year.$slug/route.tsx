import { MDXContent } from '~/components/MDXContent'
import { formatDate } from '~/lib/date'
import { getAllThoughts } from '~/lib/thoughts'
import type { Route } from './+types/route'

export function meta({ data }: Route.MetaArgs) {
	if (!data) {
		return [{ title: '404 - Thought Not Found | Tomas Klingen' }]
	}

	return [
		{ title: `${data.title} | Thoughts | Tomas Klingen` },
		{
			name: 'description',
			content: `A collection of insights and learnings on ${data.title}.`,
		},
	]
}

export function loader({ params }: Route.LoaderArgs) {
	const thoughts = getAllThoughts()
	const thought = thoughts.find(
		(t) => t.year === params.year && t.slug === params.slug,
	)

	if (!thought) {
		throw new Response('Not Found', { status: 404 })
	}

	return thought
}

export function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
	return serverLoader()
}

export const links: Route.LinksFunction = () => []

export default function ThoughtDetail(props: Route.ComponentProps) {
	const thought = props.loaderData

	return (
		<article className="max-w-4xl mx-auto p-6">
			<header className="mb-8">
				<h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
					{thought.title}
				</h1>
				<time
					dateTime={thought.dateCreated.toISOString()}
					className="text-sm text-neutral-500 dark:text-neutral-400"
				>
					{formatDate(thought.dateCreated)}
				</time>
			</header>

			<div className="max-w-none">
				<MDXContent content={thought.content} />
			</div>
		</article>
	)
}
