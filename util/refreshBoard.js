import { halfMoveCount } from "./makeMove.js";
import calcMoves from "../calc/calcMoves.js";
import compboard from "../board/compboard.js";
import calcOffsets from "../calc/calcOffsets.js";
import calcWatches from "../calc/calcWatches.js";
import printBoard from "./printBoard.js";

export default function refreshBoard() {
  if (halfMoveCount >= 50) {
    console.log("Draw by 50 move rule.");
    printBoard();
    process.exit(0);
  }
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (compboard[y][x].piece) {
        // compboard[y][x].piece.watches = calcWatches(compboard[y][x].piece, compboard);
        compboard[y][x].piece.offsets = calcOffsets(compboard[y][x].piece);
        compboard[y][x].piece.location = [y, x];
        compboard[y][x].piece.coordinate = compboard[y][x].coordinate;
        // compboard[y][x].piece.moves = calcMoves(compboard[y][x].piece);
      }
    }
  }
}
