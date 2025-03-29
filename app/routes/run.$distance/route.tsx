import { type Distance, distanceConfig } from '~/running/data'
import { generatePaceEntries } from '../../running/utils'
import type { Route } from './+types/route'
import { PaceTable } from './PaceTable'

export async function clientLoader(loaderArgs: Route.ClientLoaderArgs) {
	const config = distanceConfig[loaderArgs.params.distance as Distance]

	if (!config) {
		throw new Response('Not Found', { status: 404 })
	}

	const { startSeconds, increment, count } = config.paceConfig
	const entries = generatePaceEntries(
		startSeconds,
		increment,
		count,
		config.distance,
	)

	return { ...config, entries }
}

export default function RunDistance(props: Route.ComponentProps) {
	if (!props.loaderData) {
		return null
	}

	const { title, entries } = props.loaderData

	return <PaceTable title={`${title} Pace Table`} entries={entries} />
}
