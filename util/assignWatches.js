import compboard from "../board/compboard.js";
import calcWatches from "../calc/calcWatches.js";
import { Pawn } from "../data/classes.js";

export default function() {
  compboard.forEach((row) => {
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
}