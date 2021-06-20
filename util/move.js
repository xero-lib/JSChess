import calcMoves from "../calc/calcMoves.js";
import alphaToCoord from "./alphaToCoord.js";
import compboard from "../board/compboard.js";

export default function move(piece, destination) {
	let availableMoves = piece.moves;
	let atc = alphaToCoord(destination);
	let valid; 
	availableMoves.forEach((move) => {if (move[0] == atc[0] && move[1] == atc[1]) valid = true;});
	console.log("Moves:", piece.moves)
	
	if (atc && valid) {
		compboard[atc[0]][atc[1]].piece = piece;
		compboard[atc[0]][atc[1]].piece.hasMoved = true;
		compboard[piece.location[0]][piece.location[1]].piece = null;
		return true;
	}

	if (
		destination[0] >= 0 &&
		destination[0] <= 7 &&
		destination[1] >= 0 &&
		destination[1] <= 7
	) {
		if (availableMoves.includes(destination)) {
			compboard[mtc[0]][mtc[1]].piece = piece;
			compboard[piece.location[0]][piece.location[1]].piece = null;
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
