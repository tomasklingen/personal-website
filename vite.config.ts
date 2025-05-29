import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { HOST } from './app/const'
import { urls } from './react-router.config'
import { sitemapPlugin } from './vite-plugin-sitemap'

export default defineConfig(() => {
	return {
		plugins: [
			tailwindcss(),
			tsconfigPaths(),
			reactRouter(),
			sitemapPlugin({ hostname: HOST, urls }),
		],
	}
})
