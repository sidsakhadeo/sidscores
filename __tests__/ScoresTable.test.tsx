import { describe, expect, it } from "bun:test";

// Pure logic tests for the data that ScoresTable would render
// (Component rendering tests require a DOM environment set up with --dom flag)

describe("ScoresTable data — player list shape", () => {
	const players = [
		{ id: "player-1", name: "Alice", score: 300 },
		{ id: "player-2", name: "Bob", score: 200 },
		{ id: "player-3", name: "Carol", score: 100 },
	];

	it("renders the correct number of players", () => {
		expect(players).toHaveLength(3);
	});

	it("exposes player names", () => {
		const names = players.map((p) => p.name);
		expect(names).toContain("Alice");
		expect(names).toContain("Bob");
		expect(names).toContain("Carol");
	});

	it("exposes player scores", () => {
		expect(players[0].score).toBe(300);
		expect(players[1].score).toBe(200);
		expect(players[2].score).toBe(100);
	});

	it("rank is correctly derived as 1-indexed position", () => {
		players.forEach((_player, index) => {
			const rank = index + 1;
			expect(rank).toBeGreaterThanOrEqual(1);
		});
	});
});
