import { useState } from "react";
import BackLink from "../../components/ui/BackLink";
import Square from "./Square";

export default function TicTacToe() {
    const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    function handleClick(i: number) {
        if (squares[i] !== "" || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const resetGame = () => {
        setSquares(Array(9).fill(""));
        setXIsNext(true);
    };

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (squares.every(s => s !== "")) {
        status = "It's a Draw!";
    } else {
        status = `Next player: ${xIsNext ? "X" : "O"}`;
    }

    const statusColor = winner
        ? (winner === "X" ? "text-indigo-600" : "text-rose-600")
        : squares.every(s => s !== "") ? "text-gray-500" : "text-gray-600";

    return (
        <div className="flex flex-col items-center py-8">
            <div className="flex justify-center mb-2">
                <h1 className="font-black text-5xl md:text-6xl bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-rose-500 p-2 pb-4">
                    Tic Tac Toe
                </h1>
            </div>

            <BackLink />

            <div className={`text-center my-6 text-2xl font-bold tracking-wide ${statusColor}`}>
                {status}
            </div>

            <div className="bg-gray-50 p-6 w-fit m-auto rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
                <div className="flex">
                    <Square value={squares[0]} onClick={() => handleClick(0)} />
                    <Square value={squares[1]} onClick={() => handleClick(1)} />
                    <Square value={squares[2]} onClick={() => handleClick(2)} />
                </div>
                <div className="flex">
                    <Square value={squares[3]} onClick={() => handleClick(3)} />
                    <Square value={squares[4]} onClick={() => handleClick(4)} />
                    <Square value={squares[5]} onClick={() => handleClick(5)} />
                </div>
                <div className="flex">
                    <Square value={squares[6]} onClick={() => handleClick(6)} />
                    <Square value={squares[7]} onClick={() => handleClick(7)} />
                    <Square value={squares[8]} onClick={() => handleClick(8)} />
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

function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] !== "" && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
