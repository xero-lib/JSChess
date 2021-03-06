import alphaToCoord from "./alphaToCoord.js";
import compboard from "../board/compboard.js";

export default function coordToPiece(coord, board = compboard) {
  if (!coord) { return undefined }
  let atc = alphaToCoord(coord);
  return atc ? board[atc[0]][atc[1]].piece : false;
}
