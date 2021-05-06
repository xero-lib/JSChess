import compboard from "../board/compboard.js";

export default function refreshBoard() {
	for (let y = 0; y < 8; y++) {
		for (let x = 0; x < 8; x++) {
			if (compboard[y][x].piece) {
				compboard[y][x].piece.location = [y, x];
				compboard[y][x].piece.coordinate = compboard[y][x].coordinate;
			}
		}
	}
}
