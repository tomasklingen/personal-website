import { describe, expect, it } from 'vitest'
import { getAllThoughts, getThoughtBySlug } from '../thoughts'

describe('thoughts library', () => {
	describe('getAllThoughts', () => {
		it('should load thoughts from the submodule', async () => {
			const thoughts = await getAllThoughts()

			expect(thoughts).toBeInstanceOf(Array)
			expect(thoughts.length).toBeGreaterThan(0)
		})

		it('should return thoughts with required properties', async () => {
			const thoughts = await getAllThoughts()

			for (const thought of thoughts) {
				expect(thought).toHaveProperty('slug')
				expect(thought).toHaveProperty('year')
				expect(thought).toHaveProperty('title')
				expect(thought).toHaveProperty('content')
				expect(thought).toHaveProperty('compiledContent')
				expect(thought).toHaveProperty('filePath')
				expect(thought).toHaveProperty('dateCreated')

				expect(typeof thought.slug).toBe('string')
				expect(typeof thought.year).toBe('string')
				expect(typeof thought.title).toBe('string')
				expect(typeof thought.content).toBe('string')
				expect(typeof thought.compiledContent).toBe('string')
				expect(typeof thought.filePath).toBe('string')
				expect(thought.dateCreated).toBeInstanceOf(Date)

				// Tags are optional
				if (thought.tags) {
					expect(Array.isArray(thought.tags)).toBe(true)
					for (const tag of thought.tags) {
						expect(typeof tag).toBe('string')
					}
				}
			}
		})

		it('should sort thoughts by date (newest first)', async () => {
			const thoughts = await getAllThoughts()

			if (thoughts.length > 1) {
				for (let i = 0; i < thoughts.length - 1; i++) {
					expect(
						thoughts[i]?.dateCreated.getTime(),
					).toBeGreaterThanOrEqual(
						thoughts[i + 1]?.dateCreated.getTime() ?? 0,
					)
				}
			}
		})
	})

	describe('getThoughtBySlug', () => {
		it('should find existing thought by year and slug', async () => {
			const allThoughts = await getAllThoughts()

			if (allThoughts.length > 0) {
				const firstThought = allThoughts[0]
				if (firstThought) {
					const found = await getThoughtBySlug(
						firstThought.year,
						firstThought.slug,
					)

					expect(found).toBeDefined()
					expect(found?.slug).toBe(firstThought.slug)
					expect(found?.year).toBe(firstThought.year)
				}
			}
		})

		it('should return null for non-existent thought', async () => {
			const found = await getThoughtBySlug('9999', 'non-existent-slug')
			expect(found).toBeNull()
		})
	})
})
