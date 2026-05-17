import type { LetterState, TileData } from "./words";
import { WORD_LENGTH } from "./words";

export function evaluateGuess(guess: string, target: string): TileData[] {
  const result: TileData[] = Array.from({ length: WORD_LENGTH }, () => ({
    letter: "",
    state: "absent",
  }));

  const targetLetters = target.split("");
  const guessLetters = guess.split("");
  const used = Array(WORD_LENGTH).fill(false);

  for (let i = 0; i < WORD_LENGTH; i++) {
    result[i].letter = guessLetters[i];

    if (guessLetters[i] === targetLetters[i]) {
      result[i].state = "correct";
      used[i] = true;
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i].state === "correct") continue;

    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!used[j] && guessLetters[i] === targetLetters[j]) {
        result[i].state = "present";
        used[j] = true;
        break;
      }
    }
  }

  return result;
}

export function mergeKeyStates(
  current: Record<string, LetterState>,
  tiles: TileData[]
): Record<string, LetterState> {
  const priority: Record<LetterState, number> = {
    correct: 3,
    present: 2,
    absent: 1,
    empty: 0,
  };

  const next = { ...current };

  for (const tile of tiles) {
    const key = tile.letter.toLowerCase();
    const existing = next[key];
    if (!existing || priority[tile.state] > priority[existing]) {
      next[key] = tile.state;
    }
  }

  return next;
}
