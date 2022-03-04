import _ from "lodash";

import calcWatches from "./calcWatches.js";
import { turn } from "../util/makeMove.js";
import compboard from "../board/compboard.js";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "../data/classes.js";
import coordCompare from "../util/coordCompare.js";
import persist from "../util/persist.js";
import { of } from "rxjs";

//go through available offsets for a given piece
export default function calcChecks(piece, in_move = [0, 0]) {
  //check if each offset for a piece will result in a new watches variable for any opponent piece that will cause the king to be watched
  let tstart = _.cloneDeep(piece.location),
    tmove = _.cloneDeep(in_move),
    tempBoard = persist(compboard),
    tpiece = _.cloneDeep(piece),
    twatches = calcWatches(piece, compboard),
    dKingPos,
    lKingPos;

  compboard.forEach((row, y) => {
    row.forEach((square, x) => {
      if (square.piece && square.piece.constructor === King) {
        square.piece.color == "Dark"
          ? (dKingPos = [y, x])
          : (lKingPos = [y, x]);
      }
    });
  });

  // dKingPos = dKingPos ? dKingPos : {
  //   compboard
  // }

  /* GENERATE MOVE */
 
  //move requested piece to requested location on tempBoard
  tempBoard[tstart[0]][tstart[1]].piece = null;
  console.log(1, tmove)
  tempBoard[tmove[0]][tmove[1]].piece = tpiece;
  tpiece.location = tmove;

  if (tpiece.constructor === King) {
    if (tpiece.color == "Dark") {
      dKingPos = tmove ? tmove : dKingPos;
    } else {
      lKingPos = tmove ? tmove : lKingPos;
    }
  }

  //calc watches for that tempBoard
  tempBoard.forEach((row, i) => {
    row.forEach((square, j) => {
      if (square.piece !== null) {
        if (square.piece.constructor === Pawn) {
          tempBoard[i][j].piece.watches = _.cloneDeep([
            ...calcWatches(square.piece),
          ]);
        } else {
          // console.log("sp", calcWatches(square.piece, compboard))
          tempBoard[i][j].piece.watches = calcWatches(square.piece, tempBoard);
        }
      }
    });
  });

  /* CALC CHECKS FOR AFTER ARTIFICIAL MOVE */

  //check if watches hit same color king
  let isCheck = false;
  tempBoard.forEach((row) => {
    row.forEach((square) => {
      //for each square on the tempBoard
      if (square.piece !== null && square.piece.color !== turn) {
        //if there's a piece on that square
        // console.log(square.piece);
        if (Array.isArray(square.piece.watches[0])) {
          //if watches contains multiple items
          isCheck = square.piece.watches.some((move) => {
            return move != null
              ? coordCompare(move, turn == "Dark" ? dKingPos : lKingPos)
              : null;
          });
        } else {
          isCheck =
            (coordCompare(square.piece.watches, dKingPos) && turn == "Dark") ||
            (coordCompare(square.piece.watches, lKingPos) && turn == "Light");
        }
      }
    });
  });

  return isCheck;
}

// /**
//  * @param { Pawn | Rook | Knight | Bishop | King | Queen } piece
//  * @param { [Number, Number] } in_move
//  */
// export default function calcChecks(piece, in_move = [0, 0]) {
//   console.log()
// }

// export const filterChecks = () => {
//   //iterate over every piece on the board and run it through this with move being every available offset.
//   compboard.forEach((row, i) => {
//     row.forEach((square, j) => {
//       if (square.piece !== null) {
//         //if a given offset would result in check, filter it
//         compboard[i][j].piece.moves = square.piece.moves.filter((move) => {
//           console.log(square.piece, move);
//           return !calcChecks(square.piece, move);
//         });
//       }
//     });
//   });
// };

/**
 * @param { Pawn | Rook | Knight | Bishop | King | Queen } piece
 * @param { [[number, number]]} possibleOffsets
 * @returns { boolean } isCheck
 */
export function filterChecks(piece, possibleOffsets, [y_ax, x_ax]) {
  if (possibleOffsets.length === 0) { return; }
  console.log(possibleOffsets);
  return possibleOffsets.map((offset) => [offset[0]+y_ax, offset[1]+x_ax]).filter((offset) => {
    if (!isNaN(offset[0])) {
      return calcChecks(piece, offset);
    }
  });
}