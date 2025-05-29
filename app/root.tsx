import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
} from 'react-router'

import type { Route } from './+types/root'
import './app.css'

export const links: Route.LinksFunction = () => [
	{
		rel: 'icon',
		href: '/favicon.ico',
		sizes: '48x48',
	},
]

export function meta() {
	return [
		{ title: 'Tomas Klingen - Front-end Web Developer 👨‍💻🎧' },
		{
			name: 'author',
			content: 'Tomas Klingen',
		},
	]
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
				<CanonicalLink />
			</head>
			<body className="min-h-screen bg-neutral-100 dark:bg-neutral-900">
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

function CanonicalLink() {
	const location = useLocation()
	const canonicalPath = location.pathname.replace(/\/$/, '')
	const host = import.meta.env.BASE_URL.replace(/\/$/, '')
	const href = `${host}${canonicalPath}${location.search}`

	if (!href) return null

	return <link rel="canonical" href={href} />
}

export default function App() {
	return <Outlet />
}
