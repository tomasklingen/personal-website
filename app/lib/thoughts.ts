import fs from 'node:fs'
import path from 'node:path'
import { evaluate } from '@mdx-js/mdx'
import matter from 'gray-matter'
import React from 'react'
import * as runtime from 'react/jsx-runtime'
import { renderToString } from 'react-dom/server'
import rehypeHighlight from 'rehype-highlight'

export type ThoughtPost = {
	slug: string
	year: string
	title: string
	content: string
	compiledContent: string
	filePath: string
	dateCreated: Date
	tags?: string[]
}

export type ThoughtPostSummary = {
	slug: string
	year: string
	title: string
	dateCreated: Date
	tags?: string[]
}

const THOUGHTS_DIR = path.join(process.cwd(), 'thoughts')

// In-memory cache for compiled thoughts
let cachedThoughts: ThoughtPost[] | null = null
let cacheTimestamp: number = 0

// Build cache file path
const CACHE_FILE = path.join(process.cwd(), '.cache', 'thoughts.json')

// Development logging helper
const debugLog = (message: string) => {
	if (process.env.NODE_ENV !== 'production') {
		console.log(message)
	}
}

/**
 * Compile MDX content to HTML string
 */
async function compileMDXContent(content: string): Promise<string> {
	try {
		const { default: Component } = await evaluate(content, {
			...runtime,
			development: false,
			rehypePlugins: [rehypeHighlight],
		})

		// Render the React component to HTML string
		return renderToString(React.createElement(Component))
	} catch (error) {
		console.error('MDX compilation error:', error)
		return `<div style="color: red; padding: 1rem; background: #fee;">Error compiling content: ${error instanceof Error ? error.message : 'Unknown error'}</div>`
	}
}

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
 * Get directory modification time for cache invalidation
 */
function getDirectoryMTime(dir: string): number {
	if (!fs.existsSync(dir)) {
		return 0
	}

	let latestMTime = 0

	function checkMTime(currentDir: string) {
		const items = fs.readdirSync(currentDir)

		for (const item of items) {
			const fullPath = path.join(currentDir, item)
			const stat = fs.statSync(fullPath)

			if (stat.isDirectory()) {
				checkMTime(fullPath)
			} else if (item.endsWith('.md') || item.endsWith('.mdx')) {
				latestMTime = Math.max(latestMTime, stat.mtime.getTime())
			}
		}
	}

	checkMTime(dir)
	return latestMTime
}

/**
 * Load cached thoughts from disk
 */
function loadCacheFromDisk(): {
	thoughts: ThoughtPost[]
	timestamp: number
} | null {
	try {
		if (!fs.existsSync(CACHE_FILE)) {
			return null
		}

		const cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'))

		// Convert date strings back to Date objects
		const thoughts = cacheData.thoughts.map(
			(
				thought: Omit<ThoughtPost, 'dateCreated'> & { dateCreated: string },
			) => ({
				...thought,
				dateCreated: new Date(thought.dateCreated),
			}),
		)

		return { thoughts, timestamp: cacheData.timestamp }
	} catch {
		return null
	}
}

/**
 * Save thoughts cache to disk
 */
function saveCacheToDisk(thoughts: ThoughtPost[], timestamp: number) {
	try {
		const cacheDir = path.dirname(CACHE_FILE)
		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true })
		}

		const cacheData = {
			thoughts,
			timestamp,
		}

		fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData))
	} catch (error) {
		console.warn('Failed to save thoughts cache:', error)
	}
}

/**
 * Load all thought posts with caching
 */
export async function getAllThoughts(): Promise<ThoughtPost[]> {
	if (!fs.existsSync(THOUGHTS_DIR)) {
		return []
	}

	const currentMTime = getDirectoryMTime(THOUGHTS_DIR)

	// Check in-memory cache first
	if (cachedThoughts && cacheTimestamp >= currentMTime) {
		debugLog('🚀 Using in-memory cache')
		return cachedThoughts
	}

	// Check disk cache
	const diskCache = loadCacheFromDisk()
	if (diskCache && diskCache.timestamp >= currentMTime) {
		debugLog('💾 Using disk cache')
		cachedThoughts = diskCache.thoughts
		cacheTimestamp = diskCache.timestamp
		return diskCache.thoughts
	}

	debugLog('📚 Compiling thoughts (cache miss or stale)...')
	const startTime = Date.now()

	const markdownFiles = getAllMarkdownFiles(THOUGHTS_DIR)

	const thoughts = await Promise.all(
		markdownFiles.map(async (filePath) => {
			const content = fs.readFileSync(filePath, 'utf-8')
			const metadata = extractMetadata(filePath, content)

			// Extract content without frontmatter for display
			const { content: markdownContent } = matter(content)

			// Compile MDX content to JSX
			const compiledContent = await compileMDXContent(markdownContent)

			return {
				...metadata,
				content: markdownContent,
				compiledContent,
				filePath,
			}
		}),
	)

	// Sort by date created (newest first)
	const sortedThoughts = thoughts.sort(
		(a, b) => b.dateCreated.getTime() - a.dateCreated.getTime(),
	)

	// Update cache
	const timestamp = Date.now()
	cachedThoughts = sortedThoughts
	cacheTimestamp = timestamp

	// Save to disk cache
	saveCacheToDisk(sortedThoughts, timestamp)

	const duration = Date.now() - startTime
	debugLog(`✅ Compiled ${thoughts.length} thoughts in ${duration}ms`)

	return sortedThoughts
}

/**
 * Get all thought summaries (without content and compiledContent for listing pages)
 */
export async function getAllThoughtsSummary(): Promise<ThoughtPostSummary[]> {
	const thoughts = await getAllThoughts()
	return thoughts.map((thought) => ({
		slug: thought.slug,
		year: thought.year,
		title: thought.title,
		dateCreated: thought.dateCreated,
		tags: thought.tags,
	}))
}

/**
 * Get a specific thought by slug and year
 */
export async function getThoughtBySlug(
	year: string,
	slug: string,
): Promise<ThoughtPost | null> {
	const thoughts = await getAllThoughts()
	return (
		thoughts.find(
			(thought) => thought.year === year && thought.slug === slug,
		) || null
	)
}
