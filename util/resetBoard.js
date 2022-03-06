import clearBoard from "./clearBoard.js";
import { updateTurn } from "./makeMove.js";
import { initBoard } from "../board/compboard.js";

export default function resetBoard() {
  clearBoard();
  initBoard();
  updateTurn("Light");
}
