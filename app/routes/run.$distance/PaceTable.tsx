type PaceEntry = {
	time: string
	pacePerKm: string
	pacePerMile: string
}

type PaceTableProps = {
	title: string
	entries: PaceEntry[]
	className?: string
}

export const PaceTable: React.FC<PaceTableProps> = ({ title, entries }) => {
	return (
		<section>
			<h2>{title}</h2>
			<table>
				<thead>
					<tr>
						<th>Time</th>
						<th>Pace (min/km)</th>
						<th>Pace (min/mile)</th>
					</tr>
				</thead>
				<tbody>
					{entries.map((entry) => (
						<tr key={entry.time}>
							<td>{entry.time}</td>
							<td>{entry.pacePerKm}</td>
							<td>{entry.pacePerMile}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	)
}
