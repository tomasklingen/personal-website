import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type ThoughtPost = {
	slug: string
	year: string
	title: string
	content: string
	filePath: string
	dateCreated: Date
	tags?: string[]
}

const THOUGHTS_DIR = path.join(process.cwd(), 'thoughts')

/**
 * Get all markdown and MDX files from the thoughts directory
 */
function getAllMarkdownFiles(dir: string): string[] {
	const files: string[] = []

	function walkDir(currentDir: string) {
		const items = fs.readdirSync(currentDir)

		for (const item of items) {
			const fullPath = path.join(currentDir, item)
			const stat = fs.statSync(fullPath)

			if (stat.isDirectory()) {
				walkDir(fullPath)
			} else if (
				(item.endsWith('.md') || item.endsWith('.mdx')) &&
				item !== 'README.md'
			) {
				files.push(fullPath)
			}
		}
	}

	walkDir(dir)
	return files
}

/**
 * Extract metadata from markdown file
 */
function extractMetadata(
	filePath: string,
	content: string,
): Pick<ThoughtPost, 'slug' | 'year' | 'title' | 'dateCreated' | 'tags'> {
	// Parse frontmatter
	const { data: frontmatter, content: markdownContent } = matter(content)

	// Get date from frontmatter or file stats
	let dateCreated: Date
	if (frontmatter.date instanceof Date) {
		dateCreated = frontmatter.date
	} else {
		// Fallback to file creation date
		const stats = fs.statSync(filePath)
		dateCreated = stats.birthtime
	}

	// Extract year from date
	const year = dateCreated.getFullYear().toString()

	// Generate slug from filename or directory structure
	const relativePath = path.relative(THOUGHTS_DIR, filePath)
	const slug = path.basename(relativePath, path.extname(relativePath))

	// Extract title from frontmatter, first # heading, or use filename
	const titleMatch = markdownContent.match(/^#\s+(.+)$/m)
	const title = frontmatter.title ?? titleMatch?.[1] ?? slug.replace(/-/g, ' ')

	// Extract tags from frontmatter
	const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : undefined

	return {
		slug,
		year,
		title,
		dateCreated,
		tags,
	}
}

/**
 * Load all thought posts
 */
export function getAllThoughts(): ThoughtPost[] {
	if (!fs.existsSync(THOUGHTS_DIR)) {
		return []
	}

	const markdownFiles = getAllMarkdownFiles(THOUGHTS_DIR)

	const thoughts = markdownFiles.map((filePath) => {
		const content = fs.readFileSync(filePath, 'utf-8')
		const metadata = extractMetadata(filePath, content)

		// Extract content without frontmatter for display
		const { content: markdownContent } = matter(content)

		return {
			...metadata,
			content: markdownContent,
			filePath,
		}
	})

	// Sort by date created (newest first)
	return thoughts.sort(
		(a, b) => b.dateCreated.getTime() - a.dateCreated.getTime(),
	)
}

/**
 * Get a specific thought by slug and year
 */
export function getThoughtBySlug(
	year: string,
	slug: string,
): ThoughtPost | null {
	const thoughts = getAllThoughts()
	return (
		thoughts.find(
			(thought) => thought.year === year && thought.slug === slug,
		) || null
	)
}

/**
 * Get recent thoughts (for homepage)
 */
export function getRecentThoughts(limit = 5): ThoughtPost[] {
	const thoughts = getAllThoughts()
	return thoughts.slice(0, limit)
}
