import { set_FEN, get_FEN } from "./parse/parseFEN.js";
import makeMove from "./util/makeMove.js";
import getBoardJSON from "./util/getBoardJSON.js";

/*
    use `makeMove(start, end)` to move from `start` to `end`
    use `set_FEN("<FEN string>")` to start the board from a specified FEN position
*/
set_FEN("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 0")
//etc
