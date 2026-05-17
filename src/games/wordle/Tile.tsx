import type { LetterState } from "./words";

interface TileProps {
  letter: string;
  state: LetterState;
  revealDelay: number;
  isRevealing: boolean;
}

const stateStyles: Record<LetterState, string> = {
  correct: "bg-gradient-to-br from-emerald-400 to-emerald-600 border-transparent text-white",
  present: "bg-gradient-to-br from-amber-400 to-amber-600 border-transparent text-white",
  absent: "bg-gradient-to-br from-slate-500 to-slate-700 border-transparent text-white",
  empty: "bg-white/40 dark:bg-white/5 border-white/30 dark:border-white/10 text-slate-800 dark:text-slate-100 backdrop-blur-sm",
};

const stateShadow: Record<LetterState, string> = {
  correct: "shadow-[0_0_24px_rgba(52,211,153,0.6)]",
  present: "shadow-[0_0_24px_rgba(251,191,36,0.6)]",
  absent: "shadow-[0_4px_12px_rgba(15,23,42,0.3)]",
  empty: "shadow-[0_4px_16px_rgba(0,0,0,0.05)]",
};

export default function Tile({ letter, state, revealDelay, isRevealing }: TileProps) {
  const hasLetter = letter !== "";
  const isEvaluated = state !== "empty";

  const bounce = hasLetter && !isEvaluated ? "scale-105" : "";
  const flip = isRevealing && isEvaluated;

  return (
    <div
      className={`
        w-14 h-14 sm:w-16 sm:h-16
        flex items-center justify-center
        text-2xl sm:text-3xl font-black uppercase
        border-2 rounded-xl
        transition-all duration-300
        ${stateStyles[state]}
        ${stateShadow[state]}
        ${bounce}
      `}
      style={
        flip
          ? {
              animation: `tileFlip 0.5s ease ${revealDelay}ms both`,
            }
          : undefined
      }
    >
      {letter}
    </div>
  );
}
