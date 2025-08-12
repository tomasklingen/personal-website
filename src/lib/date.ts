export function formatDate(
	date: Date,
	format: 'full' | 'short' = 'full',
): string {
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: format === 'short' ? 'short' : 'long',
		day: 'numeric',
		timeZone: 'Europe/Amsterdam',
	}

	return date.toLocaleDateString('en-US', options)
}
