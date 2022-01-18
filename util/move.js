import calcMoves from "../calc/calcMoves.js";
import alphaToCoord from "./alphaToCoord.js";
import coordCompare from "./coordCompare.js";
import compboard from "../board/compboard.js";
import { Pawn, King, Rook } from "../data/classes.js";
import _ from "lodash";

export default function move(piece, destination) {
  let availableMoves = calcMoves(piece);
  let atc = alphaToCoord(destination);
  let valid;

  availableMoves.forEach((move) => {
    if (coordCompare(move, atc)) { valid = true; }
  });

  if (atc && valid) {
    compboard[atc[0]][atc[1]].piece = piece;
    if ([Pawn, King, Rook].includes(compboard[atc[0]][atc[1]].piece.constructor)) {
      let offset = Number.parseInt(destination.split('')[1]) - atc[0];
      if (compboard[atc[0]][atc[1]].piece.constructor === Pawn) {
        // console.log(destination, compboard[atc[0]][atc[1]].piece.location)
        (
          compboard[atc[0]][atc[1]].piece.hasMoved === false &&
          [-1, 1].includes(offset)
        )
          ? compboard[atc[0]][atc[1]].piece.isEnPassantable = true
          : compboard[atc[0]][atc[1]].piece.isEnPassantable = false;
      }
      compboard[atc[0]][atc[1]].piece.hasMoved = true;
      if (compboard[atc[0]][atc[1]].piece.constructor === King) {
        if (offset > 1) { // set king side rook
          let rook = _.cloneDeep(compboard[piece.color == "Dark" ? 7 : 0][7].piece);
          compboard[piece.color == "Dark" ? 7 : 0][7].piece = null;
          compboard[piece.color == "Dark" ? 7 : 0][5] = rook;
        } else if (offset < -1) {
          let rook = _.cloneDeep(compboard[piece.color == "Dark" ? 7 : 0][0].piece);
          compboard[piece.color == "Dark" ? 7 : 0][0].piece = null;
          compboard[piece.color == "Dark" ? 7 : 0][3].piece = rook;
        }
      }
    }
    compboard[piece.location[0]][piece.location[1]].piece = null;
    piece.location = [atc[0], atc[1]];
    // console.log(move, piece.location);
    return true;
  }
  return false;
}
