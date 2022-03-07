import move from "./move.js";
// import printBoard from "./printBoard.js";
import coordToPiece from "./coordToPiece.js";
import refreshBoard from "./refreshBoard.js";
import coordToLocation from "./coordToLocation.js";
import alphaToCoord from "./alphaToCoord.js";
import persist from "./persist.js";
import getWatches from "./getAllWatches.js";
import getPly from "./getPly.js";
import compboard from "../board/compboard.js";
import coordCompare from "./coordCompare.js";
import getMoves from "./getAllMoves.js"

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
        updateHalfMove(halfMoveCount + 1);
      }

      /* spec conditions */
      let isLight = getPly() === "Dark"; //inverted because move has already been made
      let opposingWatches = getWatches((isLight ? "Light" : "Dark")); //inverted because move has already been made
      let opposingMoves = getMoves((isLight ? "Dark" : "Light"));
      let shouldRet = false;
      console.log(opposingWatches)

      let 
        dKingPos,
        lKingPos;
        

      compboard.forEach((row, y) => row.forEach((square, x) => {
        if (square.piece && square.piece.symbol.toLowerCase() === 'k') {
          square.piece.color === "Dark"
            ? (dKingPos = [y, x])
            : (lKingPos = [y, x]);
        }
      }));

      //check
        //if watches land on opposing king but opponent still has moves, return 1
        opposingWatches.forEach((watch) => {
          if (coordCompare(watch, (isLight ? dKingPos : lKingPos)) && opposingMoves.length !== 0) {
            console.log("check!");
            shouldRet = true;
          }
        });
        if (shouldRet) { return 1; }
      //checkmate
        //if watches land on opposing king and opponent has no moves, return 2
        opposingWatches.forEach((watch) => {
          if (coordCompare(watch, (isLight ? dKingPos : lKingPos)) && opposingMoves.length === 0) {
            console.log("checkmate!");
            shouldRet = true;
          }
        });
        if (shouldRet) { return 2; }
      //draw
        //if watches do not land on opposing king and opponent has no moves, return 3
        let isCheck = false;
        for (let watch of opposingWatches) {
          if (coordCompare(watch, (isLight ? dKingPos : lKingPos))) {
            isCheck = true;
            break;
          }
        };
        if (!isCheck && opposingMoves.length === 0) {
          console.log("Draw by stalemate!");
          return 3;
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
