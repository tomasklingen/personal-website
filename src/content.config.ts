import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'

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
		description: z.string().optional(),
		lastModified: z.date().optional(),
	}),
})

export const collections = {
	thoughts: thoughtsCollection,
}
