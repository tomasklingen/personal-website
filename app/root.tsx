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
import { Footer } from './components/Footer'
import favicon from './resources/favicon.ico'
import { GridGlowEffect } from './routes/_index/GridGlowEffect'

export const links: Route.LinksFunction = () => [
	{
		rel: 'icon',
		href: favicon,
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
			</head>
			<body className="min-h-screen bg-neutral-100 dark:bg-neutral-900">
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	const location = useLocation()
	const isHomePage = location.pathname === '/'

	return (
		<div className="flex-1 relative z-10">
			{isHomePage && <GridGlowEffect />}
			<div className="flex flex-col relative">
				<Outlet />
			</div>
			<Footer />
		</div>
	)
}
