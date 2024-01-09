import { winning_combos } from "../constants/constants";

export function checkVictoryOrDraw(newBoard) {
  for (let combo in winning_combos) {
    const [a, b, c] = winning_combos[combo];
    if (newBoard[a] != null && newBoard[a] == newBoard[b] && newBoard[a] == newBoard[c]) {

      return newBoard[a]
    }
  }

  if (!newBoard.includes(null)) {  
    return "draw"
  }

}