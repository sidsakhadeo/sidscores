interface HeaderProps {
	title: string;
}

export default function Header({ title }: HeaderProps) {
	return <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>;
}
