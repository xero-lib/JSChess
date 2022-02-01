import { set_FEN } from "./parse/parseFEN.js";
import makeMove from "./util/makeMove.js";

/*
    use `makeMove(start, end)` to move from `start` to `end`
    must be legal moves
*/

// set_FEN("rnbqk2r/ppppp1bp/5ppn/8/8/5PPN/PPPPP1BP/RNBQ1RK1 b kq - 3 5");
// set_FEN("rnbqkbnr/1ppppppp/p7/4P3/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2");
set_FEN("rnbqkbnr/pppppppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 50 10");
// set_FEN("rnbqk1n1/ppp2p2/4p3/8/8/P2P3N/P2PP3/R1BQKB2 b Qq - 0 16");

// makeMove("e7", "e5");
// makeMove("d5", "e6");
// makeMove("e4", "d5");
// makeMove("e4", "e5");

// makeMove("d7", "d5");
// makeMove("e5", "d6");

// makeMove("e1", "g1");
// makeMove("e8", "g8");
// makeMove("e4", "e5");
//etc

