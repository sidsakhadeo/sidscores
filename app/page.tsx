"use client";

import Link from "next/link";

export default function HomePage() {
	return (
		<main className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center px-6 py-12">
			<div className="w-full max-w-xs text-center">
				{/* Decorative card suits */}
				<div
					className="flex items-center justify-center gap-5 mb-8 select-none"
					aria-hidden="true"
				>
					<span className="text-3xl text-white/25">♠</span>
					<span className="text-3xl text-rose-400/60">♥</span>
					<span className="text-3xl text-rose-400/60">♦</span>
					<span className="text-3xl text-white/25">♣</span>
				</div>

				{/* Title */}
				<h1 className="text-6xl font-extrabold text-white tracking-tight mb-2">
					Kaali Teeri
				</h1>
				<p className="text-emerald-300 font-medium text-lg mb-12">
					Score Tracker
				</p>

				{/* CTA */}
				<Link
					href="/setup-game"
					className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-bold text-xl rounded-2xl px-8 py-5 transition-colors shadow-lg shadow-emerald-950/50"
				>
					Start Game
					<span aria-hidden="true">→</span>
				</Link>
			</div>
		</main>
	);
}
