export const SITE_TIME_ZONE = 'Europe/Amsterdam'
export const SITE_LOCALE = 'en-US'

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

	return date.toLocaleDateString(SITE_LOCALE, options)
}

interface DateTimeZoneOptions {
	locale?: string
	timeZone?: string
}

/**
 * Formats in the given locale and IANA time zone. Each option falls back to
 * the runtime default when omitted.
 */
export function formatDateTime(
	date: Date,
	{ locale, timeZone }: DateTimeZoneOptions = {},
): string {
	return date.toLocaleString(locale, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZone,
	})
}
