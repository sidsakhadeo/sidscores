// Type definitions for Kali3 / Kali Teeri scorecard app

export type PlayerId = string; // e.g. 'player-1', 'player-2'

export interface Player {
	id: PlayerId;
	name: string;
	score: number;
}

export interface Round {
	bidderId: PlayerId;
	bid: number;
	partners: PlayerId[]; // includes the bidder
	winners: "partners" | "non-partners";
}

export interface GameState {
	players: Player[];
	rounds: Round[];
	currentRound: number;
}

export interface GameContextValue {
	gameState: GameState | null;
	initGame: (playerNames: string[]) => void;
	addRound: (round: Round) => void;
	resetGame: () => void;
	getSortedPlayers: () => Player[];
}
