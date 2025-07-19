import { PrecompiledMDXContent } from '~/components/PrecompiledMDXContent'
import { Tags } from '~/components/Tags'
import { formatDate } from '~/lib/date'
import {
	generateBlogPostingSchema,
	generateJsonLdMeta,
} from '~/lib/structured-data'
import { getAllThoughts } from '~/lib/thoughts'
import type { Route } from './+types/route'

import './blogpost.css'

export function meta({ data }: Route.MetaArgs) {
	if (!data) {
		return [{ title: '404 - Thought Not Found | Tomas Klingen' }]
	}

	const blogPostingSchema = generateBlogPostingSchema({
		title: data.title,
		url: `https://tomasklingen.github.io/thoughts/${data.year}/${data.slug}`,
		datePublished: data.dateCreated.toISOString(),
		description: `A collection of insights and learnings on ${data.title}.`,
	})

	return [
		{ title: `${data.title} | Thoughts | Tomas Klingen` },
		{
			name: 'description',
			content: `A collection of insights and learnings on ${data.title}.`,
		},
		generateJsonLdMeta(blogPostingSchema),
	]
}

export async function loader({ params }: Route.LoaderArgs) {
	const thoughts = await getAllThoughts()
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
		<article className="mx-auto py-6">
			<header className="mb-8">
				<h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200 mb-2">
					{thought.title}
				</h1>
				<time
					dateTime={thought.dateCreated.toISOString()}
					className="text-sm text-neutral-500 dark:text-neutral-400"
				>
					{formatDate(thought.dateCreated)}
				</time>
				{thought.tags && thought.tags.length > 0 && (
					<Tags tags={thought.tags} className="mt-4" />
				)}
			</header>

			<div className="max-w-none dark:text-neutral-300">
				<PrecompiledMDXContent htmlContent={thought.compiledContent} />
			</div>
		</article>
	)
}
