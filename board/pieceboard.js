let pieceboard = new Array(8);
for (let i = 0; i < 8; i++) {
	pieceboard[i] = new Array(8);
}

for (let y = 0; y < 8; y++) {
	for (let x = 0; x < 8; x++) {
		pieceboard[y][x] = {
			piece: null,
			color: colorboard[y][x],
		};
	}
}

//default piece loc assignment
for (let y = 0; y < 8; y++) {
	for (let x = 0; x < 8; x++) {
		pieces.dark.forEach((piece) => {
			if (piece.defaultPos[0] == y && piece.defaultPos[1] == x) {
				pieceboard[y][x].piece = piece.symbol;
			} else {
				piece.defaultPos.forEach((coord) => {
					if (coord[0] == y && coord[1] == x) {
						pieceboard[y][x].piece = piece.symbol;
					}
				});
			}
		});

		pieces.light.forEach((piece) => {
			if (piece.defaultPos[0] == y && piece.defaultPos[1] == x) {
				pieceboard[y][x].piece = piece.symbol;
			} else {
				piece.defaultPos.forEach((coord) => {
					if (coord[0] == y && coord[1] == x) {
						pieceboard[y][x].piece = piece.symbol;
					}
				});
			}
		});
	}
}

export default pieceboard;
