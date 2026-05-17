import Square from "./Square";

function Board() {
    return (
        <>
            <div className="flex justify-center m-4">
                <p className="font-bold shadow-xl shadow-gray-500/50 text-4xl text-gray-500 p-2">Tic Tac Toe</p>
            </div>
            <div className="shadow-lg shadow-gray-500/50 p-4 w-fit m-auto rounded-xl">
                <div className="flex">
                    <Square />
                    <Square />
                    <Square />
                </div>
                <div className="flex">
                    <Square />
                    <Square />
                    <Square />
                </div>
                <div className="flex">
                    <Square />
                    <Square />
                    <Square />
                </div>
            </div>
        </>
    );
}

export default Board