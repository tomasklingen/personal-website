import type { MetaFunction } from 'react-router'
import { generateJsonLdMeta, generatePersonSchema } from '~/lib/structured-data'
import { getAllThoughtsSummary } from '~/lib/thoughts'
import avatar from '~/resources/img/avatar.avif'
import type { Route } from './+types/route'
import { Home as HomeComponent } from './home'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Tomas Klingen - Front-end Web Developer' },
		{
			name: 'description',
			content:
				'Meet Tomas Klingen, a passionate Front-end Web Developer based in the Netherlands. Explore his portfolio showcasing expertise in React, Angular, TypeScript, and crafting modern, user-centric web applications.',
		},
		{
			property: 'og:title',
			content: 'Tomas Klingen - Front-end Web Developer',
		},
		{
			property: 'og:description',
			content:
				'Meet Tomas Klingen, a passionate Front-end Web Developer based in the Netherlands. Explore his portfolio showcasing expertise in React, Angular, TypeScript, and crafting modern, user-centric web applications.',
		},
		{
			property: 'og:image',
			content: avatar,
		},
		generateJsonLdMeta(generatePersonSchema()),
	]
}

export async function loader() {
	const thoughts = await getAllThoughtsSummary()
	return { recentThoughts: thoughts.slice(0, 3) }
}

export function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
	return serverLoader()
}

export default function Home(props: Route.ComponentProps) {
	return <HomeComponent recentThoughts={props.loaderData.recentThoughts} />
}
