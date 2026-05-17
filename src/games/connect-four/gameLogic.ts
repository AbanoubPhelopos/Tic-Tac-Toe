import { ROWS, COLS } from "./types";
import type { CellValue } from "./types";

export function createEmptyBoard(): CellValue[][] {
  return Array.from({ length: ROWS }, () => Array<CellValue>(COLS).fill(""));
}

export function findDropRow(board: CellValue[][], col: number): number {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === "") return row;
  }
  return -1;
}

export function checkWin(
  board: CellValue[][],
  row: number,
  col: number,
  player: CellValue
): number[][] {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (const [dr, dc] of directions) {
    const cells: number[][] = [[row, col]];

    for (let i = 1; i < 4; i++) {
      const r = row + dr * i;
      const c = col + dc * i;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
        cells.push([r, c]);
      } else break;
    }

    for (let i = 1; i < 4; i++) {
      const r = row - dr * i;
      const c = col - dc * i;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
        cells.push([r, c]);
      } else break;
    }

    if (cells.length >= 4) return cells;
  }

  return [];
}

export function isBoardFull(board: CellValue[][]): boolean {
  return board[0].every((cell) => cell !== "");
}
