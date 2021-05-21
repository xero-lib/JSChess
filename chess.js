//todo confirm that offset filters for each piece work
import makeMove from "./util/makeMove.js";
// import compboard from "./board/compboard.js";
// import {turn} from "./util/makeMove.js";

//testing turn system
// console.log(turn)
makeMove("a2", "a4");
// console.log(turn)
makeMove("a7", "a6"); //dark pawn cannot move?
// console.log(turn)
makeMove("c2", "c4");
// console.log(turn)
makeMove("d2", "d4");
// console.log(turn)
makeMove("e2", "e4");
// console.log(turn)
makeMove("f2", "f4");
// console.log(turn)
makeMove("g2", "g4");
// console.log(turn)
makeMove("h2", "h4");

// console.log(compboard[0][0].piece)

//test rook
// makeMove("a1", "a3");
// makeMove("a3", "a2");
// makeMove("a2", "h2");
// makeMove("h2", "a2");
// makeMove("a2", "a1");

// compboard.forEach(row => row.forEach(square => {
//   if(square.piece?.constructor.name == "Rook") console.log(square.piece?.constructor.name, square.piece?.watches);
// }))