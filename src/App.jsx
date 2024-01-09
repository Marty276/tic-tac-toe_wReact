import { useEffect, useState } from "react";
import { GameOverModal } from "./components/GameOverModal";
import { Board } from "./components/Board";
import { Scores } from "./components/Scores";
import { checkVictoryOrDraw } from "./tools/tools";
import "./styles.css";
import { players, winning_combos } from "./constants/constants";

export const App = () => {

  const [board, setBoard] = useState(()=>{
    const previous_board = window.localStorage.getItem("board");
    return previous_board ? JSON.parse(previous_board) : Array(9).fill(null);
  })
  const [scores, setScores] = useState(()=>{
    const previous_scores = window.localStorage.getItem("scores");
    return previous_scores ? JSON.parse(previous_scores) : { "x": 0, "o": 0};
  });
  const [gameResults, setGameResults] = useState(null);
  const initialFirstTurn = "x";
  const [turn, setTurn] = useState(()=>{
    const previous_turn = window.localStorage.getItem("turn");
    return previous_turn ? previous_turn : initialFirstTurn;
  });
  const [firstTurn, setFirstTurn] = useState(()=>{
    const previous_first_turn = window.localStorage.getItem("firstTurn");
    return previous_first_turn ? previous_first_turn : initialFirstTurn;
  });

  useEffect(()=>{
    if(gameResults){
      
      const newFirstTurn = firstTurn == "x" ? "o" : "x";
      
      setFirstTurn(newFirstTurn);
      setTurn(newFirstTurn)
      
      window.localStorage.setItem("firstTurn", newFirstTurn)
      window.localStorage.setItem("turn", newFirstTurn)
      window.localStorage.setItem("board", JSON.stringify(Array(9).fill(null)))

      if(gameResults !== "draw"){
        const newScores = { ...scores };
        newScores[gameResults] += 1;
        setScores(newScores);
        window.localStorage.setItem("scores", JSON.stringify(newScores))
      }
      
    }
  }, [gameResults])

  function startNewGame() {
    
    setBoard(Array(9).fill(null));
    setGameResults(null)

  }

  function resetScores() {
    setFirstTurn(initialFirstTurn);
    setScores({ "x": 0, "o": 0 });
    setBoard(Array(9).fill(null));
    setGameResults(null)
    setTurn(initialFirstTurn)

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("scores");
    window.localStorage.removeItem("firstTurn");
    window.localStorage.removeItem("turn");
  }

  function updateBoard(id) {
    if (!board[id]) {
      let newBoard = [...board]
      newBoard[id] = turn;
      const newTurn = turn == "x" ? "o" : "x";
      setBoard(newBoard);
      setTurn(newTurn)

      setGameResults(checkVictoryOrDraw(newBoard));
      
      window.localStorage.setItem("board", JSON.stringify(newBoard))
      window.localStorage.setItem("turn", newTurn)

    }
  }


  return <>


    <h1>Tic tac toe</h1>

    <Scores players={players} scores={scores} />

    <GameOverModal gameResults={gameResults} startNewGame={startNewGame} firstTurn={firstTurn} />

    <Board board={board} updateBoard={updateBoard}></Board>

    <section className="turns">
      <div className={turn == "x" ? "is_playing" : "is_not_playing"}>{players.x}</div>
      <div className={turn == "o" ? "is_playing" : "is_not_playing"}>{players.o}</div>
    </section>

    <button className="reset_scores" onClick={resetScores}>Reset scores</button>

    <footer>Developed by Marty B.</footer>
  </>
}
