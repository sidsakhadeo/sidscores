"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";
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
		<main className="min-h-screen bg-white px-4 py-10">
			<div className="w-full max-w-md mx-auto">
				<Header title="Results" />

				{/* Winner callout */}
				<div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 text-center">
					<p className="text-sm text-blue-600 font-medium mb-1">🏆 Winner</p>
					<p className="text-2xl font-bold text-blue-800">{winner.name}</p>
					<p className="text-blue-600 font-semibold">{winner.score} points</p>
				</div>

				{/* Final scores table */}
				<div className="mb-8">
					<h2 className="text-lg font-semibold text-gray-700 mb-3">
						Final Standings
					</h2>
					<ScoresTable players={sortedPlayers} />
				</div>

				{/* Round summary */}
				<div className="mb-8 text-center text-sm text-gray-500">
					{gameState.rounds.length} round
					{gameState.rounds.length !== 1 ? "s" : ""} played
				</div>

				{/* Play Again */}
				<button
					type="button"
					onClick={handlePlayAgain}
					className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-lg rounded-xl px-6 py-4 transition-colors"
				>
					Play Again
				</button>
			</div>
		</main>
	);
}
