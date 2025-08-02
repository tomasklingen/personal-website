import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	integrations: [react(), mdx()],
	output: 'static',
	build: {
		format: 'directory',
	},
	markdown: {
		shikiConfig: {
			theme: 'dark-plus',
			wrap: true,
		},
	},
	vite: {
		plugins: [tailwindcss()],
		ssr: {
			noExternal: ['gray-matter'],
		},
	},
})
