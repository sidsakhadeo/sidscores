"use client";

import { createContext, useContext, useState } from "react";
import { calculateScores, createPlayers } from "@/lib/scoring";
import type { GameContextValue, GameState, Player, Round } from "@/types/game";

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
	const [gameState, setGameState] = useState<GameState | null>(null);

	function initGame(playerNames: string[]) {
		const players: Player[] = createPlayers(playerNames);
		setGameState({ players, rounds: [], currentRound: 1 });
	}

	function addRound(round: Round) {
		setGameState((prev) => {
			if (!prev) return prev;
			const updatedPlayers = calculateScores(prev, round);
			return {
				...prev,
				players: updatedPlayers,
				rounds: [...prev.rounds, round],
				currentRound: prev.currentRound + 1,
			};
		});
	}

	function resetGame() {
		setGameState(null);
	}

	function getSortedPlayers(): Player[] {
		if (!gameState) return [];
		return [...gameState.players].sort((a, b) => b.score - a.score);
	}

	return (
		<GameContext.Provider
			value={{ gameState, initGame, addRound, resetGame, getSortedPlayers }}
		>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const ctx = useContext(GameContext);
	if (!ctx) throw new Error("useGame must be used within GameProvider");
	return ctx;
}
