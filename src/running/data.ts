import {
	type Checkpoint,
	type FinishRange,
	hms,
	KM_PER_MILE,
	MARATHON_KM,
} from '~/running/utils'

export interface SubGoal {
	/** Slug of the distance in distanceConfig. */
	distanceSlug: string
	slug: string
	label: string
	/** The time to stay under, as text. Example: "4 hours". */
	threshold: string
	/** Opening sentences of the intro. The pace sentence follows. */
	goalText: string
	/** The slowest finish time that is still under the threshold. */
	finishSeconds: number
	/** Ordered by distance. The last checkpoint is the finish. */
	checkpoints: readonly Checkpoint[]
	negativeSplit: {
		firstHalfSeconds: number
		description: string
	}
	/** Finish times to list before and after the goal in the table. */
	nearbyRanges: {
		faster: FinishRange
		slower: FinishRange
	}
}

export const subGoals: readonly SubGoal[] = [
	{
		distanceSlug: 'marathon',
		slug: 'sub-4-hour',
		label: 'Sub 4 Hour Marathon',
		threshold: '4 hours',
		goalText:
			'I have not run a marathon yet. My goal for the first one is a finish under 4 hours.',
		finishSeconds: hms(3, 59, 59),
		checkpoints: [
			{ label: '5 km', distance: 5 },
			{ label: '10 km', distance: 10 },
			{ label: '15 km', distance: 15 },
			{ label: '20 km', distance: 20 },
			{ label: 'Half marathon', distance: MARATHON_KM / 2, isMilestone: true },
			{ label: '25 km', distance: 25 },
			{ label: '30 km', distance: 30 },
			{ label: '35 km', distance: 35 },
			{ label: '40 km', distance: 40 },
			{ label: 'Finish', distance: MARATHON_KM, isMilestone: true },
		],
		negativeSplit: {
			firstHalfSeconds: hms(2, 1),
			description:
				'Run the second half about 2 minutes faster than the first half.',
		},
		nearbyRanges: {
			faster: { fastest: hms(3, 30), slowest: hms(3, 55), step: 300 },
			slower: { fastest: hms(4, 5), slowest: hms(4, 30), step: 300 },
		},
	},
	{
		distanceSlug: '5k',
		slug: 'sub-20-minute',
		label: 'Sub 20 Minute 5 km',
		threshold: '20 minutes',
		goalText: 'My goal is to run a 5 km race in under 20 minutes.',
		finishSeconds: hms(0, 19, 59),
		checkpoints: [
			{ label: '1 km', distance: 1 },
			{ label: '2 km', distance: 2 },
			{ label: 'Halfway', distance: 2.5, isMilestone: true },
			{ label: '3 km', distance: 3 },
			{ label: '4 km', distance: 4 },
			{ label: 'Finish', distance: 5, isMilestone: true },
		],
		negativeSplit: {
			firstHalfSeconds: hms(0, 10, 4),
			description:
				'Run the second half about 10 seconds faster than the first half.',
		},
		nearbyRanges: {
			faster: { fastest: hms(0, 18), slowest: hms(0, 19, 30), step: 30 },
			slower: { fastest: hms(0, 20, 30), slowest: hms(0, 22), step: 30 },
		},
	},
]

export const getSubGoalPath = ({ distanceSlug, slug }: SubGoal) =>
	`/run/${distanceSlug}/${slug}`

export const distanceConfig = [
	{
		slug: '1k',
		label: '1 km',
		about:
			'A 1 kilometer race is 1000 meters, or 2.5 laps of a 400 meter track. The finish time is also the pace per kilometer. Divide the pace by 2.5 to get your 400 meter lap time.',
		distance: 1,
		exampleSeconds: hms(0, 4),
		finishRange: { fastest: hms(0, 3), slowest: hms(0, 8), step: 10 },
	},
	{
		slug: '1mile',
		label: '1 Mile',
		about:
			'A mile is 1609 meters, or four laps of a 400 meter track plus 9 meters. Many casual runners finish a mile in 8 to 12 minutes.',
		distance: KM_PER_MILE,
		exampleSeconds: hms(0, 8),
		finishRange: { fastest: hms(0, 4), slowest: hms(0, 12), step: 5 },
	},
	{
		slug: '5k',
		label: '5 km',
		about:
			'A 5 kilometer race is 5000 meters, or 3.1 miles. It is 12.5 laps of a 400 meter track. Many recreational runners finish a 5 kilometer race in 25 to 35 minutes.',
		distance: 5,
		exampleSeconds: hms(0, 25),
		finishRange: { fastest: hms(0, 15), slowest: hms(0, 45), step: 10 },
	},
	{
		slug: '10k',
		label: '10 km',
		about:
			'A 10 kilometer race is 10,000 meters, or 6.2 miles. It is 25 laps of a 400 meter track. Many recreational runners finish a 10 kilometer race in 50 to 70 minutes.',
		distance: 10,
		exampleSeconds: hms(0, 50),
		finishRange: { fastest: hms(0, 30), slowest: hms(1, 30), step: 30 },
	},
	{
		slug: 'half-marathon',
		label: 'Half Marathon',
		about:
			'A half marathon is 21.0975 kilometers, or 13.1 miles. Many recreational runners finish a half marathon in 1:50 to 2:30.',
		distance: 21.0975,
		exampleSeconds: hms(2, 0),
		finishRange: { fastest: hms(1, 10), slowest: hms(3, 0), step: 60 },
	},
	{
		slug: 'marathon',
		label: 'Marathon',
		about:
			'A marathon is 42.195 kilometers, or 26.2 miles. Many recreational runners finish a marathon in 3:30 to 5:00.',
		distance: MARATHON_KM,
		exampleSeconds: hms(4, 0),
		finishRange: { fastest: hms(2, 0), slowest: hms(6, 0), step: 120 },
	},
] as const satisfies {
	slug: string
	label: string
	about: string
	distance: number
	exampleSeconds: number
	finishRange: FinishRange
}[]
