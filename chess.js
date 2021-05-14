//todo confirm that offset filters for each piece work
import makeMove from "./util/makeMove.js";
import compboard from "./board/compboard.js";

//all light pawn push
makeMove("a2", "a4");
makeMove("b2", "b4");
makeMove("c2", "c4");
makeMove("d2", "d4");
makeMove("e2", "e4");
makeMove("f2", "f4");
makeMove("g2", "g4");
makeMove("h2", "h4");

//test rook
makeMove("a1", "a3");
makeMove("a3", "a2");
makeMove("a2", "h2");
makeMove("h2", "a2");
makeMove("a2", "a1");

compboard.forEach(row => row.forEach(square => {
  /*if(square.piece?.constructor.name == "Queen")*/ console.log(square.piece?.constructor.name, square.piece?.watches);
}))