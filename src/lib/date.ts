export const SITE_TIME_ZONE = 'Europe/Amsterdam'

export function formatDate(
	date: Date,
	format: 'full' | 'short' = 'full',
): string {
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: format === 'short' ? 'short' : 'long',
		day: 'numeric',
		timeZone: SITE_TIME_ZONE,
	}

	return date.toLocaleDateString('en-US', options)
}

/** Formats in the given IANA time zone, or in the runtime's local zone when omitted. */
export function formatDateTime(date: Date, timeZone?: string): string {
	return date.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZone,
	})
}
