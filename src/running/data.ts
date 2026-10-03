import { type FinishRange, hms, KM_PER_MILE } from '~/running/utils'

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
		distance: 42.195,
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
