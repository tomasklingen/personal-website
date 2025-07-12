import { useEffect } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

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

function DarkModeScript() {
	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

		function updateDarkMode() {
			if (mediaQuery.matches) {
				document.documentElement.classList.add('dark')
			} else {
				document.documentElement.classList.remove('dark')
			}
		}

		// Set initial state
		updateDarkMode()

		// Listen for changes
		mediaQuery.addEventListener('change', updateDarkMode)

		return () => mediaQuery.removeEventListener('change', updateDarkMode)
	}, [])

	return null
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="h-full">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
				<DarkModeScript />
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}
