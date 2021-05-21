import _ from "lodash";
import compboard from "../board/compboard.js";
import calcMoves from "./calcMoves.js";
import refreshBoard from "../util/refreshBoard.js";
import { Pawn } from "../data/classes.js";
import calcWatches from "./calcWatches.js";
import alphaToCoord from "../util/alphaToCoord.js";

//go through available offsets for a given piece
export default function(piece, move) {
    refreshBoard();
    
    //check if each offset for a piece will result in a new watches variable for any opponent piece that will cause the king to be watched
    
    let tmove       = _.cloneDeep(alphaToCoord(move));
    let tempBoard   = _.cloneDeep(compboard);
    let tpiece      = _.cloneDeep(piece);

    //move requested piece to requested location on tempBoard
    tempBoard[tpiece.location[0]][tpiece.location[1]] = null;
    tempBoard[tmove[0]][tmove[1]] = tpiece;
    tpiece.location = tmove;
    // console.log(tempBoard)
    let twatches = calcWatches(tpiece, tempBoard);
    console.log(twatches); //attempting to discover why this is an empty array
    //possible causes:
    //// external functions using different board
    //calcWatches using current board offsets instead of tempBoard offsets? //?doubtful because initial check is still using current offsets
    //calc watches for that tempBoard
    //check if watches hit king

}

//iterate over every piece on the board and run it through this with move being every available offset. 
//if a given offset would result in check, filter it