import pieces from "../data/pieces.js";
import compboard from "../board/compboard.js";
import coordCompare from "./coordCompare.js";
import clearBoard from "./clearBoard.js";

export default function () {
  clearBoard();
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      pieces.dark.forEach((piece) => {
        if (coordCompare(piece.defaultPos, [y, x])) {
          compboard[y][x].piece = piece;
        }
      });

      pieces.light.forEach((piece) => {
        if (coordCompare(piece.defaultPos, [y, x])) {
          compboard[y][x].piece = piece;
        }
      });
    }
  }
}
