import { describe, expect, it } from 'vitest'
import {
	getAllThoughts,
	getRecentThoughts,
	getThoughtBySlug,
} from '../thoughts'

describe('thoughts library', () => {
	describe('getAllThoughts', () => {
		it('should load thoughts from the submodule', () => {
			const thoughts = getAllThoughts()

			expect(thoughts).toBeInstanceOf(Array)
			expect(thoughts.length).toBeGreaterThan(0)
		})

		it('should return thoughts with required properties', () => {
			const thoughts = getAllThoughts()

			for (const thought of thoughts) {
				expect(thought).toHaveProperty('slug')
				expect(thought).toHaveProperty('year')
				expect(thought).toHaveProperty('title')
				expect(thought).toHaveProperty('content')
				expect(thought).toHaveProperty('filePath')
				expect(thought).toHaveProperty('dateCreated')

				expect(typeof thought.slug).toBe('string')
				expect(typeof thought.year).toBe('string')
				expect(typeof thought.title).toBe('string')
				expect(typeof thought.content).toBe('string')
				expect(typeof thought.filePath).toBe('string')
				expect(thought.dateCreated).toBeInstanceOf(Date)
			}
		})

		it('should sort thoughts by date (newest first)', () => {
			const thoughts = getAllThoughts()

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
		it('should find existing thought by year and slug', () => {
			const allThoughts = getAllThoughts()

			if (allThoughts.length > 0) {
				const firstThought = allThoughts[0]
				if (firstThought) {
					const found = getThoughtBySlug(
						firstThought.year,
						firstThought.slug,
					)

					expect(found).toBeDefined()
					expect(found?.slug).toBe(firstThought.slug)
					expect(found?.year).toBe(firstThought.year)
				}
			}
		})

		it('should return null for non-existent thought', () => {
			const found = getThoughtBySlug('9999', 'non-existent-slug')
			expect(found).toBeNull()
		})
	})

	describe('getRecentThoughts', () => {
		it('should return limited number of thoughts', () => {
			const recent = getRecentThoughts(3)

			expect(recent).toBeInstanceOf(Array)
			expect(recent.length).toBeLessThanOrEqual(3)
		})

		it('should return most recent thoughts first', () => {
			const allThoughts = getAllThoughts()
			const recent = getRecentThoughts(2)

			if (allThoughts.length >= 2 && recent.length >= 2) {
				expect(recent[0]?.slug).toBe(allThoughts[0]?.slug)
				expect(recent[1]?.slug).toBe(allThoughts[1]?.slug)
			}
		})

		it('should use default limit of 5', () => {
			const recent = getRecentThoughts()
			const allThoughts = getAllThoughts()

			const expectedLength = Math.min(5, allThoughts.length)
			expect(recent.length).toBe(expectedLength)
		})
	})
})
