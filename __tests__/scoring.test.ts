import { describe, expect, it } from "bun:test";
import { calculateScores, createPlayers } from "../lib/scoring";
import type { GameState, Round } from "../types/game";

function makeState(names: string[]): GameState {
  return {
    players: createPlayers(names),
    rounds: [],
    currentRound: 1,
  };
}

describe("createPlayers", () => {
  it("all players start with score 0", () => {
    const players = createPlayers(["Alice", "Bob", "Carol", "Dave"]);
    expect(players.every((p) => p.score === 0)).toBe(true);
  });
});

describe("calculateScores — partners win", () => {
  it("bidder gets double bid, non-partners get 0", () => {
    const state = makeState(["Alice", "Bob", "Carol"]);
    const round: Round = {
      bidderId: "player-1",
      bid: 100,
      partners: ["player-1"],
      winners: "partners",
    };
    const result = calculateScores(state, round);
    expect(result.find((p) => p.id === "player-1")?.score).toBe(200);
    expect(result.find((p) => p.id === "player-2")?.score).toBe(0);
    expect(result.find((p) => p.id === "player-3")?.score).toBe(0);
  });

  it("bidder gets double, other partners get bid amount, non-partners get 0", () => {
    const state = makeState(["Alice", "Bob", "Carol", "Dave"]);
    const round: Round = {
      bidderId: "player-1",
      bid: 160,
      partners: ["player-1", "player-2"],
      winners: "partners",
    };
    const result = calculateScores(state, round);
    expect(result.find((p) => p.id === "player-1")?.score).toBe(320);
    expect(result.find((p) => p.id === "player-2")?.score).toBe(160);
    expect(result.find((p) => p.id === "player-3")?.score).toBe(0);
    expect(result.find((p) => p.id === "player-4")?.score).toBe(0);
  });

  it("multiple partners all get bid amount (except bidder who gets double)", () => {
    const state = makeState(["Alice", "Bob", "Carol", "Dave"]);
    const round: Round = {
      bidderId: "player-1",
      bid: 200,
      partners: ["player-1", "player-2", "player-3"],
      winners: "partners",
    };
    const result = calculateScores(state, round);
    expect(result.find((p) => p.id === "player-1")?.score).toBe(400);
    expect(result.find((p) => p.id === "player-2")?.score).toBe(200);
    expect(result.find((p) => p.id === "player-3")?.score).toBe(200);
    expect(result.find((p) => p.id === "player-4")?.score).toBe(0);
  });
});

describe("calculateScores — non-partners win", () => {
  it("non-partners get bid, partners get 0", () => {
    const state = makeState(["Alice", "Bob", "Carol"]);
    const round: Round = {
      bidderId: "player-1",
      bid: 100,
      partners: ["player-1", "player-2"],
      winners: "non-partners",
    };
    const result = calculateScores(state, round);
    expect(result.find((p) => p.id === "player-1")?.score).toBe(0);
    expect(result.find((p) => p.id === "player-2")?.score).toBe(0);
    expect(result.find((p) => p.id === "player-3")?.score).toBe(100);
  });

  it("multiple non-partners each get bid amount", () => {
    const state = makeState(["Alice", "Bob", "Carol", "Dave"]);
    const round: Round = {
      bidderId: "player-1",
      bid: 160,
      partners: ["player-1"],
      winners: "non-partners",
    };
    const result = calculateScores(state, round);
    expect(result.find((p) => p.id === "player-1")?.score).toBe(0);
    expect(result.find((p) => p.id === "player-2")?.score).toBe(160);
    expect(result.find((p) => p.id === "player-3")?.score).toBe(160);
    expect(result.find((p) => p.id === "player-4")?.score).toBe(160);
  });
});

describe("calculateScores — cumulative scores", () => {
  it("scores accumulate correctly across multiple rounds", () => {
    let state = makeState(["Alice", "Bob", "Carol"]);

    const round1: Round = {
      bidderId: "player-1",
      bid: 100,
      partners: ["player-1", "player-2"],
      winners: "partners",
    };
    state = { ...state, players: calculateScores(state, round1) };

    expect(state.players.find((p) => p.id === "player-1")?.score).toBe(200);
    expect(state.players.find((p) => p.id === "player-2")?.score).toBe(100);
    expect(state.players.find((p) => p.id === "player-3")?.score).toBe(0);

    const round2: Round = {
      bidderId: "player-3",
      bid: 150,
      partners: ["player-3"],
      winners: "non-partners",
    };
    state = { ...state, players: calculateScores(state, round2) };

    // round2: non-partners (Alice + Bob) each get 150
    expect(state.players.find((p) => p.id === "player-1")?.score).toBe(350);
    expect(state.players.find((p) => p.id === "player-2")?.score).toBe(250);
    expect(state.players.find((p) => p.id === "player-3")?.score).toBe(0);
  });
});
