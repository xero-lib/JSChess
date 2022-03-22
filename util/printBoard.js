// import chalk from "chalk";
import board from "../board/compboard.js";

export default function printBoard(compboard = board) {
  let table = [];
  for (let y = 7; y >= 0; y--) {
    let row = [];
    for (let x = 0; x < 8; x++) {
      if (compboard[y][x].piece === null) {
        row.push(compboard[y][x].color);
      } else {
        row.push(compboard[y][x].piece.symbol);
      }
    }
    table.push(row.join(" "));
  }
  console.log(table.join('\n'));
}
