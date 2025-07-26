import { Link, Outlet } from 'react-router'
import avatar from '~/resources/img/avatar.avif'
import type { Route } from './+types/route'

export const links: Route.LinksFunction = () => []

export default function ThoughtsRoute() {
	return (
		<main className="container max-w-3xl mx-auto flex flex-col transition-colors py-4">
			<header className="p-4 flex items-center justify-between">
				<Link
					to="/"
					className="font-bold text-neutral-900 dark:text-neutral-200 hover:text-neutral-500 dark:hover:text-neutral-100 flex items-center gap-3"
				>
					<img
						src={avatar}
						alt="Tomas Klingen"
						className="w-8 h-8 rounded-full object-cover"
						style={{ viewTransitionName: 'avatar' }}
					/>
					Tomas Klingen
				</Link>
				<Link
					to="/thoughts"
					className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-200"
				>
					Thoughts
				</Link>
			</header>

			<section className="flex-1 px-4">
				<Outlet />
			</section>
		</main>
	)
}
