import _              from "lodash"                 ;
import compboard      from "../board/compboard.js"  ;
import turn           from "../util/makeMove.js"    ;
import { King, Pawn } from "../data/classes.js"     ;
import calcWatches    from "./calcWatches.js"       ;

//go through available offsets for a given piece
export default function calcChecks(piece, move) {    
    //check if each offset for a piece will result in a new watches variable for any opponent piece that will cause the king to be watched
    
    let 
        tstart      = _.cloneDeep(piece.location),
        tmove       = _.cloneDeep(move     ),
        tempBoard   = _.cloneDeep(compboard),
        tpiece      = _.cloneDeep(piece    ),
        checks      = [],
        badWatches  = [],
        lKingPos,
        dKingPos;

    //move requested piece to requested location on tempBoard
    tempBoard[tstart[0]][tstart[1]].piece = null;
    tempBoard[tmove[0]][tmove[1]].piece = tpiece;
    tpiece.location = tmove;

    //calc watches for that tempBoard
    tempBoard.forEach((row, i) => row.forEach((square, j) => {
      if(square.piece !== null) {
        if(square.piece.constructor === Pawn) tempBoard[i][j].piece.watches = _.cloneDeep([...calcWatches(square.piece)]);
        else tempBoard[i][j].piece.watches = calcWatches(square.piece, tempBoard);
      }
    }))

    //get king position after move
    tempBoard.forEach((row) => row.forEach((square) => {
      if(square.piece !== null && square.piece.constructor === King) {
        if(square.piece.color.toLowerCase() == "dark" ) dKingPos = square.piece.location;
        if(square.piece.color.toLowerCase() == "light") lKingPos = square.piece.location;
      }
    }))

    //check if watches hit same color king, return false
    tempBoard.forEach((row) => row.forEach((square) => {
      if(square.piece !== null) {
        if(square.piece.constructor == Pawn) { //! complete pawn

        }
        if(Array.isArray(square.piece.watches[0])) {
          if(square.piece.watches.includes(dKingPos) && turn.toLowerCase() == "dark" ) return false;
          if(square.piece.watches.includes(lKingPos) && turn.toLowerCase() == "light") return false;
        }
        else {
          if(square.piece.watches == dKingPos && turn.toLowerCase() == "dark" ) return false;
          if(square.piece.watches == lKingPos && turn.toLowerCase() == "light") return false;
        }
      }
    }))
    //else
    return true;
}

export const filterChecks = () => {
  //iterate over every piece on the board and run it through this with move being every available offset.
  compboard.forEach((row, i) => row.forEach((square, j) => {
    if(square.piece !== null) {
      compboard[i][j].piece.watches = square.piece.watches.filter((move) => calcChecks(square.piece, move));
    }
  }))
  //if a given offset would result in check, filter it
}