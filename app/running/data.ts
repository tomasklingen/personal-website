export type Distance = '1k' | '1mile' | '5k' | '10k' | 'half' | 'full'

export const links = [
	{ to: '1k', label: '1K' },
	{ to: '1mile', label: '1 Mile' },
	{ to: '5k', label: '5K' },
	{ to: '10k', label: '10K' },
	{ to: 'half', label: 'Half Marathon' },
	{ to: 'full', label: 'Marathon' },
] as const satisfies { to: Distance; label: string }[]

export const distanceConfig = {
	'1k': {
		title: '1K',
		distance: 1,
		paceConfig: { startSeconds: 210, increment: 10, count: 16 }, // 3:30 to 6:00
	},
	'1mile': {
		title: '1 Mile',
		distance: 1.60934,
		paceConfig: { startSeconds: 338, increment: 16, count: 16 }, // 5:38 to 9:39
	},
	'5k': {
		title: '5K',
		distance: 5,
		paceConfig: { startSeconds: 1050, increment: 10, count: 50 }, // 17:30 to 30:00
	},
	'10k': {
		title: '10K',
		distance: 10,
		paceConfig: { startSeconds: 2100, increment: 15, count: 60 }, // 35:00 to 60:00
	},
	half: {
		title: 'Half Marathon',
		distance: 21.0975,
		paceConfig: { startSeconds: 4440, increment: 60, count: 50 }, // 1:14:00 to 2:04:00
	},
	full: {
		title: 'Full Marathon',
		distance: 42.195,
		paceConfig: { startSeconds: 8880, increment: 300, count: 22 }, // 2:28:00 to 4:13:00
	},
} as const satisfies Record<
	Distance,
	{
		title: string
		distance: number
		paceConfig: {
			startSeconds: number
			increment: number
			count: number
		}
	}
>
