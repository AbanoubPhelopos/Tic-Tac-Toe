import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TicTacToe from "./games/tic-tac-toe/TicTacToe";
import ConnectFour from "./games/connect-four/ConnectFour";
import MemoryMatch from "./games/memory-match/MemoryMatch";
import Wordle from "./games/wordle/Wordle";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/connect-four" element={<ConnectFour />} />
      <Route path="/memory-match" element={<MemoryMatch />} />
      <Route path="/wordle" element={<Wordle />} />
    </Routes>
  );
}

export default App;
