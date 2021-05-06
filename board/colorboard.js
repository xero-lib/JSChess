let colorboard = new Array(8);
for (let i = 0; i < 8; i++) {
	colorboard[i] = new Array(8);
}

for (let i = 0; i < 8; i += 2) {
	for (let y = 0; y < 8; y += 2) {
		colorboard[i][y] = "#";
		colorboard[i][y + 1] = " ";

		colorboard[i + 1][y] = " ";
		colorboard[i + 1][y + 1] = "#";
	}
}

export default colorboard;
