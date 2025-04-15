import type { Config } from '@react-router/dev/config'
import { distanceConfig } from './app/running/data'
export const urls = [
	'/',
	'/run',
	...distanceConfig.map(({ slug }) => `/run/${slug}`),
]

export default {
	ssr: false, // disable runtime server rendering
	prerender: urls,
} satisfies Config
