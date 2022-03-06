import compboard from "../board/compboard.js";
import calcMoves from "../calc/calcMoves.js";
import getPly from "./getPly.js";

export default function getMoves(color = getPly(), board = compboard) {
    // let flat = [];
    // board.forEach((y) => y.forEach((square) => 
    //     (square.piece && square.piece.color === color && flat.push(...calcMoves(square.piece)))
        
    // ));
    // return flat;

    let flat = [];
    board.forEach((y) => y.forEach((square) => {
        if (square.piece !== null && square.piece.color === color) {
            let moves = calcMoves(square.piece, board);
            if (moves.length !== 0){
                if(Array.isArray(moves[0])) {
                    flat.push(...moves);
                } else {
                    flat.push(moves);
                }
            }
        }
    }));
    return flat;
}