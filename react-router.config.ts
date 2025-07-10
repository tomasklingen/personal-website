import type { Config } from '@react-router/dev/config'
import { getAllThoughts } from './app/lib/thoughts'
import { distanceConfig } from './app/running/data'

const thoughts = getAllThoughts()

export const urls = [
	'/',
	...distanceConfig.map(({ slug }) => `/run/${slug}/`),
	'/thoughts/',
	...thoughts.map(({ year, slug }) => `/thoughts/${year}/${slug}/`),
]

export default {
	ssr: false, // disable runtime server rendering
	prerender: urls,
} satisfies Config
