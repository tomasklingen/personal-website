import { type Distance, distanceConfig } from '~/running/data'
import { generatePaceEntries } from '../../running/utils'
import type { Route } from './+types/route'
import { PaceTable } from './PaceTable'

export function meta({ data }: Route.MetaArgs) {
	return [
		{ title: `${data.title} Running Pace Calculation Table | Tomas Klingen` },
		{
			name: 'description',
			content: `Calculate your ideal running pace for the ${data.title} distance. Find your perfect pace per kilometer and mile for ${data.title} races and training.`,
		},
		{
			name: 'keywords',
			content: `running pace, ${data.title} pace, running calculator, pace per km, pace per mile, race pace`,
		},
	]
}

export function loader({ params }: Route.LoaderArgs) {
	const config = distanceConfig[params.distance as Distance]

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

export function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
	return serverLoader()
}

export default function RunDistance(props: Route.ComponentProps) {
	const { title, entries } = props.loaderData

	return <PaceTable title={`${title} Running Paces`} entries={entries} />
}
