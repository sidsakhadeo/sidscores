"use client";

import { useEffect } from "react";
import type { Player } from "@/types/game";
import ScoresTable from "./ScoresTable";

interface ScoresModalProps {
	players: Player[]; // sorted by score descending
	onClose: () => void;
}

export default function ScoresModal({ players, onClose }: ScoresModalProps) {
	// Close on Escape key
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	return (
		<div
			className="fixed inset-0 z-50 flex items-end justify-center"
			aria-modal="true"
			role="dialog"
			aria-label="Current scores"
		>
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Bottom sheet panel */}
			<div className="relative bg-white rounded-t-3xl w-full max-w-md px-4 pt-3 pb-8 max-h-[80vh] overflow-y-auto shadow-2xl">
				{/* Drag handle */}
				<div
					className="w-10 h-1 bg-stone-300 rounded-full mx-auto mb-4"
					aria-hidden="true"
				/>

				{/* Header */}
				<div className="flex items-center justify-between mb-5">
					<h2 className="text-xl font-extrabold text-stone-900">Scores</h2>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close scores"
						className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition-colors"
					>
						✕
					</button>
				</div>

				<ScoresTable players={players} />
			</div>
		</div>
	);
}
