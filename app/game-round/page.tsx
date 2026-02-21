"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ScoresModal from "@/components/ScoresModal";
import { useGame } from "@/context/GameContext";
import type { Round } from "@/types/game";

const DEFAULT_BID = 160;

export default function GameRoundPage() {
	const router = useRouter();
	const { gameState, addRound, getSortedPlayers } = useGame();

	// Guard: redirect if no game
	useEffect(() => {
		if (!gameState) {
			router.replace("/setup-game");
		}
	}, [gameState, router]);

	// Form state
	const [bidderId, setBidderId] = useState<string>("");
	const [bid, setBid] = useState<string>(String(DEFAULT_BID));
	const [partners, setPartners] = useState<string[]>([]);
	const [winners, setWinners] = useState<"partners" | "non-partners">(
		"partners",
	);
	const [showScores, setShowScores] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	// Initialise bidderId once gameState is available
	useEffect(() => {
		if (gameState && gameState.players.length > 0 && !bidderId) {
			const firstId = gameState.players[0].id;
			setBidderId(firstId);
			setPartners([firstId]);
		}
	}, [gameState, bidderId]);

	if (!gameState) return null;

	const { players, currentRound } = gameState;

	// Required number of partners per round: floor(n/2)
	// n even → n/2, n odd → (n-1)/2
	const requiredPartners = Math.floor(players.length / 2);
	const partnersValid = partners.length === requiredPartners;

	// Pristine state: form is at its default values (no user edits since last init/reset)
	const defaultBidderId = players[0]?.id ?? "";
	const isPristine =
		bidderId === defaultBidderId &&
		bid === String(DEFAULT_BID) &&
		partners.length === 1 &&
		partners[0] === defaultBidderId &&
		winners === "partners";

	const canEndGame = isPristine || partnersValid;

	// When bidder changes: reset partners so only the new bidder is checked
	function handleBidderChange(newBidderId: string) {
		setBidderId(newBidderId);
		setPartners([newBidderId]);
		setFormError(null);
	}

	function handlePartnerToggle(playerId: string) {
		if (playerId === bidderId) return; // bidder is always a partner, cannot uncheck
		setPartners((prev) =>
			prev.includes(playerId)
				? prev.filter((id) => id !== playerId)
				: [...prev, playerId],
		);
	}

	function resetForm() {
		const firstId = players[0]?.id ?? "";
		setBidderId(firstId);
		setBid(String(DEFAULT_BID));
		setPartners(firstId ? [firstId] : []);
		setWinners("partners");
		setFormError(null);
	}

	function handleNextRound(e: React.FormEvent) {
		e.preventDefault();
		if (!bidderId) {
			setFormError("Please select a bidder.");
			return;
		}
		const bidNumber = Number(bid);
		if (!bid || bidNumber <= 0) {
			setFormError("Bid amount must be greater than 0.");
			return;
		}
		if (!partnersValid) {
			setFormError(`Select exactly ${requiredPartners} partner${requiredPartners !== 1 ? "s" : ""} (including the bidder).`);
			return;
		}

		const round: Round = { bidderId, bid: bidNumber, partners, winners };
		addRound(round);
		resetForm();
	}

	function handleEndGame() {
		if (!canEndGame) return;
		router.push("/end-game");
	}

	return (
		<main className="min-h-screen bg-white px-4 py-10">
			<div className="w-full max-w-md mx-auto">
				{/* Header row with scores button */}
				<div className="flex items-center justify-between mb-6">
					<Header title={`Round ${currentRound}`} />
					<button
						type="button"
						onClick={() => setShowScores(true)}
						className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-400 rounded-lg px-3 py-2 transition-colors"
					>
						📊 Scores
					</button>
				</div>

				<form onSubmit={handleNextRound} className="space-y-6">
					{/* 3a. Select Bidder */}
					<section>
						<label
							htmlFor="bidder"
							className="block text-sm font-semibold text-gray-700 mb-2"
						>
							Highest Bidder
						</label>
						<select
							id="bidder"
							value={bidderId}
							onChange={(e) => handleBidderChange(e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
						>
							{players.map((player) => (
								<option key={player.id} value={player.id}>
									{player.name}
								</option>
							))}
						</select>
					</section>

					{/* 3b. Bid Amount */}
					<section>
						<label
							htmlFor="bid"
							className="block text-sm font-semibold text-gray-700 mb-2"
						>
							Bid Amount
						</label>
						<input
							id="bid"
							type="number"
							value={bid}
							min={1}
							onChange={(e) => {
								setBid(e.target.value);
								setFormError(null);
							}}
							className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</section>

					{/* 3c. Bidder's Partners */}
					<section>
						<div className="flex items-baseline justify-between mb-2">
							<p className="text-sm font-semibold text-gray-700">
								Bidder&apos;s Partners
							</p>
							<span className={`text-xs font-medium ${partnersValid ? "text-green-600" : "text-amber-600"}`}>
								{partners.length}/{requiredPartners} selected
							</span>
						</div>
						<div className="space-y-2">
							{players.map((player) => {
								const isBidder = player.id === bidderId;
								const isChecked = isBidder || partners.includes(player.id);
								return (
									<label
										key={player.id}
										className={`flex items-center gap-3 rounded-lg px-4 py-3 border cursor-pointer transition-colors ${
											isChecked
												? "bg-blue-50 border-blue-300"
												: "border-gray-200 hover:bg-gray-50"
										} ${isBidder ? "cursor-default opacity-80" : ""}`}
									>
										<input
											type="checkbox"
											checked={isChecked}
											disabled={isBidder}
											onChange={() => handlePartnerToggle(player.id)}
											className="w-4 h-4 text-blue-600 rounded"
										/>
										<span className="font-medium text-gray-900">
											{player.name}
										</span>
										{isBidder && (
											<span className="ml-auto text-xs text-blue-500 font-medium">
												Bidder
											</span>
										)}
									</label>
								);
							})}
						</div>
					</section>

					{/* 3d. Who Won? */}
					<section>
						<p className="block text-sm font-semibold text-gray-700 mb-2">
							Who won?
						</p>
						<div className="space-y-2">
							<label
								className={`flex items-center gap-3 rounded-lg px-4 py-3 border cursor-pointer transition-colors ${
									winners === "partners"
										? "bg-blue-50 border-blue-300"
										: "border-gray-200 hover:bg-gray-50"
								}`}
							>
								<input
									type="radio"
									name="winners"
									value="partners"
									checked={winners === "partners"}
									onChange={() => setWinners("partners")}
									className="w-4 h-4 text-blue-600"
								/>
								<span className="font-medium text-gray-900">Partners</span>
							</label>
							<label
								className={`flex items-center gap-3 rounded-lg px-4 py-3 border cursor-pointer transition-colors ${
									winners === "non-partners"
										? "bg-blue-50 border-blue-300"
										: "border-gray-200 hover:bg-gray-50"
								}`}
							>
								<input
									type="radio"
									name="winners"
									value="non-partners"
									checked={winners === "non-partners"}
									onChange={() => setWinners("non-partners")}
									className="w-4 h-4 text-blue-600"
								/>
								<span className="font-medium text-gray-900">
									Non-Partners / Opposition
								</span>
							</label>
						</div>
					</section>

					{/* Validation error */}
					{formError && (
						<p className="text-red-600 text-sm font-medium" role="alert">
							{formError}
						</p>
					)}

					{/* 3e. Action buttons */}
					<div className="flex flex-col gap-3 pt-2">
						<button
							type="submit"
							disabled={!partnersValid}
							className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-lg rounded-xl px-6 py-4 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
						>
							Next Round →
						</button>
						<button
							type="button"
							onClick={resetForm}
							className="w-full bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-600 border border-gray-300 font-semibold text-lg rounded-xl px-6 py-4 transition-colors"
						>
							Reset Round
						</button>
						<button
							type="button"
							onClick={handleEndGame}
							disabled={!canEndGame}
							className="w-full bg-white hover:bg-red-50 active:bg-red-100 text-red-600 border border-red-300 hover:border-red-400 font-semibold text-lg rounded-xl px-6 py-4 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
						>
							End Game
						</button>
					</div>
				</form>
			</div>

			{/* Scores Modal */}
			{showScores && (
				<ScoresModal
					players={getSortedPlayers()}
					onClose={() => setShowScores(false)}
				/>
			)}
		</main>
	);
}
