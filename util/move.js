import _ from "lodash";
import calcMoves from "../calc/calcMoves.js";
import alphaToCoord from "./alphaToCoord.js";
import coordCompare from "./coordCompare.js";
import compboard from "../board/compboard.js";
import { Pawn, King, Rook } from "../data/classes.js";

export default function move(piece, destination) {
  let availableMoves = calcMoves(piece);
  let atc = alphaToCoord(destination);
  let valid;

  availableMoves.forEach((move) => {
    if (coordCompare(move, atc)) {
      valid = true;
    }
  });

  if (atc && valid) {
    if ([Pawn, King, Rook].includes(piece.constructor)) {
      let offset = atc[1] - piece.location[1];
      if (piece.constructor === Pawn) {
        piece.hasMoved === false && Math.abs(atc[0] - piece.location[0]) == 2
          ? (piece.isEnPassantable = true)
          : (piece.isEnPassantable = false);
      }

      piece.hasMoved = true;
      if (piece.constructor === King) {
        let y = piece.color == "Dark" ? 7 : 0;
        if (offset > 1) {
          // set king side rook
          compboard[y][5].piece = _.cloneDeep(compboard[y][7].piece);
          compboard[y][7].piece = null;
        } else if (offset < -1) {
          compboard[y][3].piece = _.cloneDeep(compboard[y][0].piece);
          compboard[y][0].piece = null;
        }
      }
    }

    if (piece.constructor === Pawn && compboard[atc[0]][atc[1]].piece == null) {
      compboard[piece.location[0]][atc[1]].piece = null;
    }

    compboard[atc[0]][atc[1]].piece = piece;
    compboard[piece.location[0]][piece.location[1]].piece = null;
    piece.location = [atc[0], atc[1]];
    return true;
  }
  return false;
}
