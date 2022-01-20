import move from "./move.js";
import printBoard from "./printBoard.js";
import coordToPiece from "./coordToPiece.js";
import refreshBoard from "./refreshBoard.js";
import coordToLocation from "./coordToLocation.js";

export let moveCount = 0;
export let turn = "Light";
export default function makeMove(start, end) {
  refreshBoard();
  if (coordToPiece(start).color == turn) {
    let ret = move(coordToLocation(start).piece, end);
    if (ret) {
      moveCount++;
      printBoard() 
      turn = turn == "Light" ? "Dark" : "Light";
      return ret;
    } else { console.log("Illegal move."); }
  } else { console.log(`It is not ${turn}'s turn.`); }
  printBoard();
  return false;
}

export function updateTurn(tcolor) {
  turn = tcolor.toLowerCase() == 'b' ? "Dark" : "Light";
} 