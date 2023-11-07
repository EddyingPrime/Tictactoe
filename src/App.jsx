import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);

  const handleClick = (index) => {
    const squares = [...board];

    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    squares[index] = xIsNext ? "X" : "O";
    setBoard(squares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  // Result
  const winner = calculateWinner(board);

  const handleGameEnd = () => {
    if (winner) {
      if (winner === "X") {
        setXScore(xScore + 1);
      } else {
        setOScore(oScore + 1);
      }
    } else if (board.every((square) => square !== null)) {
      // Draw
      setDrawScore(drawScore + 1);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    handleGameEnd();
  };

  const resetScores = () => {
    setXScore(0);
    setOScore(0);
    setDrawScore(0);
  };

  // Gameboard & Reset buttons
  return (
    <>
      <div className="game">
        <div className="game-board">
          <div className="game-info">
            <div className="reset">
              {winner
                ? `Winner: ${winner}`
                : board.every((square) => square !== null)
                ? "It's a draw!"
                : `Next player: ${xIsNext ? "X" : "O"}`}
            </div>
            <div className="score">
              X: {xScore} | O: {oScore} | Draw: {drawScore}
            </div>
            <button onClick={resetGame}>Reset Game</button>
            <button onClick={resetScores}>Reset Scores</button>
          </div>
          <div className="gameplay">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Calculation based on "board-rows"
function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default App;
