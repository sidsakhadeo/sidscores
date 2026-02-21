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
		<div className="flex items-center gap-2">
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={`Player ${index + 1}`}
				className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			/>
			<button
				type="button"
				onClick={onRemove}
				disabled={!canRemove}
				aria-label={`Remove player ${index + 1}`}
				className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-300 disabled:hover:text-gray-500"
			>
				✕
			</button>
		</div>
	);
}
