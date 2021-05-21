import _ from "lodash";
import compboard from "../board/compboard.js";
import calcMoves from "./calcMoves.js";
import refreshBoard from "../util/refreshBoard.js";
import { Pawn } from "../data/classes.js";
import calcWatches from "./calcWatches.js";

//go through available offsets for each piece of a side and remove any offsets that would result in their being checked

export default function(color) {
    refreshBoard();
    
    //check if each offset for a piece will result in a new watches variable for any opponent piece that will cause the king to be watched

    // let allMoves = [];
    // let tempBoard;
    // let currentLocation;

    // if(color.toLowerCase() == "dark") {
    //     compboard.forEach((row) => {
    //         row.forEach((square) => {
    //             allMoves = [];
    //             if(square.piece !== null && square.piece.color.toLowerCase() == "dark") {
    //                 if(square.piece.constructor == Pawn) {
    //                     Object.keys(square.piece.offsets).forEach((offsets) => {
    //                         if(square.piece.offsets[offsets] !== null) {
    //                             if(square.piece.offsets[offsets][0].length > 1) {
    //                                 allMoves.push(...square.piece.offsets[offsets])
    //                             } else {
    //                                 allMoves.push(square.piece.offsets[offsets]);
    //                             }
    //                         }
    //                     });
    //                 }
    //                 //Artificially apply each offset and then check watches for all pieces
    //                 allMoves.forEach((move) => {
    //                     currentLocation = _.cloneDeep(square.piece.location);
    //                     tempBoard = _.cloneDeep(compboard);
    //                     tempBoard[currentLocation[0]][currentLocation[1]].piece = null;
    //                     tempBoard[square.piece.location[0] + move[0]][square.piece.location[1] + move[1]].piece = _.cloneDeep(square.piece);
    //                     if(!tempBoard[currentLocation[0] + move[0]][currentLocation[1] + move[1]]) {
    //                         console.log(move, currentLocation)
    //                     }

    //                     tempBoard.forEach((trow) => {
    //                         trow.forEach((tsquare) => {
    //                             if(tsquare.piece !== null) {
    //                                 if(tsquare.piece == undefined) {
    //                                     console.log(tsquare)
    //                                 }
    //                                 // console.log(calcWatches(tsquare.piece, tempBoard));
    //                             }
    //                         })
    //                     })
    //                 })
    //             }
    //         })
    //     })
    // }
}