import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	output: 'static',
	build: {
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
