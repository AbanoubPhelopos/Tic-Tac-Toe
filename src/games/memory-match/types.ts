export type CardValue = string;

export interface Card {
  id: number;
  value: CardValue;
  isFlipped: boolean;
  isMatched: boolean;
}

export const GRID_SIZE = 4;

export const EMOJI_PAIRS: CardValue[] = [
  "🐶", "🐱", "🦊", "🐸",
  "🦁", "🐼", "🐨", "🐯",
];

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function createCards(): Card[] {
  const pairs = [...EMOJI_PAIRS, ...EMOJI_PAIRS];
  const shuffled = shuffleArray(pairs);
  return shuffled.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
}
