import type { GameState, Player, Round } from "@/types/game";

/**
 * Calculate updated player scores after a round.
 *
 * Scoring rules:
 *  - Partners win: bidder gets 2 × bid, other partners get bid, non-partners get 0
 *  - Non-partners win: non-partners get bid, partners get 0
 */
export function calculateScores(state: GameState, round: Round): Player[] {
	return state.players.map((player) => {
		let scoreIncrease = 0;
		const isPartner = round.partners.includes(player.id);
		const isBidder = player.id === round.bidderId;

		if (round.winners === "partners") {
			if (isBidder) {
				scoreIncrease = 2 * round.bid; // bidder gets double
			} else if (isPartner) {
				scoreIncrease = round.bid; // partner gets bid amount
			}
			// non-partners get 0
		} else {
			// non-partners won
			if (!isPartner) {
				scoreIncrease = round.bid; // non-partner gets bid amount
			}
			// partners get 0
		}

		return { ...player, score: player.score + scoreIncrease };
	});
}

/**
 * Create a Player array from an array of player name strings.
 * IDs are assigned as 'player-1', 'player-2', etc.
 */
export function createPlayers(playerNames: string[]): Player[] {
	return playerNames.map((name, i) => ({
		id: `player-${i + 1}`,
		name,
		score: 0,
	}));
}
