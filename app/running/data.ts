export const distanceConfig = [
	{
		slug: '1k',
		title: '1000m - 1k',
		shortLabel: '1k',
		distance: 1,
		paceConfig: { startSeconds: 210, increment: 10, count: 16 }, // 3:30 to 6:00
	},
	{
		slug: '1mile',
		title: '1 Mile',
		shortLabel: '1 mile',
		distance: 1.60934,
		paceConfig: { startSeconds: 338, increment: 16, count: 16 }, // 5:38 to 9:39
	},
	{
		slug: '5k',
		title: '5000m - 5k',
		shortLabel: '5k',
		distance: 5,
		paceConfig: { startSeconds: 1050, increment: 10, count: 50 }, // 17:30 to 30:00
	},
	{
		slug: '10k',
		title: '10.000m - 10k',
		shortLabel: '10k',
		distance: 10,
		paceConfig: { startSeconds: 2100, increment: 15, count: 60 }, // 35:00 to 60:00
	},
	{
		slug: 'half-marathon',
		title: 'Half Marathon',
		shortLabel: 'Half Marathon',
		distance: 21.0975,
		paceConfig: { startSeconds: 4440, increment: 60, count: 50 }, // 1:14:00 to 2:04:00
	},
	{
		slug: 'marathon',
		title: 'Marathon - 42.195K',
		shortLabel: 'Marathon',
		distance: 42.195,
		paceConfig: { startSeconds: 8880, increment: 300, count: 22 }, // 2:28:00 to 4:13:00
	},
] as const satisfies {
	title: string
	slug: string
	shortLabel: string
	distance: number
	paceConfig: {
		startSeconds: number
		increment: number
		count: number
	}
}[]

export type Slug = (typeof distanceConfig)[number]['slug']
