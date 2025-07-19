import { Outlet } from 'react-router'
import { Link } from '~/components/Link'
import type { Route } from './+types/route'

export const links: Route.LinksFunction = () => []

export default function ThoughtsRoute() {
	return (
		<main className="container mx-auto flex flex-col transition-colors">
			<header className="shadow p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center gap-4">
					<Link to="/" variant="nav">
						&larr; Home
					</Link>
					<h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-200">
						Thoughts and learnings
					</h1>
				</div>
			</header>

			<section className="flex-1">
				<Outlet />
			</section>

			<footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 p-4 text-center text-neutral-500 dark:text-neutral-400 text-sm">
				<p>© {new Date().getFullYear()} Thoughts - Tomas Klingen</p>
			</footer>
		</main>
	)
}
