import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TicTacToe from "./games/tic-tac-toe/TicTacToe";
import ConnectFour from "./games/connect-four/ConnectFour";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/connect-four" element={<ConnectFour />} />
    </Routes>
  );
}

export default App;
