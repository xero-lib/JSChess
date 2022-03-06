import clearBoard from "./clearBoard.js";
import { updateHalfMove, updateMoveCount, updateTurn } from "./makeMove.js";
import { initBoard } from "../board/compboard.js";

export default function resetBoard() {
  clearBoard();
  updateHalfMove(0);
  updateMoveCount(0);
  initBoard();
  updateTurn("Light");
}
