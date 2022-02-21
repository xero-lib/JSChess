import _ from "lodash";

import calcWatches from "./calcWatches.js";
import { turn } from "../util/makeMove.js";
import compboard from "../board/compboard.js";
import { King, Pawn } from "../data/classes.js";
import coordCompare from "../util/coordCompare.js";

//go through available offsets for a given piece
export default function calcChecks(piece, in_move = [0, 0]) {
  //check if each offset for a piece will result in a new watches variable for any opponent piece that will cause the king to be watched

  let tstart = _.cloneDeep(piece.location),
    tmove = _.cloneDeep(in_move),
    tempBoard = _.cloneDeep(compboard),
    tpiece = _.cloneDeep(piece),
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
  if (tempBoard[tmove[0]][tmove[1]].piece?.constructor == King) {
    return true;
  }
  //move requested piece to requested location on tempBoard
  tempBoard[tstart[0]][tstart[1]].piece = null;
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

export const filterChecks = () => {
  //iterate over every piece on the board and run it through this with move being every available offset.
  compboard.forEach((row, i) => {
    row.forEach((square, j) => {
      if (square.piece !== null) {
        //if a given offset would result in check, filter it
        compboard[i][j].piece.moves = square.piece.moves.filter((move) => {
          // console.log(square.piece, move);
          return !calcChecks(square.piece, move);
        });
      }
    });
  });
};
