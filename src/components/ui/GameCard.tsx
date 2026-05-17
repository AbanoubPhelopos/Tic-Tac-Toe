interface GameCardProps {
  title: string;
  description: string;
  to: string;
  color: string;
}

export default function GameCard({ title, description, to, color }: GameCardProps) {
  return (
    <a
      href={to}
      className={`group block p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${color}`}
    >
      <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-gray-900">
        {title}
      </h2>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  );
}
