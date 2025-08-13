import { type CollectionEntry, getCollection } from 'astro:content'

export type ThoughtPost = CollectionEntry<'thoughts'>

export type ThoughtPostSummary = {
	slug: string
	year: string
	title: string
	dateCreated: Date
	tags?: string[]
	draft?: boolean
}

/**
 * Extract metadata from a thought post entry
 */
function extractThoughtMetadata(entry: ThoughtPost): {
	slug: string
	year: string
	title: string
	dateCreated: Date
	tags: string[]
	draft: boolean
} {
	// Get date from frontmatter or use fallback
	let dateCreated: Date
	if (entry.data.date) {
		dateCreated = entry.data.date
	} else {
		// Fallback: use January 1, 2025 for thoughts without dates
		dateCreated = new Date('2025-01-01')
	}

	// Extract year from date
	const year = dateCreated.getFullYear().toString()

	// Handle nested slugs (e.g., "markdown/frontmatter-basics" -> "frontmatter-basics")
	const slug = entry.id.includes('/')
		? (entry.id.split('/').pop() ?? entry.id)
		: entry.id

	// Extract title from frontmatter or use slug
	const title = entry.data.title ?? slug.replace(/-/g, ' ')

	// Extract tags from frontmatter
	const tags = entry.data.tags ?? []

	// Extract draft status from frontmatter
	const draft = entry.data.draft ?? false

	return {
		slug,
		year,
		title,
		dateCreated,
		tags,
		draft,
	}
}

/**
 * Get all thought posts
 */
export async function getAllThoughts(): Promise<ThoughtPost[]> {
	const thoughts = await getCollection('thoughts', (entry: ThoughtPost) => {
		// Filter out drafts in production
		if (import.meta.env.PROD) {
			return entry.data.draft !== true
		}
		return true
	})

	// Sort by date created (newest first)
	return thoughts.sort((a: ThoughtPost, b: ThoughtPost) => {
		const aMetadata = extractThoughtMetadata(a)
		const bMetadata = extractThoughtMetadata(b)
		return bMetadata.dateCreated.getTime() - aMetadata.dateCreated.getTime()
	})
}

/**
 * Get all thought summaries (for listing pages)
 */
export async function getAllThoughtsSummary(): Promise<ThoughtPostSummary[]> {
	const thoughts = await getAllThoughts()
	return thoughts.map((thought) => extractThoughtMetadata(thought))
}

/**
 * Get a specific thought by slug and year
 */
export async function getThoughtBySlug(
	year: string,
	slug: string,
): Promise<ThoughtPost | null> {
	const thoughts = await getAllThoughts()
	const thought = thoughts.find((t) => {
		const metadata = extractThoughtMetadata(t)
		return metadata.year === year && metadata.slug === slug
	})

	return thought || null
}

/**
 * Get all unique years from thoughts
 */
export async function getThoughtYears(): Promise<string[]> {
	const summaries = await getAllThoughtsSummary()
	const years = Array.from(new Set(summaries.map((s) => s.year)))
	return years.sort((a, b) => Number(b) - Number(a))
}

/**
 * Get all unique tags from thoughts
 */
export async function getThoughtTags(): Promise<string[]> {
	const summaries = await getAllThoughtsSummary()
	const allTags = summaries.flatMap((s) => s.tags || [])
	return Array.from(new Set(allTags)).sort()
}

/**
 * Get thoughts by tag
 */
export async function getThoughtsByTag(
	tag: string,
): Promise<ThoughtPostSummary[]> {
	const summaries = await getAllThoughtsSummary()
	return summaries.filter((s) => s.tags?.includes(tag))
}
