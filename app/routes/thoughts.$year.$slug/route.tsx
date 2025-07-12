import type { Route } from './+types/route'

export const links: Route.LinksFunction = () => []

export default function ThoughtDetail({ params }: Route.ComponentProps) {
	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">
				Thought Detail: {params.year}/{params.slug}
			</h2>
			<p className="text-neutral-600 dark:text-neutral-400">
				MDX content rendering will be implemented in Phase 4
			</p>
		</div>
	)
}
