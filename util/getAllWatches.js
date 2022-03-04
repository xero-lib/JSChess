import compboard from "../board/compboard.js";
import calcWatches from "../calc/calcWatches.js";
import getPly from "./getPly.js";

export default function getMoves(color = getPly(), board = compboard) {
    let flat = [];
    board.forEach((y) => y.forEach((square) => 
        (square.piece && square.piece.color === color && flat.push(...calcWatches(square.piece)))
    ));
    return flat;
}