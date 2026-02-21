"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import PlayerInput from "@/components/PlayerInput";
import { useGame } from "@/context/GameContext";

const INITIAL_PLAYER_COUNT = 4;

interface PlayerEntry {
  id: number;
  name: string;
}

let nextId = INITIAL_PLAYER_COUNT + 1;

function makeInitialPlayers(): PlayerEntry[] {
  return Array.from({ length: INITIAL_PLAYER_COUNT }, (_, i) => ({
    id: i + 1,
    name: "",
  }));
}

export default function SetupGamePage() {
  const router = useRouter();
  const { initGame } = useGame();

  const [players, setPlayers] = useState<PlayerEntry[]>(makeInitialPlayers);
  const [error, setError] = useState<string | null>(null);

  function handleChange(id: number, value: string) {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: value } : p)),
    );
    setError(null);
  }

  function handleRemove(id: number) {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }

  function handleAddPlayer() {
    setPlayers((prev) => [...prev, { id: nextId++, name: "" }]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validNames = players.map((p) => p.name.trim()).filter(Boolean);
    if (validNames.length < 2) {
      setError("Please enter at least 2 player names.");
      return;
    }
    initGame(validNames);
    router.push("/game-round");
  }

  const canRemove = players.length > 2;

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="w-full max-w-md mx-auto">
        <Header title="Who's playing?" />

        <form onSubmit={handleSubmit} className="space-y-3">
          {players.map((player, index) => (
            <PlayerInput
              key={player.id}
              index={index}
              value={player.name}
              onChange={(value) => handleChange(player.id, value)}
              onRemove={() => handleRemove(player.id)}
              canRemove={canRemove}
            />
          ))}

          {/* Add player button */}
          <button
            type="button"
            onClick={handleAddPlayer}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm py-2 transition-colors"
          >
            <span className="text-lg leading-none">+</span> Add Player
          </button>

          {/* Validation error */}
          {error && (
            <p className="text-red-600 text-sm font-medium" role="alert">
              {error}
            </p>
          )}

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-lg rounded-xl px-6 py-4 transition-colors"
            >
              Start Game
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
