import compboard from "../board/compboard.js";
import printBoard from "../util/printBoard.js";
import { King, Pawn, Queen } from "../data/classes.js";
import refreshBoard from "../util/refreshBoard.js";
import coordCompare from "../util/coordCompare.js";
import letterToColor from "../util/letterToColor.js";
import letterToPiece from "../util/letterToPiece.js";
import { updateTurn } from "../util/makeMove.js";
import clearBoard from "../util/clearBoard.js";

export function set_FEN(FEN_string) {
    clearBoard();
    let piece_str = FEN_string.split(' ')[0];
    let pstrs = piece_str.split('/');
    updateTurn(FEN_string.split(' ')[1]);

    pstrs.forEach((row, yin) => {
        let y = 7-yin
        let buffer = 0;
        Array.from(row).forEach((i, px) => {
            if (!isNaN(i)) {
                buffer += parseInt(i-1); //might be a problem
                return;
            }

            let Piece = letterToPiece(i);
            let color = letterToColor(i);

            compboard[y][px+buffer].piece = (
                [King, Queen].includes(Piece)
                    ? new Piece(color)
                    : Piece === Pawn
                        ? new Piece(color, px+buffer)
                        : new Piece(color, px+buffer < 4 ? "Queen" : "King")
            );
        });
    });
    printBoard();
}
// export function set_FEN(FEN_string) {
//     resetBoard();
//     let rows = FEN_string.split(' ')[0].split('').reverse().join('').split('/');
//     let ply = FEN_string.split(' ')[1];
//     updateTurn(ply.toLowerCase() == 'w' ? "Light" : "Dark");
//     if (rows.length !== 8) return false;

//     rows.forEach((row, y) => {
//         let buffer = 0;
//         row.split('').forEach((item, x) => {
//             x = 7 - x;
//             if (isNaN(item)) {
//                 // process.stdout.write(' ' + item);
//                 let color = letterToColor(item);
//                 if (!color) { return false; }
//                 let Piece = letterToPiece(item);
//                 if (Piece === Pawn) {
//                     if (
//                         (color === "Light" && y == 6) ||
//                         (color === "Dark" && y == 1)
//                     ) {
//                         compboard[y][x-buffer].piece = new Piece(color, x);
//                         compboard[y][x-buffer].piece.hasMoved = false;
//                     } else {
//                         compboard[y][x-buffer].piece = new Piece(color, x);
//                     }
//                 } else {
//                     compboard[y][x-buffer].piece = new Piece(color); // need to set queen/king sides. For bishops, check square color to determine side
//                     if (
//                         Piece === King &&
//                         (
//                             (color === "Light" && !coordCompare([0, 4], [y, x-buffer])) ||
//                             (color === "Dark" && !coordCompare([7, 4], [y, x-buffer]))
//                         )
//                     ) {
//                         compboard[y][x-buffer].piece.hasMoved = true;
//                     }

//                 }
//             } else {
//                 let space = Number.parseInt(item);
//                 buffer += space-1;
//                 for (let i = 0; i < space; i++) {
//                     compboard[y][x-i].piece = null;
//                     // process.stdout.write(' ' + ((y + i ^ x) & 1 == 1 ? ' ' : '#'))
//                 }
//             }
//         });
//         // console.log()
//     });
//     refreshBoard();
//     printBoard();
// }

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