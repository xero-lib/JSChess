import compboard from "../board/compboard.js";
import { Pawn } from "../data/classes.js";
import letterToColor from "../util/letterToColor.js";
import letterToPiece from "../util/letterToPiece.js";
import printBoard from "../util/printBoard.js";
import refreshBoard from "../util/refreshBoard.js";
import resetBoard from "../util/resetBoard.js";

export function set_FEN(FEN_string) {
    resetBoard();
    let rows = FEN_string.split(' ')[0].split('').reverse().join('').split('/');
    if (rows.length !== 8) return false;

    rows.forEach((row, y) => {
        let buffer = 0;
        row.split('').forEach((item, x) => {
            x = 7 - x;
            if (isNaN(item)) {
                // process.stdout.write(' ' + item);
                let color = letterToColor(item);
                if (!color) return false;
                let Piece = letterToPiece(item);
                if (Piece === Pawn) {
                    if (
                        (color === "Light" && y == 6) ||
                        (color === "Dark" && y == 1)
                    ) {
                        compboard[y][x-buffer].piece = new Piece(color, x);
                        compboard[y][x-buffer].piece.hasMoved = false;
                    } else {
                        compboard[y][x-buffer].piece = new Piece(color, x);
                    }
                } else {
                    compboard[y][x-buffer].piece = new Piece(color);
                }
            } else {
                let space = Number.parseInt(item);
                buffer += space-1;
                for (let i = 0; i < space; i++) {
                    compboard[y][x-i].piece = null;
                    // process.stdout.write(' ' + ((y + i ^ x) & 1 == 1 ? ' ' : '#'))
                }
            }
        });
        // console.log()
    });
    refreshBoard();
    printBoard();
}

// export function print_fen_as_board(FEN_string) {
//     let rows = FEN_string.split(' ')[0].split('/');
//     if (rows.length !== 8) return false;

//     rows.forEach((row, y) => {
//         row.split('').forEach((item, x) => {
//             if (isNaN(item)) {
//                 process.stdout.write(' ' + item);
//             } else {
//                 for (let i = 0; i < Number.parseInt(item); i++) {
//                     process.stdout.write(' ' + ((x + i ^ y) & 1 == 1 ? '#' : ' '));
//                 }
//             }
//         });
//         console.log();
//     });
// }