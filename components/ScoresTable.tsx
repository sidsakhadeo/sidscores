import type { Player } from "@/types/game";

interface ScoresTableProps {
	players: Player[]; // expected to be pre-sorted
}

export default function ScoresTable({ players }: ScoresTableProps) {
	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full border-collapse text-sm">
				<thead>
					<tr className="bg-gray-100 text-gray-700">
						<th className="px-4 py-3 text-left font-semibold border border-gray-200 w-12">
							#
						</th>
						<th className="px-4 py-3 text-left font-semibold border border-gray-200">
							Player
						</th>
						<th className="px-4 py-3 text-right font-semibold border border-gray-200 w-24">
							Score
						</th>
					</tr>
				</thead>
				<tbody>
					{players.map((player, index) => (
						<tr
							key={player.id}
							className="even:bg-gray-50 hover:bg-blue-50 transition-colors"
						>
							<td className="px-4 py-3 border border-gray-200 text-gray-500 font-medium">
								{index + 1}
							</td>
							<td className="px-4 py-3 border border-gray-200 font-medium text-gray-900">
								{player.name}
							</td>
							<td className="px-4 py-3 border border-gray-200 text-right font-semibold text-blue-600">
								{player.score}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
