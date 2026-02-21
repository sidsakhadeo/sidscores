"use client";

import Link from "next/link";

export default function HomePage() {
	return (
		<main className="min-h-screen bg-white flex items-center justify-center px-4">
			<div className="w-full max-w-md text-center">
				{/* App title */}
				<h1 className="text-5xl font-extrabold text-gray-900 mb-3">Kali3</h1>
				<p className="text-lg text-blue-600 font-medium mb-8">
					Kali Teeri Scorecard
				</p>

				{/* Description */}
				<div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-3">
					<p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
						This app tracks:
					</p>
					<div className="flex items-start gap-3">
						<span className="text-blue-500 mt-0.5">🏆</span>
						<p className="text-gray-700">
							Who&apos;s the highest bidder each round
						</p>
					</div>
					<div className="flex items-start gap-3">
						<span className="text-blue-500 mt-0.5">💰</span>
						<p className="text-gray-700">The bid amount</p>
					</div>
					<div className="flex items-start gap-3">
						<span className="text-blue-500 mt-0.5">🤝</span>
						<p className="text-gray-700">Who the bidder&apos;s partners are</p>
					</div>
					<div className="flex items-start gap-3">
						<span className="text-blue-500 mt-0.5">🃏</span>
						<p className="text-gray-700">Which team won the round</p>
					</div>
				</div>

				{/* CTA */}
				<Link
					href="/setup-game"
					className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-lg rounded-xl px-6 py-4 transition-colors"
				>
					Setup Game
					<span aria-hidden="true">→</span>
				</Link>
			</div>
		</main>
	);
}
