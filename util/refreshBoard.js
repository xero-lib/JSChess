import { halfMoveCount } from "./makeMove.js";
import calcMoves from "../calc/calcMoves.js";
import compboard from "../board/compboard.js";
import calcOffsets from "../calc/calcOffsets.js";
import calcWatches from "../calc/calcWatches.js";
import { filterChecks } from "../calc/calcChecks.js";
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
        let piece = compboard[y][x].piece;
        piece.offsets = calcOffsets(compboard[y][x].piece);
        piece.location = [y, x];
        piece.watches = calcWatches(piece, compboard);
        piece.coordinate = compboard[y][x].coordinate;
        piece.moves = calcMoves(compboard[y][x].piece);
      }
    }
  }
  filterChecks();
}
