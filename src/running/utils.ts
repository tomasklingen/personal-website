export const KM_PER_MILE = 1.609344
export const MARATHON_KM = 42.195

export interface FinishRange {
	fastest: number
	slowest: number
	step: number
}

export interface PaceEntry {
	time: string
	pacePerKm: string
	pacePerMile: string
}

export interface Checkpoint {
	label: string
	distance: number
	isMilestone?: boolean
}

export interface Split {
	label: string
	kilometers: string
	miles: string
	elapsed: string
	isMilestone: boolean
}

export const hms = (hours: number, minutes: number, seconds = 0) =>
	hours * 3600 + minutes * 60 + seconds

export const formatTime = (totalSeconds: number) => {
	// Round before splitting, so 59.6s carries into the next minute.
	const rounded = Math.round(totalSeconds)
	const hours = Math.floor(rounded / 3600)
	const minutes = Math.floor((rounded % 3600) / 60)
	const seconds = rounded % 60

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
	}
	return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export const getPaceEntry = (
	totalSeconds: number,
	distance: number,
): PaceEntry => {
	const pacePerKmSeconds = totalSeconds / distance

	return {
		time: formatTime(totalSeconds),
		pacePerKm: formatTime(pacePerKmSeconds),
		pacePerMile: formatTime(pacePerKmSeconds * KM_PER_MILE),
	}
}

/**
 * Like getPaceEntry, but rounds paces down to the second. Holding the pace
 * for the full distance then finishes at or under the given time.
 */
export const getGoalPaceEntry = (
	totalSeconds: number,
	distance: number,
): PaceEntry => {
	const pacePerKmSeconds = totalSeconds / distance

	return {
		time: formatTime(totalSeconds),
		pacePerKm: formatTime(Math.floor(pacePerKmSeconds)),
		pacePerMile: formatTime(Math.floor(pacePerKmSeconds * KM_PER_MILE)),
	}
}

const formatDistance = new Intl.NumberFormat('en', {
	maximumFractionDigits: 1,
}).format

/**
 * Elapsed time at each checkpoint when holding a constant pace in seconds per
 * km. Times round down to the second, so a runner who is on time at every
 * checkpoint is not late for the finish.
 */
export const generateSplits = (
	checkpoints: readonly Checkpoint[],
	paceSeconds: number,
): Split[] =>
	checkpoints.map(({ label, distance, isMilestone = false }) => ({
		label,
		kilometers: formatDistance(distance),
		miles: formatDistance(distance / KM_PER_MILE),
		elapsed: formatTime(Math.floor(distance * paceSeconds)),
		isMilestone,
	}))

export const generatePaceEntries = (
	{ fastest, slowest, step }: FinishRange,
	distance: number,
) => {
	const count = Math.floor((slowest - fastest) / step) + 1

	return Array.from({ length: count }, (_, i) =>
		getPaceEntry(fastest + i * step, distance),
	)
}
