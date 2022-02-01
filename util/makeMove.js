import move from "./move.js";
import printBoard from "./printBoard.js";
import coordToPiece from "./coordToPiece.js";
import refreshBoard from "./refreshBoard.js";
import coordToLocation from "./coordToLocation.js";
import { Pawn } from "../data/classes.js";

export let moveCount = 0;
export let halfMoveCount = 0;
export let turn = "Light";
export default function makeMove(start, end) {
  refreshBoard();
  if (coordToPiece(start)?.color == turn) {
    let mcountReset = coordToPiece(end) != false || coordToPiece(start)?.constructor == Pawn;
    let ret = move(coordToLocation(start).piece, end);
    if (ret) {
      moveCount++;
      printBoard() 
      turn = turn == "Light" ? "Dark" : "Light";
      if (mcountReset) {
        updateHalfMove(0);
      }
      return ret;
    } else { console.log("Illegal move."); }
  } else { console.log(`It is not ${turn}'s turn.`); }
  printBoard();
  return false;
}

export function updateTurn(tcolor) {
  turn = tcolor.toLowerCase() == 'b' ? "Dark" : "Light";
} 

export function updateHalfMove(hmove) {
  halfMoveCount = parseInt(hmove);
}

export function updateMoveCount(mcount) {
  moveCount = parseInt(mcount);
}