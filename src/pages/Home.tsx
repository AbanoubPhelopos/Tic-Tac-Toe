import GameCard from "../components/ui/GameCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-gray-600 mb-2">Classic Games</h1>
      <p className="text-gray-400 mb-10">Pick a game and start playing!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full px-4">
        <GameCard
          title="Tic Tac Toe"
          description="The classic 3x3 grid. X vs O."
          to="/tic-tac-toe"
          color="bg-blue-50 hover:bg-blue-100"
        />
        <GameCard
          title="Connect Four"
          description="Drop pieces, connect 4 in a row to win!"
          to="/connect-four"
          color="bg-yellow-50 hover:bg-yellow-100"
        />
        <GameCard
          title="Memory Match"
          description="Flip cards and find matching pairs!"
          to="/memory-match"
          color="bg-purple-50 hover:bg-purple-100"
        />
        <GameCard
          title="Wordle"
          description="Guess the 5-letter word in 6 tries!"
          to="/wordle"
          color="bg-emerald-50 hover:bg-emerald-100"
        />
      </div>
    </div>
  );
}
