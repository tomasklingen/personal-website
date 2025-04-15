import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { sitemapPlugin } from './vite-plugin-sitemap'
import { urls } from './react-router.config'

export default defineConfig({
	plugins: [
		tailwindcss(),
		tsconfigPaths(),
		reactRouter(),
		sitemapPlugin({ hostname: 'https://tomasklingen.nl', urls }),
	],
})
