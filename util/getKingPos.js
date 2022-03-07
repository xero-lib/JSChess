import compboard from "../board/compboard.js";
import getPly from "./getPly.js";

export default function getKingPos(color = getPly(), board = compboard) {
    let ret;
    board.forEach((col, y) => col.forEach((square, x) => {
        if (square.piece && square.piece.symbol.toLowerCase() === 'k' && square.piece.color === color) {
            ret = [y, x];
        }
    }))
    return ret;
}