import type { LetterState } from "./words";

interface KeyboardProps {
  keyStates: Record<string, LetterState>;
  onKey: (key: string) => void;
  disabled: boolean;
}

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

const stateStyles: Record<string, string> = {
  correct: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white border-transparent shadow-[0_2px_10px_rgba(52,211,153,0.4)]",
  present: "bg-gradient-to-br from-amber-400 to-amber-600 text-white border-transparent shadow-[0_2px_10px_rgba(251,191,36,0.4)]",
  absent: "bg-gradient-to-br from-slate-500 to-slate-700 text-white border-transparent opacity-90",
};

export default function Keyboard({ keyStates, onKey, disabled }: KeyboardProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 mt-4">
      {ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1 sm:gap-1.5">
          {rowIdx === 1 && <div className="w-3" />}
          {row.map((key) => {
            const state = keyStates[key.toLowerCase()];
            const isWide = key === "ENTER" || key === "BACK";

            return (
              <button
                key={key}
                type="button"
                onClick={() => onKey(key)}
                disabled={disabled}
                className={`
                  ${isWide ? "px-3 sm:px-4 text-xs font-bold" : "w-8 sm:w-10 text-sm font-bold"}
                  h-11 sm:h-12
                  rounded-lg border
                  flex items-center justify-center uppercase
                  transition-all duration-200
                  hover:brightness-110 active:scale-95
                  cursor-pointer
                  ${state ? stateStyles[state] : "bg-white/40 dark:bg-white/10 text-slate-800 dark:text-slate-100 border-white/20 backdrop-blur-md hover:bg-white/60 dark:hover:bg-white/20 shadow-sm"}
                `}
              >
                {key === "BACK" ? "⌫" : key}
              </button>
            );
          })}
          {rowIdx === 1 && <div className="w-3" />}
        </div>
      ))}
    </div>
  );
}
