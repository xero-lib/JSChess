import _ from "lodash";
import compboard from "../board/compboard.js";
import calcMoves from "./calcMoves.js";
import refreshBoard from "../util/refreshBoard.js";
import { King, Pawn } from "../data/classes.js";
import calcWatches from "./calcWatches.js";
import alphaToCoord from "../util/alphaToCoord.js";

//go through available offsets for a given piece
export default function possibleWatches(piece, move) {
    refreshBoard();
    
    //check if each offset for a piece will result in a new watches variable for any opponent piece that will cause the king to be watched
    
    let tmove       = _.cloneDeep(alphaToCoord(move));
    let tempBoard   = _.cloneDeep(compboard);
    let tpiece      = _.cloneDeep(piece);
    let checks      = [];
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

    //get king position after move
    tempBoard.forEach((row) => row.forEach((square) => {
      if(square.piece !== null && square.piece.constructor === King) {
        if(square.piece.color.toLowerCase() == "dark" ) dKingPos = square.piece.location;
        if(square.piece.color.toLowerCase() == "light") lKingPos = square.piece.location;
      }
    }))

    //check if watches hit king, and if so, push to checks the color of king checked
    tempBoard.forEach((row) => row.forEach((square) => {
      if(square.piece !== null) { //! pawns?
        if(typeof square.piece.watches[0] == "object") {
          if(square.piece.watches.includes(lKingPos)) checks.push('l'); //L 
          if(square.piece.watches.includes(dKingPos)) checks.push('d'); //D
        }
        else {
          if(square.piece.watches == lKingPos) checks.push('l'); //L
          if(square.piece.watches == dKingPos) checks.push('d'); //D
        }
      }
    }))
}

//iterate over every piece on the board and run it through this with move being every available offset.
//if a given offset would result in check, filter it