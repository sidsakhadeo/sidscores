interface BidStepperProps {
	value: number;
	onChange: (value: number) => void;
	step?: number;
	min?: number;
	max?: number;
}

export default function BidStepper({
	value,
	onChange,
	step = 5,
	min = 160,
	max = 250,
}: BidStepperProps) {
	const atMin = value <= min;
	const atMax = value >= max;

	return (
		<div className="flex items-center gap-4">
			<button
				type="button"
				onClick={() => onChange(Math.max(min, value - step))}
				disabled={atMin}
				aria-label="Decrease bid"
				className="shrink-0 w-12 h-12 rounded-xl bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-700 font-bold text-2xl flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
			>
				−
			</button>

			<div className="flex-1 text-center">
				<span className="text-4xl font-extrabold text-stone-900 tabular-nums">
					{value}
				</span>
			</div>

			<button
				type="button"
				onClick={() => onChange(Math.min(max, value + step))}
				disabled={atMax}
				aria-label="Increase bid"
				className="shrink-0 w-12 h-12 rounded-xl bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-700 font-bold text-2xl flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
			>
				+
			</button>
		</div>
	);
}
