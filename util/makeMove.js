import printBoard from "./printBoard.js";
import move from "./move.js";
import coordToLocation from "./coordToLocation.js";
import coordToPiece from "./coordToPiece.js";
import calcChecks from "../calc/calcChecks.js";
import refreshBoard from "./refreshBoard.js";

export let moveCount = 0;
export let turn = "Light";
export default function makeMove(start, end) {
	refreshBoard();

	if (coordToPiece(start).color == turn) {
		let ret = move(coordToLocation(start).piece, end);
		if (ret) {
			moveCount++;
			if (moveCount !== 0 && moveCount % 2 !== 0) {
				turn = "Dark";
			} else {
				turn = "Light";
			}
			printBoard();
			console.log();
			return ret;
		} else {
			console.log("Illegal move.");
			printBoard();
			return false;
		}

	} else {
		console.log("It is not this color's turn.");
		printBoard();
		return false;
	}
}
