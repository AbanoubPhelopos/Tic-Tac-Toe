import { Link } from "react-router-dom";

export default function BackLink() {
  return (
    <Link
      to="/"
      className="mb-4 text-sm text-indigo-500 hover:text-indigo-700 underline transition-colors"
    >
      &larr; Back to Games
    </Link>
  );
}
