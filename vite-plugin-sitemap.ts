import type { PluginOption } from 'vite'
import { Readable } from 'node:stream'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { SitemapStream, streamToPromise } from 'sitemap'

type Options = {
	hostname: string
	urls: string[]
}

/**
 * Creates a Vite plugin to generate sitemap.xml after build.
 */
export function sitemapPlugin({ hostname, urls }: Options): PluginOption {
	return {
		name: 'vite-plugin-generate-sitemap',
		apply: 'build',
		async writeBundle(options) {
			if (!options.dir) {
				console.warn(
					'Sitemap Plugin: Output directory (options.dir) not found. Skipping sitemap generation.',
				)
				return
			}
			try {
				await generateSitemapFile(options.dir, hostname, urls)
			} catch (error) {
				console.error('Sitemap Plugin: Failed to generate sitemap.', error)
			}
		},
	}
}

/**
 * Generates the sitemap.xml file in the specified output directory.
 */
async function generateSitemapFile(
	outputDir: string,
	hostname: string,
	urls: string[],
): Promise<void> {
	console.log('Generating sitemap...')
	try {
		// Create a stream to write to
		const stream = new SitemapStream({ hostname })

		// Create a readable stream from the URLs
		const readableStream = Readable.from(urls)

		// Pipe the URL stream to the sitemap stream and collect the XML data
		const sitemapXml = await streamToPromise(
			readableStream.pipe(stream),
		).then((data) => data.toString())

		// Define the output file path
		const outputPath = join(outputDir, 'sitemap.xml')

		// Write the sitemap XML to the file
		await writeFile(outputPath, sitemapXml)

		console.log(`Sitemap generated successfully at: ${outputPath}`)
	} catch (error) {
		console.error('Error generating sitemap:', error)
	}
}
