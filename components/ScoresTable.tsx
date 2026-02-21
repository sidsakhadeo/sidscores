import type { Player } from "@/types/game";

interface ScoresTableProps {
  players: Player[]; // expected to be pre-sorted
}

export default function ScoresTable({ players }: ScoresTableProps) {
  return (
    <div className="space-y-2">
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${
            index === 0
              ? "bg-amber-50 border-amber-200"
              : "bg-stone-50 border-stone-100"
          }`}
        >
          {/* Rank badge */}
          <span
            className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${
              index === 0
                ? "bg-amber-400 text-amber-900"
                : "bg-stone-200 text-stone-600"
            }`}
          >
            {index + 1}
          </span>

          {/* Name */}
          <span className="flex-1 font-semibold text-stone-900 text-sm">
            {player.name}
          </span>

          {/* Score */}
          <span
            className={`font-extrabold text-lg tabular-nums ${
              index === 0 ? "text-amber-600" : "text-stone-700"
            }`}
          >
            {player.score}
          </span>
        </div>
      ))}
    </div>
  );
}
