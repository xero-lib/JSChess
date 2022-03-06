import files from "./files.js";
import pieces from "../data/pieces.js";
import colorboard from "./colorboard.js";
import coordCompare from "../util/coordCompare.js";

let compboard = new Array(8);
for (let x = 0; x < 8; x++) { compboard[x] = new Array(8); }

export function initBoard() {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      compboard[y][x] = {
        piece: null,
        color: colorboard[y][x],
        coordinate: `${files[x]}${y + 1}`,
        location: [y, x],
      };
    }
  }

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      pieces.dark.forEach((piece) => {
        if (coordCompare(piece.defaultPos, [y, x])) {
          compboard[y][x].piece = piece;
          if (piece.symbol.toLowerCase() === 'p') {
            compboard[y][x].piece.hasMoved = false;
          }
        } else {
          piece.defaultPos.forEach((coord) => {
            if (coordCompare([coord[0], coord[1]], [y, x])) {
              compboard[y][x].piece = piece;
              if (piece.symbol.toLowerCase() === 'p') {
                compboard[y][x].piece.hasMoved = false;
              }
            }
          });
        }
      });

      pieces.light.forEach((piece) => {
        if (coordCompare(piece.defaultPos, [y, x])) {
          compboard[y][x].piece = piece;
          if (piece.symbol.toLowerCase() === 'p') {
            compboard[y][x].piece.hasMoved = false;
          }
        } else {
          piece.defaultPos.forEach((coord) => {
            if (coordCompare([coord[0], coord[1]], [y, x])) {
              compboard[y][x].piece = piece;
              if (piece.symbol.toLowerCase() === 'p') {
                compboard[y][x].piece.hasMoved = false;
              }
            }
          });
        }
      });
    }
  }
}

initBoard();
export default compboard;
