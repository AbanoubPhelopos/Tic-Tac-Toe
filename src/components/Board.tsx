import { useState } from "react";
import Square from "./Square";

function Board() {
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

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div className="flex justify-center m-4">
                <p className="font-bold shadow-xl shadow-gray-500/50 text-4xl text-gray-500 p-2">Tic Tac Toe</p>
            </div>
            
            <div className="text-center mb-6 text-2xl font-semibold text-gray-600">
                {status}
            </div>

            <div className="shadow-lg shadow-gray-500/50 p-4 w-fit m-auto rounded-xl">
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
        </>
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

export default Board;