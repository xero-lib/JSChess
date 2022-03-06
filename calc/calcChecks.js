import compboard from "../board/compboard.js";
import coordCompare from "../util/coordCompare.js";
import persist from "../util/persist.js";
import getAllWatches from "../util/getAllWatches.js";
import getPly from "../util/getPly.js";

/**
 * @param { Pawn | Rook | Knight | Bishop | King | Queen } piece
 * @param { [Number, Number] } in_move
 * @param { [Number, Number] } location
 */
export default function calcChecks(piece, in_move = [0, 0], location) {
  let
    tempBoard = persist(compboard),
    tpiece    = persist(piece),
    dKingPos,
    lKingPos;

  /*
    make move on temp board : done
    generate opposing watches for pieces on temp board
    check if any watches from artificial move land on the current colors king
    return if self check occurs
  */

    /* ISSUES

    */
   
  /* GENERATE MOVE */
  if (piece.symbol.toLowerCase() === 'p' && piece.location[1] !== in_move[1] && tempBoard[in_move[0]][in_move[1]].piece === null) {
    if (location[1] !== 7 && tempBoard[location[0]][location[1]+1].piece?.isEnPassantable && tempBoard[location[0]][location[1]+1].piece?.color !== piece.color) {
      tempBoard[location[0]][location[1]+1].piece = null;
    } else if (location[1] !== 0 && tempBoard[location[0]][location[1]-1]?.piece?.isEnPassantable  && tempBoard[location[0]][location[1]-1].piece?.color !== piece.color) {
      tempBoard[location[0]][location[1]-1].piece = null;
    }
  }

  tempBoard[location[0]][location[1]].piece = null;
  tempBoard[in_move[0]][in_move[1]].piece = tpiece;
  
  /* FIND KING POSITIONS */
  tempBoard.forEach((row, y) => row.forEach((square, x) => {
    if (square.piece && square.piece.symbol.toLowerCase() === 'k') {
      square.piece.color === "Dark"
        ? (dKingPos = [y, x])
        : (lKingPos = [y, x]);
    }
  }));

  let board_buff = []
  tempBoard.forEach((row) => {
    let rbuf = [];
    row.forEach((square) => {
      if (square.piece) {
        rbuf.push(square.piece.symbol);
      } else {
        rbuf.push(square.color);
      }
    })
    board_buff.push(rbuf);
  })
  /* GENERATE WATCHES */
  let opposingWatches = getAllWatches((getPly() === "Dark" ? "Light" : "Dark"), tempBoard);
  
  /* CALC CHECK */
  let isCheck = false;
  let kingPos = piece.color === "Dark" ? dKingPos : lKingPos;
  opposingWatches.forEach((watch) => {
    if (coordCompare(kingPos, watch)) {
      isCheck = true;
    }
  });

  /* RETURN IF GIVEN MOVE RESULTS IN SELF CHECK */
  return isCheck;
}

/**
 * @param { Pawn | Rook | Knight | Bishop | King | Queen } piece
 * @param { [[number, number]]} possibleOffsets
 * @returns { boolean } isCheck
 */
export function filterChecks(piece, possibleOffsets, [y_ax, x_ax]) {
  if (possibleOffsets.length === 0) { return; }
  return possibleOffsets.filter((offset) => {
    // console.log(offset);
    return !calcChecks(piece, [offset[0]+y_ax, offset[1]+x_ax], [y_ax, x_ax]);
  });
}