import { Square } from "./Square";
import { players } from "../constants/constants";

export const Board = ({ board, updateBoard }) => {
  return <section className="board">
    {board.map((square_value, id) => {
      return <Square key={id} square_value={players[square_value]} id={id} updateBoard={updateBoard} />
    })}
  </section>
}