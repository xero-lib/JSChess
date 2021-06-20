//todo confirm that offset filters for each piece work
import coordToPiece from "./util/coordToPiece.js";
import makeMove from "./util/makeMove.js";
import { turn } from "./util/makeMove.js";

console.log(turn);
makeMove("e2", "e4");
console.log(turn);
makeMove("e7", "e5");
console.log(turn);
makeMove("d1", "h5");
console.log(turn);
makeMove("f7", "f6");