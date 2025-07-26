import { Link, NavLink, Outlet, redirect } from 'react-router'
import { distanceConfig } from '~/running/data'
import type { Route } from './+types/route'

export const links: Route.LinksFunction = () => []

export function clientLoader({ params }: Route.ClientActionArgs) {
	if (Object.keys(params).length === 0) {
		throw redirect('5k/')
	}
}

export default function RunRoute() {
	return (
		<main className="container mx-auto flex flex-col transition-colors">
			<header className="shadow p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center gap-4">
					<Link
						to="/"
						className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
					>
						&larr; Home
					</Link>
					<h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
						Running Paces
					</h1>
				</div>
				<hr className="my-2 md:hidden border-neutral-200 dark:border-neutral-800" />
			</header>

			<nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 p-2">
				<ul className="flex flex-wrap gap-2">
					{distanceConfig.map(({ slug, shortLabel }) => (
						<li key={slug}>
							<NavLink
								to={`${slug}/`}
								className={({ isActive }) =>
									`px-3 py-1 rounded transition-colors font-medium ${isActive ? 'bg-emerald-700 text-white dark:bg-emerald-400 dark:text-neutral-900' : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'}`
								}
							>
								{shortLabel}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>

			<section className="flex-1">
				<Outlet />
			</section>
		</main>
	)
}
