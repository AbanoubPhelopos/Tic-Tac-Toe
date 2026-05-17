import { useState, useEffect, useCallback } from "react";
import BackLink from "../../components/ui/BackLink";
import Tile from "./Tile";
import Keyboard from "./Keyboard";
import { evaluateGuess, mergeKeyStates } from "./gameLogic";
import { pickRandomWord, isValidWord, WORD_LENGTH, MAX_ATTEMPTS } from "./words";
import type { TileData, LetterState } from "./words";

interface RowData {
  tiles: TileData[];
  isRevealed: boolean;
}

function createEmptyRow(): RowData {
  return {
    tiles: Array.from({ length: WORD_LENGTH }, () => ({ letter: "", state: "empty" as LetterState })),
    isRevealed: false,
  };
}

function createEmptyRows(): RowData[] {
  return Array.from({ length: MAX_ATTEMPTS }, createEmptyRow);
}

export default function Wordle() {
  const [target, setTarget] = useState(() => pickRandomWord());
  const [rows, setRows] = useState<RowData[]>(createEmptyRows);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [keyStates, setKeyStates] = useState<Record<string, LetterState>>({});
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState("");
  const [revealingRow, setRevealingRow] = useState(-1);

  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  }, []);

  const handleKey = useCallback(
    (key: string) => {
      if (gameOver) return;
      if (revealingRow >= 0) return;

      if (key === "BACK") {
        setCurrentInput((prev) => prev.slice(0, -1));
        return;
      }

      if (key === "ENTER") {
        if (currentInput.length !== WORD_LENGTH) {
          showMessage("Not enough letters");
          return;
        }

        if (!isValidWord(currentInput)) {
          showMessage("Not in word list");
          return;
        }

        const evaluated = evaluateGuess(currentInput, target);
        const isWin = evaluated.every((t) => t.state === "correct");

        setRevealingRow(currentRow);
        setKeyStates((prev) => mergeKeyStates(prev, evaluated));

        setTimeout(() => {
          setRows((prev) => {
            const next = [...prev];
            next[currentRow] = { tiles: evaluated, isRevealed: true };
            return next;
          });
          setRevealingRow(-1);

          if (isWin) {
            setGameOver(true);
            setWon(true);
            const winMessages = ["Genius!", "Magnificent!", "Impressive!", "Splendid!", "Great!", "Phew!"];
            showMessage(winMessages[currentRow] || "You Won!");
          } else if (currentRow + 1 >= MAX_ATTEMPTS) {
            setGameOver(true);
            showMessage(`The word was ${target.toUpperCase()}`);
          } else {
            setCurrentRow((r) => r + 1);
          }

          setCurrentInput("");
        }, WORD_LENGTH * 300 + 200);

        return;
      }

      if (/^[A-Z]$/.test(key) && currentInput.length < WORD_LENGTH) {
        setCurrentInput((prev) => prev + key);
      }
    },
    [currentInput, currentRow, gameOver, revealingRow, showMessage, target]
  );

  useEffect(() => {
    const onPhysicalKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Enter") {
        handleKey("ENTER");
      } else if (e.key === "Backspace") {
        handleKey("BACK");
      } else {
        const k = e.key.toUpperCase();
        if (/^[A-Z]$/.test(k)) handleKey(k);
      }
    };

    window.addEventListener("keydown", onPhysicalKey);
    return () => window.removeEventListener("keydown", onPhysicalKey);
  }, [handleKey]);

  const resetGame = () => {
    setTarget(pickRandomWord());
    setRows(createEmptyRows());
    setCurrentRow(0);
    setCurrentInput("");
    setKeyStates({});
    setGameOver(false);
    setWon(false);
    setMessage("");
    setRevealingRow(-1);
  };

  const buildRowTiles = (rowIdx: number): TileData[] => {
    if (rowIdx < currentRow) return rows[rowIdx].tiles;
    if (rowIdx === currentRow) {
      const tiles: TileData[] = [];
      for (let i = 0; i < WORD_LENGTH; i++) {
        tiles.push({
          letter: i < currentInput.length ? currentInput[i] : "",
          state: "empty",
        });
      }
      return tiles;
    }
    return Array.from({ length: WORD_LENGTH }, () => ({ letter: "", state: "empty" as LetterState }));
  };

  return (
    <div className="flex flex-col items-center py-8 px-4 w-full max-w-lg mx-auto bg-slate-100/40 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 dark:border-white/10 my-4 sm:my-8">
      <style>{`
        @keyframes tileFlip {
          0% { transform: rotateX(0deg); }
          50% { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }
      `}</style>

      <div className="flex justify-center mb-2">
        <h1 className="font-black text-5xl md:text-6xl bg-clip-text text-transparent bg-linear-to-r from-emerald-500 to-amber-500 p-2 pb-4">
          Wordle
        </h1>
      </div>

      <BackLink />

      <div className="relative h-10 flex items-center justify-center mb-2">
        {message && (
          <div
            className={`
              px-6 py-2 rounded-xl font-bold text-sm tracking-wide
              ${won ? "bg-emerald-500 text-white shadow-[0_4px_16px_rgba(16,185,129,0.4)]" : "bg-gray-800 text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)]"}
            `}
          >
            {message}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 mb-6">
        {Array.from({ length: MAX_ATTEMPTS }, (_, rowIdx) => {
          const tiles = buildRowTiles(rowIdx);
          const isRevealing = revealingRow === rowIdx;

          return (
            <div key={rowIdx} className="flex gap-1.5">
              {tiles.map((tile, colIdx) => (
                <Tile
                  key={colIdx}
                  letter={tile.letter}
                  state={tile.state}
                  revealDelay={colIdx * 300}
                  isRevealing={isRevealing}
                />
              ))}
            </div>
          );
        })}
      </div>

      <Keyboard keyStates={keyStates} onKey={handleKey} disabled={gameOver || revealingRow >= 0} />

      {gameOver && (
        <button
          type="button"
          onClick={resetGame}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-400 hover:to-emerald-500 shadow-[0_4px_14px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
        >
          New Game
        </button>
      )}
    </div>
  );
}
