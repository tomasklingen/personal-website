import type { Config } from '@react-router/dev/config'
import { getAllThoughts } from './app/lib/thoughts'
import { distanceConfig } from './app/running/data'

const thoughts = getAllThoughts()

// Get all unique tags
const allTags = new Set(
	thoughts.flatMap(
		(thought) => thought.tags?.map((tag) => tag.toLowerCase()) ?? [],
	),
)

export const urls = [
	'/',
	...distanceConfig.map(({ slug }) => `/run/${slug}/`),
	'/thoughts/',
	...thoughts.map(({ year, slug }) => `/thoughts/${year}/${slug}/`),
	...Array.from(allTags).map(
		(tag) => `/thoughts/tags/${encodeURIComponent(tag)}/`,
	),
]

export default {
	ssr: false, // disable runtime server rendering
	prerender: urls,
} satisfies Config
