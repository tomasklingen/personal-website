import fs from 'node:fs'
import path from 'node:path'

export type ThoughtPost = {
	slug: string
	year: string
	title: string
	content: string
	filePath: string
	dateCreated: Date
}

const THOUGHTS_DIR = path.join(process.cwd(), 'app/thoughts')

/**
 * Get all markdown files from the thoughts directory
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
			} else if (item.endsWith('.md')) {
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
): Pick<ThoughtPost, 'slug' | 'year' | 'title' | 'dateCreated'> {
	// Get file stats for creation date
	const stats = fs.statSync(filePath)
	const dateCreated = stats.birthtime

	// Extract year from date
	const year = dateCreated.getFullYear().toString()

	// Generate slug from filename or directory structure
	const relativePath = path.relative(THOUGHTS_DIR, filePath)
	const slug = path.basename(relativePath, '.md')

	// Extract title from first # heading or use filename
	const titleMatch = content.match(/^#\s+(.+)$/m)
	const title = titleMatch?.[1] ?? slug.replace(/-/g, ' ')

	return {
		slug,
		year,
		title,
		dateCreated,
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

		return {
			...metadata,
			content,
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
