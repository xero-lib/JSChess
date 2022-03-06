import move from "./move.js";
// import printBoard from "./printBoard.js";
import coordToPiece from "./coordToPiece.js";
import refreshBoard from "./refreshBoard.js";
import coordToLocation from "./coordToLocation.js";
import alphaToCoord from "./alphaToCoord.js";
import persist from "./persist.js";

export let moveCount = 0;
export let halfMoveCount = 0;
export let turn = "Light";

export function getTurn() {
  return turn;
}
export default function makeMove(start, end, promote = "q") {
  refreshBoard();
  if (!alphaToCoord(start) || !alphaToCoord(end)) {
    return -3;
  }

  if (!coordToLocation(start).piece) {
    return -1;
  }

  if (coordToPiece(start).color === turn) {
    let piece = persist(coordToPiece(start));
    let isTaking = persist(coordToPiece(end));
    let ret = move(coordToLocation(start).piece, end, promote);
    if (ret) {
      if (turn === "Dark") {
        updateMoveCount(moveCount + 1);
      }
      // printBoard();
      turn = turn === "Light" ? "Dark" : "Light";
      if (isTaking || piece.symbol.toLowerCase() === 'p') {
        updateHalfMove(0);
      } else {
        console.log(halfMoveCount);
        updateHalfMove(halfMoveCount + 1);
      }
      return ret;
    } else {
      console.log("Illegal move.");
      // printBoard();
      return -1;
    }
  } else {
    console.log(`It is not this colors turn.`);
    // printBoard();
    return -2;
  }
}

export function updateTurn(tcolor) {
  turn = tcolor.toLowerCase() === "b" ? "Dark" : "Light";
}

export function updateHalfMove(hmove) {
  halfMoveCount = parseInt(hmove);
}

export function updateMoveCount(mcount) {
  moveCount = parseInt(mcount);
}
