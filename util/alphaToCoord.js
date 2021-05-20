import files from "../board/files.js";

export default function alphaToCoord(move) {
	if (move.length !== 2) return false;
	let sep = move.split("");

	if (!isNaN(parseInt(sep[0]))) return false;
	if (isNaN(parseInt(sep[1]))) return false;

	let file = sep[0];
	let col = parseInt(sep[1]);

	if (!files.includes(file.toUpperCase())) return false;
	if (!(col >= 1 && col <= 8)) return false;

	let fileNum = files.indexOf(file.toUpperCase());

	return [col - 1, fileNum];
}