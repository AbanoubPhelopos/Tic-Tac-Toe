import type { Card } from "./types";

interface CardComponentProps {
  card: Card;
  onClick: (id: number) => void;
  disabled: boolean;
}

export default function CardComponent({ card, onClick, disabled }: CardComponentProps) {
  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <button
      type="button"
      onClick={() => !disabled && !isRevealed && onClick(card.id)}
      disabled={disabled || isRevealed}
      className={`
        relative w-20 h-20 sm:w-24 sm:h-24
        rounded-2xl cursor-pointer
        transition-all duration-500 ease-out
        transform-3d [perspective-[600px]]
        ${card.isMatched ? "scale-95" : "hover:-translate-y-1 hover:shadow-xl"}
        ${disabled && !isRevealed ? "cursor-not-allowed" : ""}
      `}
    >
      <div
        className={`
          relative w-full h-full
          transition-transform duration-500 ease-out
          transform-3d [transform-style:preserve-3d]
          ${isRevealed ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"}
        `}
      >
        {/* Front (face down) */}
        <div
          className={`
            absolute inset-0 rounded-2xl
            bg-linear-to-br from-violet-500 to-purple-700
            border-2 border-violet-400
            shadow-[0_4px_20px_rgba(139,92,246,0.3)]
            flex items-center justify-center
            backface-hidden
          `}
        >
          <span className="text-3xl text-white/50">?</span>
        </div>

        {/* Back (face up) */}
        <div
          className={`
            absolute inset-0 rounded-2xl
            flex items-center justify-center
            backface-hidden [transform:rotateY[(180deg)]]
            ${card.isMatched
              ? "bg-linear-to-br from-emerald-50 to-green-100 border-2 border-emerald-300 shadow-[0_4px_20px_rgba(16,185,129,0.25)]"
              : "bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            }
          `}
        >
          <span className="text-4xl sm:text-5xl">{card.value}</span>
        </div>
      </div>
    </button>
  );
}
