import compboard from "../board/compboard.js";

export default function clearBoard() {
  for (let y of compboard) {
    for (let x of y) {
      x.piece = null;
    }
  }
}
