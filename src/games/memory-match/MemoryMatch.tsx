import { useState, useEffect, useCallback } from "react";
import BackLink from "../../components/ui/BackLink";
import CardComponent from "./CardComponent";
import { createCards } from "./types";
import type { Card } from "./types";

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>(createCards);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const totalPairs = 8;

  const handleCardClick = useCallback(
    (id: number) => {
      if (isChecking || gameWon) return;
      if (flippedIds.includes(id)) return;

      const newFlipped = [...flippedIds, id];
      setFlippedIds(newFlipped);
      setCards((prev) =>
        prev.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
      );

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        setIsChecking(true);

        const [firstId, secondId] = newFlipped;
        const firstCard = cards.find((c) => c.id === firstId)!;
        const secondCard = cards.find((c) => c.id === secondId)!;

        if (firstCard.value === secondCard.value) {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true, isFlipped: false }
                : card
            )
          );
          setMatchedPairs((p) => p + 1);
          setFlippedIds([]);
          setIsChecking(false);
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === firstId || card.id === secondId
                  ? { ...card, isFlipped: false }
                  : card
              )
            );
            setFlippedIds([]);
            setIsChecking(false);
          }, 800);
        }
      }
    },
    [cards, flippedIds, isChecking, gameWon]
  );

  useEffect(() => {
    if (matchedPairs === totalPairs) {
      setGameWon(true);
    }
  }, [matchedPairs]);

  const resetGame = () => {
    setCards(createCards());
    setFlippedIds([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsChecking(false);
    setGameWon(false);
  };

  const statusText = gameWon
    ? "You Won!"
    : flippedIds.length < 2
      ? "Pick a card!"
      : "Checking...";

  const statusColor = gameWon
    ? "text-emerald-500"
    : "text-gray-500";

  return (
    <div className="flex flex-col items-center py-8">
      <div className="flex justify-center mb-2">
        <h1 className="font-black text-5xl md:text-6xl bg-clip-text text-transparent bg-linear-to-r from-violet-500 to-fuchsia-500 p-2 pb-4">
          Memory Match
        </h1>
      </div>

      <BackLink />

      <div className={`text-center my-4 text-2xl font-bold tracking-wide ${statusColor}`}>
        {statusText}
      </div>

      <div className="flex gap-8 mb-6">
        <div className="flex flex-col items-center px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Moves</span>
          <span className="text-2xl font-black text-gray-700">{moves}</span>
        </div>
        <div className="flex flex-col items-center px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Pairs</span>
          <span className="text-2xl font-black text-violet-600">
            {matchedPairs}/{totalPairs}
          </span>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <CardComponent
              key={card.id}
              card={card}
              onClick={handleCardClick}
              disabled={isChecking}
            />
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
