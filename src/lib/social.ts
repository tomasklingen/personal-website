import { BlueskyIcon, GithubIcon, LinkedinIcon } from '~/components/SocialIcons'

export const socialLinks = [
	{
		href: 'https://bsky.app/profile/tomasklingen.nl',
		title: 'Bluesky',
		IconComponent: BlueskyIcon,
		'aria-label': 'Visit Tomas Klingen on Bluesky',
	},
	{
		href: 'https://www.linkedin.com/in/tomasklingen',
		title: 'LinkedIn',
		IconComponent: LinkedinIcon,
		'aria-label': 'Visit Tomas Klingen on LinkedIn',
	},
	{
		href: 'https://github.com/tomasklingen',
		title: 'GitHub',
		IconComponent: GithubIcon,
		'aria-label': 'Visit Tomas Klingen on GitHub',
	},
] as const

export type SocialLink = (typeof socialLinks)[number]
