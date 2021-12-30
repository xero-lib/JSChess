import calcMoves from "../calc/calcMoves.js";
import alphaToCoord from "./alphaToCoord.js";
import compboard from "../board/compboard.js";
import coordCompare from "./coordCompare.js";

export default function move(piece, destination) {
  let availableMoves = calcMoves(piece);
  let atc = alphaToCoord(destination);
  let valid;
  availableMoves.forEach((move) => {
    if (coordCompare(move, atc)) { valid = true; }
  });
  // console.log("Moves:", piece.moves);

  if (atc && valid) {
    compboard[atc[0]][atc[1]].piece = piece;
    compboard[atc[0]][atc[1]].piece.hasMoved = true;
    compboard[piece.location[0]][piece.location[1]].piece = null;
    piece.location = move;
    return true;
  }

  if (
    destination[0] >= 0 &&
    destination[0] <= 7 &&
    destination[1] >= 0 &&
    destination[1] <= 7 &&
    availableMoves.includes(destination)
  ) {
    compboard[mtc[0]][mtc[1]].piece = piece;
    compboard[piece.location[0]][piece.location[1]].piece = null;
    piece.location = destination;
    return true;
  }
  return false;
}
