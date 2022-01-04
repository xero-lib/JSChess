import move from "./move.js";
import printBoard from "./printBoard.js";
import coordToPiece from "./coordToPiece.js";
import refreshBoard from "./refreshBoard.js";
import coordToLocation from "./coordToLocation.js";

export let moveCount = 0;
export let turn = "Light";
export default function makeMove(start, end) {
  refreshBoard();

  if (coordToPiece(start)?.color == turn) {
    let ret = move(coordToLocation(start).piece, end);
    if (ret) {
      moveCount++;
      turn = (moveCount !== 0 && moveCount % 2 !== 0) ? "Dark" : "Light";
      printBoard()
      return ret;
    } else { console.log("Illegal move."); }
  } else { console.log("It is not this color's turn."); }
  printBoard();
  return false;
}
