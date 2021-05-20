import { Pawn } from "../data/classes.js";
import refreshBoard from "../util/refreshBoard.js";
import calcOffsets from "./calcOffsets.js";

export default function calcMoves(piece) {
	refreshBoard();

	if (piece === null) return;

	let [y_ax, x_ax] = piece.location;
	let availableOffsets = calcOffsets(piece);

	let possibleMoves = [];

	if (availableOffsets.length == 0) return [];
	if (piece.constructor == Pawn) {
		let allMoves = [];
		if (piece.hasMoved) {
			availableOffsets.first = null;
		}

		if (!piece.hasMoved && availableOffsets.first !== null) {
			allMoves.push(availableOffsets.first);
		}

		if (piece.hasMoved && availableOffsets.move) {
			allMoves.push(availableOffsets.move);
		}

		if (availableOffsets.capture[0]) {
			if (availableOffsets.capture[0].length > 1) {
				allMoves.push(...availableOffsets.capture);
			} else {
				allMoves.push(availableOffsets.capture);
			}
		} else if (typeof availableOffsets.capture[0] == "number") {
			allMoves.push(availableOffsets.capture);
		} else {
			availableOffsets.capture = null;
		}

		allMoves.forEach((offset) => {
			if (offset.length > 0) {
				possibleMoves.push([y_ax + offset[0], x_ax + offset[1]]);
			}
		});
	} else {
		availableOffsets.forEach((offset, idx, array) => {
			if (offset.length > 1) {
				possibleMoves.push([y_ax + offset[0], x_ax + offset[1]]);
			} else {
				possibleMoves.push(array);
			}
		});
	}

	return possibleMoves;
}
