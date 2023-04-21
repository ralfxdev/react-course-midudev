import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";

import { TURNS } from "./constants";

import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  });
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(() => {
        return newWinner;
      });
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  };

  return (
    <>
      <main className="board">
        <h1>TIC TAC TOE</h1>
        <button onClick={resetGame}>Reset</button>
        <section className="game">
          {board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
    </>
  );
}

export default App;
