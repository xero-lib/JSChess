import { Pawn } from "../data/classes.js";
import calcOffsets from "./calcOffsets.js";

export default function calcMoves(piece) {
	if (piece === null) return;

	let [y_ax, x_ax] = piece.location;
	let ao = calcOffsets(piece); //available offsets

	let pm = []; //possible moves

	if (ao.length == 0) {
		return [];
	}
	if (piece.constructor == Pawn) {
		let allMoves = [];


		if (piece.hasMoved) {
			ao.first = null;
		} else if (!piece.hasMoved && ao.first !== null) {
			allMoves.push(ao.first, ao.move);
		} else if (piece.hasMoved && ao.move) {
			allMoves.push(ao.move);
		} else if (ao.capture[0]) {
			if (ao.capture[0].length > 1) {
				allMoves.push(...ao.capture);
			} else {
				allMoves.push(ao.capture);
			}
		} else if (typeof ao.capture[0] == "number") {
			allMoves.push(ao.capture);
		} else {
			ao.capture = null;
		}
        
        allMoves = allMoves.filter((m) => m != null);
        
		allMoves.forEach((offset) => { 
			if (offset.length > 0) {
				pm.push([y_ax + offset[0], x_ax + offset[1]]);
			}
		});
	} else {
		ao.forEach((offset, _idx, array) => {
			if (offset.length > 1) {
				pm.push([y_ax + offset[0], x_ax + offset[1]]);
			} else {
				pm.push(array);
			}
		});
	}

	return pm;
}
