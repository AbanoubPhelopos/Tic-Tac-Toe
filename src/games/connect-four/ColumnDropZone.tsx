import type { CellValue } from "./types";

interface ColumnDropZoneProps {
  col: number;
  onDrop: (col: number) => void;
  hoverCol: number | null;
  currentPlayer: CellValue;
  disabled: boolean;
}

export default function ColumnDropZone({
  col,
  onDrop,
  hoverCol,
  currentPlayer,
  disabled,
}: ColumnDropZoneProps) {
  const previewColor = currentPlayer === "R" ? "bg-red-300" : "bg-yellow-200";

  return (
    <button
      type="button"
      aria-label={`Drop token in column ${col + 1}`}
      onClick={() => onDrop(col)}
      disabled={disabled}
      className={`flex flex-col items-center gap-1 cursor-pointer transition-opacity ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div
        className={`w-14 h-4 sm:w-16 rounded transition-all duration-150 ${
          hoverCol === col && !disabled ? previewColor : "bg-transparent"
        }`}
      />
    </button>
  );
}
