import picoUrl from '@picocss/pico/css/pico.classless.css?url'
import { NavLink, Outlet, replace } from 'react-router'
import { distanceConfig } from '~/running/data'
import type { Route } from './+types/route'
import './run.css'

export const links: Route.LinksFunction = () => [
	{
		rel: 'stylesheet',
		href: picoUrl,
	},
]

export function clientLoader({ params }: Route.ClientActionArgs) {
	if (Object.keys(params).length === 0) {
		throw replace('5k')
	}
}

export default function RunRoute() {
	return (
		<main>
			<header>
				<h1>Running Pace Table</h1>
				<hr />
			</header>

			<nav>
				<ul>
					{distanceConfig.map(({ slug, shortLabel }) => (
						<li key={slug}>
							<NavLink to={slug}>{shortLabel}</NavLink>
						</li>
					))}
				</ul>
			</nav>

			<Outlet />

			<footer>
				<p>© {new Date().getFullYear()} Running Paces - Tomas Klingen</p>
			</footer>
		</main>
	)
}
