import alphaToCoord from "./alphaToCoord.js";
import compboard from "../board/compboard.js";

export default function (coord, board = compboard) {
  let atc = alphaToCoord(coord);
  if (atc) { return board[atc[0]][atc[1]].piece; }
  else { return false; }
}
