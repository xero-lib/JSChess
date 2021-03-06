import refreshBoard from "./util/refreshBoard.js";
refreshBoard();

/* re-exports */
export { default as getPly } from "./util/getPly.js";
export { get_FEN, set_FEN } from "./parse/parseFEN.js"; 
export { default as compboard } from "./board/compboard.js"
export { default as getKingPos } from "./util/getKingPos.js";
export { default as resetBoard } from "./util/resetBoard.js";
export { default as coordToAlpha } from "./util/coordToAlpha.js";
export { default as getBoardJSON } from "./util/getBoardJSON.js";
export { default as makeMove, getTurn } from "./util/makeMove.js";

/*
    use `makeMove(start, end)` to move from `start` to `end`
    use `set_FEN("<FEN string>")` to start the board from a specified FEN position
*/
