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
		<section className="my-8">
			<h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
				{title}
			</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full border dark:border-neutral-700 rounded-lg dark:bg-neutral-900 dark:text-white">
					<thead>
						<tr className="dark:bg-neutral-800">
							<th className="px-4 py-2 text-left border-b dark:border-neutral-700">
								Time
							</th>
							<th className="px-4 py-2 text-left border-b dark:border-neutral-700">
								Pace (min/km)
							</th>
							<th className="px-4 py-2 text-left border-b dark:border-neutral-700">
								Pace (min/mile)
							</th>
						</tr>
					</thead>
					<tbody>
						{entries.map((entry, idx) => (
							<tr
								key={entry.time}
								className={
									idx % 2 === 0
										? 'dark:bg-neutral-900'
										: 'dark:bg-neutral-800/60'
								}
							>
								<td className="px-4 py-2 border-b dark:border-neutral-700">
									{entry.time}
								</td>
								<td className="px-4 py-2 border-b dark:border-neutral-700">
									{entry.pacePerKm}
								</td>
								<td className="px-4 py-2 border-b dark:border-neutral-700">
									{entry.pacePerMile}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	)
}
