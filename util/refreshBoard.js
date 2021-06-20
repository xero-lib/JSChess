import board from "../board/compboard.js";
import calcOffsets from "../calc/calcOffsets.js";
import calcWatches from "../calc/calcWatches.js";
import { filterChecks } from "../calc/calcChecks.js";

export default function refreshBoard(compboard = board) {
	for (let y = 0; y < 8; y++) {
		for (let x = 0; x < 8; x++) {
			if (compboard[y][x].piece) {
				compboard[y][x].piece.location = [y, x];
				compboard[y][x].piece.offsets = calcOffsets(compboard[y][x].piece);
				compboard[y][x].piece.watches = calcWatches(compboard[y][x].piece, compboard)
				compboard[y][x].piece.coordinate = compboard[y][x].coordinate;
			}
		}
	}
	filterChecks();
}
