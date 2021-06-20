import chalk from "chalk";
import compboard from "../board/compboard.js";

export default function printBoard() {
	for (let y = 7; y >= 0; y--) {
		for (let x = 0; x < 8; x++) {
			if (compboard[y][x].piece === null) {
				process.stdout.write(" " + compboard[y][x].color);
			} else {
				process.stdout.write(" " + (compboard[y][x].piece.color.toLowerCase() == "light" ? chalk.bold.yellow(compboard[y][x].piece.symbol) : chalk.bold.green(compboard[y][x].piece.symbol)));
			}
		}
		console.log();
	}
}
