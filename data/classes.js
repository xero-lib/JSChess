import offsets from "./offsets.js";

export class King {
	constructor(color) {
		this.color = color;
		this.defaultPos = color.toLowerCase() == "dark" ? [7, 4] : [0, 4];
	}

  watches = [];
	offsets = offsets.king;
  availableOffsets = [];
	color = this.color;
	value = 100;
	symbol = "K";
	hasMoved = false;
	defaultPos = this.defaultPos;
}

export class Queen {
	constructor(color) {
		this.color = color;
		this.defaultPos = color.toLowerCase() == "dark" ? [7, 3] : [0, 3];
	}

  watches = [];
	offsets = offsets.queen;
  availableOffsets = [];
	color = this.color;
	value = 8;
	symbol = "Q";
	defaultPos = this.defaultPos;
}

export class Bishop {
	constructor(color, side) {
		this.color = color;
		this.side = side;
		this.defaultPos =
			color.toLowerCase() == "dark"
				? side.toLowerCase() == "queen"
					? [7, 2]
					: [7, 5]
				: side.toLowerCase() == "queen"
				? [0, 2]
				: [0, 5];
		// this.watches = ()
	}

  watches = [];
	offsets = offsets.bishop;
  availableOffsets = [];
	color = this.color;
	value = 3;
	symbol = "B";
	defaultPos = this.defaultPos;
}

export class Knight {
	constructor(color, side) {
		this.color = color;
		this.side = side;
		this.defaultPos =
			color.toLowerCase() == "dark"
				? side.toLowerCase() == "queen"
					? [7, 1]
					: [7, 6]
				: side.toLowerCase() == "queen"
				? [0, 1]
				: [0, 6];
	}

  watches = [];
	offsets = offsets.knight;
  availableOffsets = [];
	color = this.color;
	value = 3;
	symbol = "N";
	defaultPos = this.defaultPos;
}

export class Rook {
	constructor(color, side) {
		this.color = color;
		this.side = side;
		this.defaultPos =
			color.toLowerCase() == "dark"
				? side.toLowerCase() == "queen"
					? [7, 0]
					: [7, 7]
				: side.toLowerCase() == "queen"
				? [0, 0]
				: [0, 7];
	}

  watches = [];
	offsets = offsets.rook;
  availableOffsets = [];
	color = this.color;
	value = 4;
	symbol = "R";
	hasMoved = false;
	defaultPos = this.defaultPos;
}

export class Pawn {
	constructor(color, file) {
		this.color = color;
		this.file = file;
		this.offsets =
			color.toLowerCase() == "dark"
				? offsets.pawn.dark
				: offsets.pawn.light;
		this.defaultPos =
			color.toLowerCase() == "dark"
				? file.toLowerCase() == "a"
					? [6, 0]
					: file.toLowerCase() == "b"
					? [6, 1]
					: file.toLowerCase() == "c"
					? [6, 2]
					: file.toLowerCase() == "d"
					? [6, 3]
					: file.toLowerCase() == "e"
					? [6, 4]
					: file.toLowerCase() == "f"
					? [6, 5]
					: file.toLowerCase() == "g"
					? [6, 6]
					: file.toLowerCase() == "h"
					? [6, 7]
					: null
				: file.toLowerCase() == "a"
				? [1, 0]
				: file.toLowerCase() == "b"
				? [1, 1]
				: file.toLowerCase() == "c"
				? [1, 2]
				: file.toLowerCase() == "d"
				? [1, 3]
				: file.toLowerCase() == "e"
				? [1, 4]
				: file.toLowerCase() == "f"
				? [1, 5]
				: file.toLowerCase() == "g"
				? [1, 6]
				: file.toLowerCase() == "h"
				? [1, 7]
				: null;
	}
  
  watches = [];
	offsets = this.offsets;
  availableOffsets = [];
	color = this.color;
	value = [1, 3, 4, 8];
	symbol = "P";
	hasMoved = false;
	defaultPos = this.defaultPos;
}
