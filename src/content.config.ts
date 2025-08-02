import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const thoughtsCollection = defineCollection({
	loader: glob({
		pattern: ['**/*.md', '!README.md'],
		base: './thoughts',
	}),
	schema: z.object({
		title: z.string().optional(),
		date: z.date().optional(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional().default(false),
	}),
})

export const collections = {
	thoughts: thoughtsCollection,
}
