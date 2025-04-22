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
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap',
	},
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

	return (
		<link
			rel="canonical"
			href={`${host}${canonicalPath}${location.search}`}
		/>
	)
}

export default function App() {
	return <Outlet />
}
