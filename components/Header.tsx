interface HeaderProps {
	title: string;
	variant?: "light" | "dark";
}

export default function Header({ title, variant = "dark" }: HeaderProps) {
	return (
		<h1
			className={`text-3xl font-extrabold mb-6 ${
				variant === "dark" ? "text-white" : "text-stone-900"
			}`}
		>
			{title}
		</h1>
	);
}
