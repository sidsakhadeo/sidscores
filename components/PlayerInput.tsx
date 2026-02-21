interface PlayerInputProps {
	index: number;
	value: string;
	onChange: (value: string) => void;
	onRemove: () => void;
	canRemove: boolean; // false if only 2 players remain
}

export default function PlayerInput({
	index,
	value,
	onChange,
	onRemove,
	canRemove,
}: PlayerInputProps) {
	return (
		<div className="flex items-center gap-3">
			{/* Number chip */}
			<span className="shrink-0 w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center select-none">
				{index + 1}
			</span>

			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={`Player ${index + 1}`}
				className="flex-1 border border-stone-200 rounded-xl px-4 py-3 text-base text-stone-900 placeholder-stone-300 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
			/>

			<button
				type="button"
				onClick={onRemove}
				disabled={!canRemove}
				aria-label={`Remove player ${index + 1}`}
				className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl text-stone-400 hover:bg-rose-50 hover:text-rose-500 transition-colors disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-stone-400"
			>
				✕
			</button>
		</div>
	);
}
