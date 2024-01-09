import { players } from "../constants/constants";
export const GameOverModal = ({ gameResults, startNewGame, firstTurn }) => {
  function handleClick() {
    startNewGame(gameResults)
  }

  if (gameResults == null) {
    return
  }

  return <section className="game_over_screen">
    <header>Game Over</header>

    <h2>{gameResults !== "draw" ? players[gameResults] + " wins!" : "It is a draw!"}</h2>

    <button onClick={handleClick}>New Game</button>
  </section>
}
