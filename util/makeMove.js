import printBoard from "./printBoard.js";
import move from "./move.js";
import coordToLocation from "./coordToLocation.js";

let moveCount = 0;

export default function makeMove(start, end) {
    let ret = move(coordToLocation(start).piece, end);
    if (ret) {
      moveCount++;
      console.log("Move", moveCount);
      printBoard();
      console.log();
      return ret;
    } else {
      console.log("Illegal move.");
      printBoard();
      return false;
    }
  };