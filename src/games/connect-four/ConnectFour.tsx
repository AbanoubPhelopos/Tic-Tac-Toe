import { useState, useCallback } from "react";
import BackLink from "../../components/ui/BackLink";
import Cell from "./Cell";
import ColumnDropZone from "./ColumnDropZone";
import { createEmptyBoard, findDropRow, checkWin, isBoardFull } from "./gameLogic";
import { COLS } from "./types";
import type { CellValue, Winner } from "./types";

export default function ConnectFour() {
  const [board, setBoard] = useState<CellValue[][]>(createEmptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<CellValue>("R");
  const [winner, setWinner] = useState<Winner>(null);
  const [winningCells, setWinningCells] = useState<number[][]>([]);
  const [hoverCol, setHoverCol] = useState<number | null>(null);

  const handleDrop = useCallback(
    (col: number) => {
      if (winner) return;

      const row = findDropRow(board, col);
      if (row === -1) return;

      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = currentPlayer;

      const winCells = checkWin(newBoard, row, col, currentPlayer);

      if (winCells.length >= 4) {
        setWinner(currentPlayer as "R" | "Y");
        setWinningCells(winCells);
      } else if (isBoardFull(newBoard)) {
        setWinner("DRAW");
      } else {
        setCurrentPlayer(currentPlayer === "R" ? "Y" : "R");
      }

      setBoard(newBoard);
    },
    [board, currentPlayer, winner]
  );

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer("R");
    setWinner(null);
    setWinningCells([]);
    setHoverCol(null);
  };

  const isWinCell = (row: number, col: number) =>
    winningCells.some(([r, c]) => r === row && c === col);

  const statusText = winner
    ? winner === "DRAW"
      ? "It's a Draw!"
      : `Winner: ${winner === "R" ? "Red" : "Yellow"}!`
    : `Next: ${currentPlayer === "R" ? "Red" : "Yellow"}`;

  const statusColor = winner
    ? winner === "DRAW"
      ? "text-gray-500"
      : winner === "R"
        ? "text-red-500"
        : "text-yellow-500"
    : currentPlayer === "R"
      ? "text-red-500"
      : "text-yellow-500";

  return (
    <div className="flex flex-col items-center py-8">
      <div className="flex justify-center mb-2">
        <h1 className="font-black text-5xl md:text-6xl bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-cyan-500 p-2 pb-4">
          Connect Four
        </h1>
      </div>

      <BackLink />

      <div className={`text-center my-6 text-2xl font-bold tracking-wide ${statusColor}`}>
        {statusText}
      </div>

      <div
        className="bg-linear-to-b from-blue-500 to-blue-700 p-4 sm:p-6 rounded-3xl shadow-[0_10px_40px_rgba(37,99,235,0.4)] border-4 border-blue-800"
        onMouseLeave={() => setHoverCol(null)}
      >
        <div className="flex gap-2 mb-2 px-1">
          {Array.from({ length: COLS }, (_, col) => (
            <ColumnDropZone
              key={col}
              col={col}
              onDrop={handleDrop}
              hoverCol={hoverCol}
              currentPlayer={currentPlayer}
              disabled={!!winner}
            />
          ))}
        </div>

        <div className="flex flex-col">
          {board.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-2 mb-2 last:mb-0">
              {row.map((cell, colIdx) => (
                <div
                  key={colIdx}
                  className="bg-transparent p-1 cursor-pointer transition-transform duration-200 hover:scale-105 relative"
                  onClick={() => handleDrop(colIdx)}
                  onMouseEnter={() => setHoverCol(colIdx)}
                >
                  <Cell value={cell} isWinning={isWinCell(rowIdx, colIdx)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={resetGame}
        className="mt-8 px-8 py-3 bg-white text-gray-800 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 hover:shadow-md active:bg-gray-100 transition-all duration-200 cursor-pointer"
      >
        New Game
      </button>
    </div>
  );
}
