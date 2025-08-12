import { BlueskyIcon, GithubIcon, LinkedinIcon } from '~/components/SocialIcons'

export const socialLinks = {
	bluesky: {
		href: 'https://bsky.app/profile/tomasklingen.nl',
		title: 'Bluesky',
		IconComponent: BlueskyIcon,
		'aria-label': 'Visit Tomas Klingen on Bluesky',
		brandColor: {
			logo: '#1A8CD8',
			background: '#F0F4F8',
		},
	},
	linkedin: {
		href: 'https://www.linkedin.com/in/tomasklingen',
		title: 'LinkedIn',
		IconComponent: LinkedinIcon,
		'aria-label': 'Visit Tomas Klingen on LinkedIn',
		brandColor: {
			logo: '#0077B5',
			background: '#E8F1F5',
		},
	},
	github: {
		href: 'https://github.com/tomasklingen',
		title: 'GitHub',
		IconComponent: GithubIcon,
		'aria-label': 'Visit Tomas Klingen on GitHub',
		brandColor: {
			logo: '#181717',
			background: '#F0F4F8',
		},
	},
} as const

export type SocialLink = (typeof socialLinks)[keyof typeof socialLinks]
