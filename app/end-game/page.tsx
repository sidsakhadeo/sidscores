"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ScoresTable from "@/components/ScoresTable";
import { useGame } from "@/context/GameContext";

export default function EndGamePage() {
	const router = useRouter();
	const { gameState, resetGame, getSortedPlayers } = useGame();

	// Guard: redirect if no game or no rounds played
	useEffect(() => {
		if (!gameState || gameState.rounds.length === 0) {
			router.replace("/");
		}
	}, [gameState, router]);

	if (!gameState || gameState.rounds.length === 0) {
		return null;
	}

	const sortedPlayers = getSortedPlayers();
	const winner = sortedPlayers[0];

	function handlePlayAgain() {
		resetGame();
		router.push("/setup-game");
	}

	return (
		<main className="min-h-screen bg-emerald-950 px-4 py-10">
			<div className="w-full max-w-md mx-auto">
				{/* Page label */}
				<p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest text-center mb-8">
					Game Over
				</p>

				{/* Winner hero card */}
				<div className="bg-white rounded-3xl p-6 mb-4 text-center shadow-xl shadow-emerald-950/50">
					<span className="text-5xl mb-3 block" aria-hidden="true">
						🏆
					</span>
					<p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">
						Winner
					</p>
					<p className="text-4xl font-extrabold text-stone-900 mb-1">
						{winner.name}
					</p>
					<p className="text-2xl font-bold text-amber-500">
						{winner.score} pts
					</p>
				</div>

				{/* Final standings */}
				<div className="bg-white rounded-3xl p-4 mb-5 shadow-xl shadow-emerald-950/50">
					<h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 px-1">
						Final Standings
					</h2>
					<ScoresTable players={sortedPlayers} />
				</div>

				{/* Round count */}
				<p className="text-center text-emerald-600 text-sm font-medium mb-6">
					{gameState.rounds.length} round
					{gameState.rounds.length !== 1 ? "s" : ""} played
				</p>

				{/* Play Again */}
				<button
					type="button"
					onClick={handlePlayAgain}
					className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-extrabold text-lg rounded-2xl px-6 py-4 transition-colors shadow-lg shadow-emerald-950/40"
				>
					Play Again →
				</button>
			</div>
		</main>
	);
}
