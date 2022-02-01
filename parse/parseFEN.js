import compboard from "../board/compboard.js";
import printBoard from "../util/printBoard.js";
import clearBoard from "../util/clearBoard.js";
import { moveCount, updateHalfMove, updateMoveCount, updateTurn } from "../util/makeMove.js";
import alphaToCoord from "../util/alphaToCoord.js";
import coordCompare from "../util/coordCompare.js";
import refreshBoard from "../util/refreshBoard.js";
import letterToColor from "../util/letterToColor.js";
import letterToPiece from "../util/letterToPiece.js";
import { King, Pawn, Queen, Rook } from "../data/classes.js";

//generate board
export function set_FEN(FEN_string) {
    clearBoard();
    let [piece_str, turnColor, castles, enPassant, halfMove, fullMove] = FEN_string.split(' ');

    castles = castles == '-' ? null : Array.from(castles);
    enPassant = enPassant == '-' ? null : alphaToCoord(enPassant);
    updateTurn(turnColor);

    piece_str.split('/').forEach((row, py) => {
        let y = 7 - py
        let buffer = 0;
        Array.from(row).forEach((i, px) => {
            let x = px + buffer;
            if (!isNaN(i)) {
                buffer += parseInt(i - 1);
                return;
            }

            let Piece = letterToPiece(i);
            let color = letterToColor(i);
            
            compboard[y][x].piece = (
                [King, Queen].includes(Piece)
                    ? new Piece(color)
                    : new Piece(color, Piece === Pawn ? x : x < 4 ? "Queen" : "King")
            );

            let cpiece = compboard[y][x].piece;
            if (
                cpiece.constructor == Pawn &&
                !coordCompare([y, x], cpiece.defaultPos)
            ) {
                compboard[y][x].piece.hasMoved = true;
                compboard[y][px + buffer].piece.isEnpassantable = (enPassant && coordCompare([y, x], enPassant) ? true : false);
            }

            if (
                [King, Rook].includes(cpiece.constructor) &&
                !coordCompare([y, x], cpiece.defaultPos)
            ) {
                compboard[y][x].piece.hasMoved = true;
            }
        });
    });
    // check if pieces are on defaultPos
    //Light castles
    if (castles == null || (!castles.includes('K') && !castles.includes('Q') && compboard[0][4].piece?.constructor == King)) {
        compboard[0][4].piece.hasMoved = true;
    }
    if (!castles.includes('K') && compboard[0][7].piece?.constructor == Rook) {
        compboard[0][7].piece.hasMoved = true;
    }
    if (!castles.includes('Q') && compboard[0][0].piece?.constructor == Rook) {
        compboard[0][0].piece.hasMoved = true;
    }
    //Dark castles
    if (castles == null || (!castles.includes('k') && !castles.includes('q') && compboard[7][4].piece?.constructor == King)) {
        compboard[7][4].piece.hasMoved = true;
    }
    if (!castles.includes('k') && compboard[7][7].piece?.constructor == Rook) {
        compboard[7][7].piece.hasMoved = true;
    }
    if (!castles.includes('q') && compboard[7][0].piece?.constructor == Rook) {
        compboard[7][0].piece.hasMoved = true;
    }

    if (!enPassant == null) {
        let [y, x] = enPassant;
        compboard[y][x].piece.isEnpassantable = true;
    }
    
    updateHalfMove(halfMove);
    updateMoveCount(fullMove);

    refreshBoard();
    printBoard();
}