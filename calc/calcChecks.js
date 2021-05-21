import _ from "lodash";
import compboard from "../board/compboard.js";
import calcMoves from "./calcMoves.js";
import refreshBoard from "../util/refreshBoard.js";
import { Pawn } from "../data/classes.js";
import calcWatches from "./calcWatches.js";
import alphaToCoord from "../util/alphaToCoord.js";

//go through available offsets for a given piece
export default function possibleWatches(piece, move) {
    refreshBoard();
    
    //check if each offset for a piece will result in a new watches variable for any opponent piece that will cause the king to be watched
    
    let tmove       = _.cloneDeep(alphaToCoord(move));
    let tempBoard   = _.cloneDeep(compboard);
    let tpiece      = _.cloneDeep(piece);

    //move requested piece to requested location on tempBoard
    tempBoard[tpiece.location[0]][tpiece.location[1]].piece = null;
    tempBoard[tmove[0]][tmove[1]].piece = tpiece;
    tpiece.location = tmove;
    //calc watches for that tempBoard
    let twatches = calcWatches(tpiece, tempBoard);
    
    tempBoard.forEach(row => {
        row.forEach((square) => {
          if(square.piece !== null) { //! Also needs to add own pieces to disallow king capturing a piece that is watched
            if(square.piece.constructor == Pawn) {
              square.piece.watches = [];
              calcWatches(square.piece, compboard).forEach((segment) => {
                if(segment && segment[0] && segment[0].length > 1) {
                  segment.forEach((subSegment) => {
                    square.piece.watches.push(subSegment)
                  })
                } else if(segment) {
                  square.piece.watches.push(segment)
                }
              });
            } else {
              square.piece.watches = calcWatches(square.piece, compboard);
            }
          }
        })
      })
    //check if watches hit king

}

//iterate over every piece on the board and run it through this with move being every available offset. 
//if a given offset would result in check, filter it