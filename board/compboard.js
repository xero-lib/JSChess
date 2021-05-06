import colorboard from "./colorboard.js";
import files from "./files.js";
import pieces from "../data/pieces.js";

let compboard = new Array(8);
for (let x = 0; x < 8; x++) compboard[x] = new Array(8);

for (let y = 0; y < 8; y++) {
	for (let x = 0; x < 8; x++) {
		compboard[y][x] = {
			piece: null,
			color: colorboard[y][x],
			coordinate: `${files[x]}${y + 1}`,
		};
	}
}

for (let y = 0; y < 8; y++) {
	for (let x = 0; x < 8; x++) {
		pieces.dark.forEach((piece) => {
			if (piece.defaultPos[0] == y && piece.defaultPos[1] == x) {
				compboard[y][x].piece = piece;
			} else {
				piece.defaultPos.forEach((coord) => {
					if (coord[0] == y && coord[1] == x) {
						compboard[y][x].piece = piece;
					}
				});
			}
		});

		pieces.light.forEach((piece) => {
			if (piece.defaultPos[0] == y && piece.defaultPos[1] == x) {
				compboard[y][x].piece = piece;
			} else {
				piece.defaultPos.forEach((coord) => {
					if (coord[0] == y && coord[1] == x) {
						compboard[y][x].piece = piece;
					}
				});
			}
		});
	}
}

export default compboard;
