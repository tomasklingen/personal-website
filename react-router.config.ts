import type { Config } from '@react-router/dev/config'
import { links } from './app/running/data'

export const urls = ['/', '/run', ...links.map((link) => `/run/${link.to}`)]

export default {
	ssr: false, // disable runtime server rendering
	prerender: urls,
} satisfies Config
