import compboard from "../board/compboard.js";
import calcWatches from "../calc/calcWatches.js";
import getPly from "./getPly.js";

export default function getWatches(color = getPly(), board = compboard) {
    let flat = [];
    board.forEach((y) => y.forEach((square) => {
        if (square.piece !== null && square.piece.color === color) {
            let watches = calcWatches(square.piece, board);
            if (watches.length !== 0){
                if(Array.isArray(watches[0])) {
                    flat.push(...watches);
                } else {
                    flat.push(watches);
                }
            }
        }
    }));
    return flat;
}