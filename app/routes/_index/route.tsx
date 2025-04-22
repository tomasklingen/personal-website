import type { MetaFunction } from 'react-router'
import avatar from '~/resources/img/avatar.avif'
import { Home as HomeComponent } from './home'

export const meta: MetaFunction = () => {
	return [
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
	]
}

export default function Home() {
	return <HomeComponent />
}
