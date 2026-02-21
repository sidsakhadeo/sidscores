import { describe, expect, it } from "bun:test";
import { createPlayers } from "../lib/scoring";

describe("createPlayers", () => {
	it("creates Player[] from an array of names with correct IDs", () => {
		const players = createPlayers(["Alice", "Bob", "Carol"]);
		expect(players).toEqual([
			{ id: "player-1", name: "Alice", score: 0 },
			{ id: "player-2", name: "Bob", score: 0 },
			{ id: "player-3", name: "Carol", score: 0 },
		]);
	});

	it("assigns sequential IDs starting from player-1", () => {
		const players = createPlayers(["X", "Y"]);
		expect(players[0].id).toBe("player-1");
		expect(players[1].id).toBe("player-2");
	});

	it("returns an empty array for empty input", () => {
		expect(createPlayers([])).toEqual([]);
	});
});

describe("getSortedPlayers (logic)", () => {
	it("sorts players by score descending", () => {
		const players = [
			{ id: "player-1", name: "Alice", score: 100 },
			{ id: "player-2", name: "Bob", score: 300 },
			{ id: "player-3", name: "Carol", score: 200 },
		];
		const sorted = [...players].sort((a, b) => b.score - a.score);
		expect(sorted[0].name).toBe("Bob");
		expect(sorted[1].name).toBe("Carol");
		expect(sorted[2].name).toBe("Alice");
	});

	it("keeps all players when scores are equal", () => {
		const players = [
			{ id: "player-1", name: "Alice", score: 100 },
			{ id: "player-2", name: "Bob", score: 100 },
		];
		const sorted = [...players].sort((a, b) => b.score - a.score);
		expect(sorted).toHaveLength(2);
		expect(sorted[0].score).toBe(100);
		expect(sorted[1].score).toBe(100);
	});
});
