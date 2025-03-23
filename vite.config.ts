import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: 'index.html',
				run: 'run/index.html',
			},
		},
	},
	plugins: [tailwindcss()],
})
