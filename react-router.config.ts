import type { Config } from '@react-router/dev/config'
import { links } from './app/running/data'

export default {
	ssr: false, // disable runtime server rendering
	prerender: ['/', ...links.map((link) => `/run/${link.to}`)],
} satisfies Config
