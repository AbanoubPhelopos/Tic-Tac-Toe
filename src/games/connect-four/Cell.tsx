import type { CellValue } from "./types";

interface CellProps {
  value: CellValue;
  isWinning: boolean;
}

export default function Cell({ value, isWinning }: CellProps) {
  const base = "w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-300";
  
  let color = "bg-blue-900 shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)]"; // empty hole
  if (value === "R") {
    color = "bg-gradient-to-br from-red-400 to-red-600 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.4)] border border-red-700";
  } else if (value === "Y") {
    color = "bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.4)] border border-yellow-600";
  }

  const win = isWinning ? "ring-4 ring-white scale-110 z-10" : "";

  return <div className={`${base} ${color} ${win}`} />;
}
