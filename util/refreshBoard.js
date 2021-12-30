import calcOffsets from "../calc/calcOffsets.js";
import calcWatches from "../calc/calcWatches.js";
import { filterChecks } from "../calc/calcChecks.js";
import calcMoves from "../calc/calcMoves.js";
import compboard from "../board/compboard.js";

export default function refreshBoard() {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (compboard[y][x].piece) {
        let piece = compboard[y][x].piece;
        piece.location = [y, x];
        piece.offsets = calcOffsets(compboard[y][x].piece);
        piece.watches = calcWatches(
          piece,
          compboard
        );
        piece.coordinate = compboard[y][x].coordinate;
        piece.moves = calcMoves(compboard[y][x].piece);
      }
    }
  }
  filterChecks();
}
