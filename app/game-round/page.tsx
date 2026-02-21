"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BidStepper from "@/components/BidStepper";
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
	const [bid, setBid] = useState<number>(DEFAULT_BID);
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
		bid === DEFAULT_BID &&
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
		setBid(DEFAULT_BID);
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
		if (bid <= 0) {
			setFormError("Bid amount must be greater than 0.");
			return;
		}
		if (!partnersValid) {
			setFormError(
				`Select exactly ${requiredPartners} partner${requiredPartners !== 1 ? "s" : ""} (including the bidder).`,
			);
			return;
		}

		const round: Round = { bidderId, bid, partners, winners };
		addRound(round);
		resetForm();
	}

	function handleEndGame() {
		if (!canEndGame) return;
		router.push("/end-game");
	}

	return (
		<main className="min-h-screen bg-emerald-950 flex flex-col">
			{/* Sticky header */}
			<header className="sticky top-0 z-10 bg-emerald-950/95 backdrop-blur-sm flex items-center justify-between px-4 py-3 border-b border-emerald-900">
				<h1 className="text-white font-bold text-xl">Round {currentRound}</h1>
				<button
					type="button"
					onClick={() => setShowScores(true)}
					className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl px-3 py-2 transition-colors border border-white/20"
				>
					📊 Scores
				</button>
			</header>

			{/* Scrollable form */}
			<form
				onSubmit={handleNextRound}
				className="flex-1 overflow-y-auto px-4 py-5 space-y-4"
			>
				{/* Bidder */}
				<section className="bg-white rounded-2xl p-4 shadow-sm">
					<p className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-3">
						Highest Bidder
					</p>
					<div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
						{players.map((player) => (
							<label
								key={player.id}
								className={`shrink-0 px-4 py-2.5 rounded-xl font-semibold text-sm border transition-colors cursor-pointer ${
									bidderId === player.id
										? "bg-amber-500 text-white border-amber-500 shadow-sm"
										: "bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-400"
								}`}
							>
								<input
									type="radio"
									name="bidder"
									value={player.id}
									checked={bidderId === player.id}
									onChange={() => handleBidderChange(player.id)}
									className="sr-only"
								/>
								{player.name}
							</label>
						))}
					</div>
				</section>

				{/* Bid Amount */}
				<section className="bg-white rounded-2xl p-4 shadow-sm">
					<p className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-4">
						Bid Amount
					</p>
					<BidStepper
						value={bid}
						onChange={(v) => {
							setBid(v);
							setFormError(null);
						}}
					/>
				</section>

				{/* Partners */}
				<section className="bg-white rounded-2xl p-4 shadow-sm">
					<div className="flex items-center justify-between mb-3">
						<p className="text-stone-400 text-xs font-semibold uppercase tracking-widest">
							Partners
						</p>
						<span
							className={`text-xs font-bold rounded-full px-2.5 py-0.5 ${
								partnersValid
									? "bg-emerald-100 text-emerald-700"
									: "bg-amber-100 text-amber-700"
							}`}
						>
							{partners.length}/{requiredPartners}
						</span>
					</div>
					<div className="grid grid-cols-2 gap-2">
						{players.map((player) => {
							const isBidder = player.id === bidderId;
							const isChecked = isBidder || partners.includes(player.id);
							return (
								<button
									key={player.id}
									type="button"
									disabled={isBidder}
									onClick={() => handlePartnerToggle(player.id)}
									className={`relative py-3 px-3 rounded-xl font-semibold text-sm text-left border transition-colors ${
										isChecked
											? "bg-emerald-600 text-white border-emerald-600"
											: "bg-stone-50 text-stone-700 border-stone-200 hover:border-emerald-400"
									} ${isBidder ? "cursor-default" : ""}`}
								>
									{player.name}
									{isBidder && (
										<span className="absolute top-1.5 right-1.5 bg-amber-400 text-amber-900 text-[10px] font-bold rounded px-1 py-0.5 leading-none">
											BIDDER
										</span>
									)}
								</button>
							);
						})}
					</div>
				</section>

				{/* Who Won */}
				<section className="bg-white rounded-2xl p-4 shadow-sm">
					<p className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-3">
						Who Won?
					</p>
					<div className="flex rounded-xl overflow-hidden bg-stone-100 border border-stone-200 p-1 gap-1">
						<button
							type="button"
							onClick={() => setWinners("partners")}
							className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${
								winners === "partners"
									? "bg-emerald-600 text-white shadow-sm"
									: "text-stone-500 hover:text-stone-700"
							}`}
						>
							Partners
						</button>
						<button
							type="button"
							onClick={() => setWinners("non-partners")}
							className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${
								winners === "non-partners"
									? "bg-rose-500 text-white shadow-sm"
									: "text-stone-500 hover:text-stone-700"
							}`}
						>
							Non-partners
						</button>
					</div>
				</section>

				{/* Validation error */}
				{formError && (
					<p className="text-rose-400 text-sm font-medium px-1" role="alert">
						{formError}
					</p>
				)}
			</form>

			{/* Sticky footer — action buttons */}
			<footer className="sticky bottom-0 bg-emerald-950/95 backdrop-blur-sm px-4 py-3 border-t border-emerald-900">
				<button
					type="submit"
					form=""
					onClick={handleNextRound}
					disabled={!partnersValid}
					className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-extrabold text-lg rounded-2xl py-4 mb-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-950/30"
				>
					Next Round →
				</button>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={resetForm}
						className="flex-1 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/80 font-semibold text-sm rounded-xl py-3 transition-colors border border-white/20"
					>
						Reset
					</button>
					<button
						type="button"
						onClick={handleEndGame}
						disabled={!canEndGame}
						className="flex-1 text-rose-400 hover:bg-rose-500/10 active:bg-rose-500/20 font-semibold text-sm rounded-xl py-3 transition-colors border border-rose-500/30 disabled:opacity-30 disabled:cursor-not-allowed"
					>
						End Game
					</button>
				</div>
			</footer>

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
