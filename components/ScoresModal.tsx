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
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			aria-modal="true"
			role="dialog"
			aria-label="Current scores"
		>
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/50"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Modal panel */}
			<div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-bold text-gray-900">Current Scores</h2>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close scores modal"
						className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
					>
						✕
					</button>
				</div>

				<ScoresTable players={players} />
			</div>
		</div>
	);
}
