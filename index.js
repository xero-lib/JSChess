import parseFEN, { print_fen_as_board } from "./parse/parseFEN.js";
import makeMove from "./util/makeMove.js";

/*
    use `makeMove(start, end)` to move from `start` to `end`
    must be legal moves
*/

parseFEN("rnbqk2r/ppppp1bp/5ppn/8/8/5PPN/PPPPP1BP/RNBQ1RK1 b kq - 3 5");

// makeMove("e2", "e4");
// makeMove("e7", "e5");
//etc
