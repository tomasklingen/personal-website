import avatar from '../assets/avatar.avif'

export function generatePersonSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Tomas Klingen',
		url: 'https://tomasklingen.nl',
		image: `https://tomasklingen.nl${avatar.src}`,
		jobTitle: 'Front-end Web Developer',
		description:
			'Passionate Front-end Web Developer based in the Netherlands with expertise in React, Angular, TypeScript, and crafting modern, user-centric web applications.',
		sameAs: [
			'https://github.com/tomasklingen',
			'https://linkedin.com/in/tomasklingen',
			'https://bsky.app/profile/tomasklingen.bsky.social',
		],
	}
}

export function generateBlogPostingSchema({
	title,
	url,
	datePublished,
	dateModified,
	description,
}: {
	title: string
	url: string
	datePublished: string
	dateModified?: string
	description?: string
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		url,
		image: `https://tomasklingen.nl${avatar.src}`,
		datePublished,
		...(dateModified && { dateModified }),
		...(description && { description }),
		author: {
			'@type': 'Person',
			url: 'https://tomasklingen.nl',
			name: 'Tomas Klingen',
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url,
		},
	}
}