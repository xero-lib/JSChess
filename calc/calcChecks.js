import _              from "lodash"                 ;
import compboard      from "../board/compboard.js"  ;
import turn           from "../util/makeMove.js"    ;
import refreshBoard   from "../util/refreshBoard.js";
import { King, Pawn } from "../data/classes.js"     ;
import calcWatches    from "./calcWatches.js"       ;
import alphaToCoord   from "../util/alphaToCoord.js";

//go through available offsets for a given piece
export default function possibleWatches(piece, move) {
    refreshBoard();
    
    //check if each offset for a piece will result in a new watches variable for any opponent piece that will cause the king to be watched
    
    let tmove       = _.cloneDeep(alphaToCoord(move));
    let tempBoard   = _.cloneDeep(compboard         );
    let tpiece      = _.cloneDeep(piece             );
    let checks      = [];
    let badWatches  = [];
    let lKingPos;
    let dKingPos;

    //move requested piece to requested location on tempBoard
    tempBoard[tpiece.location[0]][tpiece.location[1]].piece = null;
    tempBoard[tmove[0]][tmove[1]].piece = tpiece;
    tpiece.location = tmove;

    //calc watches for that tempBoard
    tempBoard.forEach((row) => row.forEach((square) => {
      if(square.piece !== null) {
        if(square.piece.constructor === Pawn) square.piece.watches = _.cloneDeep([...calcWatches(square.piece)]);
        else square.piece.watches = calcWatches(square.piece, tempBoard);
      }
    }))

    //get king position after move //! Can skip if king didn't move
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
        if(typeof square.piece.watches[0] == "object") {
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

//iterate over every piece on the board and run it through this with move being every available offset.
compboard.forEach((row) => row.forEach((square) => {
  if(square.piece !== null) {
    if(square.piece.constructor == Pawn) { //! complete pawn

    } else square.piece.watches = square.piece.watches.filter((move) => possibleWatches(square.piece, move));
  }
}))
//if a given offset would result in check, filter it