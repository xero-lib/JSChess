//todo confirm that offset filters for each piece work
import makeMove from "./util/makeMove.js";
// import compboard from "./board/compboard.js";
// import {turn} from "./util/makeMove.js";

// console.log(turn)

// compboard.forEach(row => row.forEach(square => {
//   if(square.piece?.constructor.name == "Rook") console.log(square.piece?.constructor.name, square.piece?.watches);
// }))

makeMove("a2", "a4");
makeMove("b7", "b5");
makeMove("a4", "b5"); //! Capture is being wrongly removed
