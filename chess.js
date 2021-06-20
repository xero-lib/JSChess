//todo confirm that offset filters for each piece work
import coordToPiece from "./util/coordToPiece.js";
import makeMove from "./util/makeMove.js";
import { turn } from "./util/makeMove.js";
// import compboard from "./board/compboard.js";
// import {turn} from "./util/makeMove.js";

// console.log(turn)

// compboard.forEach(row => row.forEach(square => {
//   if(square.piece?.constructor.name == "Rook") console.log(square.piece?.constructor.name, square.piece?.watches);
// }))

console.log(turn)
makeMove("a2", "a4");
console.log(turn)
makeMove("b7", "b5");