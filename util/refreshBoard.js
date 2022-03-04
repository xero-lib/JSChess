import { halfMoveCount } from "./makeMove.js";
import compboard from "../board/compboard.js";
import printBoard from "./printBoard.js";
import resetBoard from "./resetBoard.js";

export default function refreshBoard() {
  if (halfMoveCount >= 50) {
    console.log("Draw by 50 move rule.");
    alert("Draw by 50 move rule.");
    // printBoard();
    resetBoard();
  }
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (compboard[y][x].piece) {
        compboard[y][x].piece.location = [y, x];
        compboard[y][x].piece.coordinate = compboard[y][x].coordinate;
      }
    }
  }
}
