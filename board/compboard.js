import files from "./files.js";
import pieces from "../data/pieces.js";
import colorboard from "./colorboard.js";
import coordCompare from "../util/coordCompare.js";

let compboard = new Array(8);
for (let x = 0; x < 8; x++) compboard[x] = new Array(8);

for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
    compboard[y][x] = {
      piece: null,
      color: colorboard[y][x],
      coordinate: `${files[x]}${y + 1}`,
    };
  }
}

for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
    pieces.dark.forEach((piece) => {
      if (coordCompare(piece.defaultPos, [y, x])) {
        compboard[y][x].piece = piece;
      } else {
        piece.defaultPos.forEach((coord) => {
          if (coordCompare([coord[0], coord[1]], [y, x])) {
            compboard[y][x].piece = piece;
          }
        });
      }
    });

    pieces.light.forEach((piece) => {
      if (coordCompare(piece.defaultPos, [y, x])) {
        compboard[y][x].piece = piece;
      } else {
        piece.defaultPos.forEach((coord) => {
          if (coordCompare([coord[0], coord[1]], [y, x])) {
            compboard[y][x].piece = piece;
          }
        });
      }
    });
  }
}

export default compboard;
