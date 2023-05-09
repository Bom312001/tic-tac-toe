import "./App.css";
import { useEffect, useState } from "react";
import Square from "./Square";
import { Winner } from "./Winner";

function App() {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [gameEnded, setGameEnded] = useState(false);
  const [player, setPlayer] = useState("X");
  const [listSquare, setListSquare] = useState([]);
  // console.log(board);

  const resetBoard = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setListSquare([]);
  };

  const playFn = (row, col) => {
    if (!gameEnded) {
      if (board[row][col] !== "") {
        return;
      }
      // player === "X" ? setPlayer("O") : setPlayer("X");
      const newBoard = [...board];
      newBoard[row][col] = player;
      setBoard(newBoard);
    } else {
      setGameEnded(false);
      resetBoard();
    }
    console.log(col);

    // console.log("click");
    // board[row][col] = player;
    // setBoard((board) => [...board]);
  };

  const checkVictory = () => {
    let victory = false;
    for (let i = 0; i < Winner.length; i++) {
      const victoryItem = Winner[i];
      let isVictory = true;
      for (let j = 0; j < victoryItem.length; j++) {
        const item = victoryItem[j];
        if (board[Math.floor(item / 3)][item % 3] !== player) {
          isVictory = false;
          break;
        }
      }
      if (isVictory) {
        setListSquare(victoryItem);
        victory = true;
        console.log(victoryItem);
        break;
      }
    }
    return victory;
  };

  useEffect(() => {
    let counter = 0;
    board.forEach((boardItem, i) => {
      boardItem.forEach((_, index) => {
        if (board[i][index] === "") {
          counter++;
        }
      });
    });
    if (counter !== 9) {
      const isVictory = checkVictory();
      if (isVictory) {
        console.log("Winner" + player);
        setGameEnded(true);
      } else {
        if (counter === 0) {
          console.log("Hoa");
          setGameEnded(true);
        } else {
          player === "X" ? setPlayer("O") : setPlayer("X");
        }
      }
    }
  }, [board]);

  return (
    <div className="app">
      <div className="board">
        {board.map((boardItem, i) =>
          boardItem.map((item, index) => (
            <>
              {/* {console.log(i)} */}
              {/* {console.log(index)} */}
              <Square
                key={index}
                className={`square ${
                  listSquare.includes(i * 3 + index) ? "winner" : ""
                }`}
                value={board[i][index]}
                handleTick={() => playFn(i, index)}
              />
            </>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
