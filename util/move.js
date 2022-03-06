import persist      from "./persist.js";
import alphaToCoord from "./alphaToCoord.js";
import coordCompare from "./coordCompare.js";
import calcMoves    from "../calc/calcMoves.js";
import compboard    from "../board/compboard.js";

import { Queen, Rook, Bishop, Knight } from "../data/classes.js";
import { moveCount, updateHalfMove, updateMoveCount } from "./makeMove.js";

export default function move(piece, destination, promote) {
  let availableMoves = calcMoves(piece);
  let atc = alphaToCoord(destination);
  let valid;

  availableMoves.forEach((move) => {
    if (coordCompare(move, atc)) {
      valid = true;
    }
  });

  if (atc && valid) {
    if (piece.symbol.toLowerCase() === 'p' && [0, 7].includes(atc[0])) {
      let Piece;
      switch(promote) {
        case('q'): Piece = Queen; break;
        case('r'): Piece = Rook;  break;
        case('b'): Piece = Bishop;break;
        case('n'): Piece = Knight;break;
        default:
          Piece = Queen
      }

      compboard[atc[0]][atc[1]].piece = new Piece(piece.color);
      compboard[piece.location[0]][piece.location[1]].piece = null;
      updateHalfMove(0);
      updateMoveCount(moveCount + 1);
      return true;
    }

    if (['p', 'k', 'r'].includes(piece.symbol.toLowerCase())) {
      let offset = atc[1] - piece.location[1];
      if (piece.symbol.toLowerCase() === 'p') {
        piece.hasMoved === false && Math.abs(atc[0] - piece.location[0]) === 2
          ? (piece.isEnPassantable = true)
          : (piece.isEnPassantable = false);
      }

      piece.hasMoved = true;
      if (piece.symbol.toLowerCase() === 'k') {
        let y = piece.color === "Dark" ? 7 : 0;
        if (offset > 1) {
          // set king side rook
          compboard[y][5].piece = persist(compboard[y][7].piece);
          compboard[y][7].piece = null;
        } else if (offset < -1) {
          compboard[y][3].piece = persist(compboard[y][0].piece);
          compboard[y][0].piece = null;
        }
      }
    }

    if (piece.symbol.toLowerCase() === 'p' && compboard[atc[0]][atc[1]].piece == null) {
      compboard[piece.location[0]][atc[1]].piece = null;
    }

    compboard[atc[0]][atc[1]].piece = piece;
    compboard[piece.location[0]][piece.location[1]].piece = null;
    piece.location = [atc[0], atc[1]];
    return true;
  }
  return false;
}
