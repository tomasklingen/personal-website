export const generatePaceEntries = (
	startTime: number,
	increment: number,
	count: number,
	distance: number,
) => {
	return Array.from({ length: count }, (_, i) => {
		const totalSeconds = startTime + i * increment
		const pacePerKmSeconds = totalSeconds / distance
		const pacePerMileSeconds = pacePerKmSeconds * 1.60934

		return {
			time: formatTime(totalSeconds),
			pacePerKm: formatTime(pacePerKmSeconds),
			pacePerMile: formatTime(pacePerMileSeconds),
		}
	})
}

export const formatTime = (totalSeconds: number) => {
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = Math.floor(totalSeconds % 60)

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
	}
	return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
