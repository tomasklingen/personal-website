import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	site: 'https://tomasklingen.nl',
	integrations: [
		react(),
		sitemap({
			filter: (page) => page !== 'https://tomasklingen.nl/run/',
		}),
	],
	output: 'static',
	build: {
		assets: 'assets',
		format: 'directory',
	},
	markdown: {
		shikiConfig: {
			themes: {
				dark: 'github-dark',
				light: 'github-light',
			},
			theme: 'github-dark-default',

			wrap: true,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
})
