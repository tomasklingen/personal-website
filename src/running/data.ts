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
		paceConfig: { startSeconds: 270, increment: 5, count: 50 },
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
		paceConfig: { startSeconds: 1740, increment: 15, count: 100 },
	},
	{
		slug: 'half-marathon',
		title: 'Half Marathon',
		shortLabel: 'Half Marathon',
		distance: 21.0975,
		paceConfig: { startSeconds: 4440, increment: 60, count: 60 },
	},
	{
		slug: 'marathon',
		title: 'Marathon - 42.195K',
		shortLabel: 'Marathon',
		distance: 42.195,
		paceConfig: { startSeconds: 7200, increment: 120, count: 100 },
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
