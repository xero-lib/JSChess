//todo refactor for default pos and x pos

import offsets from "./offsets.js";

export class King {
  constructor(color) {
    this.color = color;
    this.defaultPos = color === "Dark" ? [7, 4] : [0, 4];
    this.location = this.defaultPos;
  }

  watches = [];
  offsets = offsets.king;
  availableOffsets = [];
  value = 100;
  symbol = "K";
  hasMoved = false;
}

export class Queen {
  constructor(color) {
    this.color = color;
    this.defaultPos = color === "Dark" ? [7, 3] : [0, 3];
    this.location = this.defaultPos;
  }

  watches = [];
  offsets = offsets.queen;
  availableOffsets = [];
  value = 8;
  symbol = "Q";
}

export class Bishop {
  constructor(color, side = "King") {
    this.color = color;
    this.side = side;
    this.defaultPos =
      color === "Dark"
        ? side === "Queen"
          ? [7, 2]
          : [7, 5]
        : side === "Queen"
        ? [0, 2]
        : [0, 5];
    this.location = this.defaultPos;
  }

  watches = [];
  offsets = offsets.bishop;
  availableOffsets = [];
  value = 3;
  symbol = "B";
}

export class Knight {
  constructor(color, side = "King") {
    this.color = color;
    this.side = side;
    this.defaultPos =
      color === "Dark"
        ? side === "Queen"
          ? [7, 1]
          : [7, 6]
        : side === "Queen"
        ? [0, 1]
        : [0, 6];
    this.location = this.defaultPos;
  }

  watches = [];
  offsets = offsets.knight;
  availableOffsets = [];
  value = 3;
  symbol = "N";
}

export class Rook {
  constructor(color, side = "King") {
    this.color = color;
    this.side = side;
    this.defaultPos =
      color === "Dark"
        ? side === "Queen"
          ? [7, 0]
          : [7, 7]
        : side === "Queen"
        ? [0, 0]
        : [0, 7];
    this.location = this.defaultPos;
  }

  watches = [];
  offsets = offsets.rook;
  availableOffsets = [];
  value = 4;
  symbol = "R";
  hasMoved = false;
}

export class Pawn {
  constructor(color, file) {
    this.color = color;
    this.file = file;
    this.offsets = color === "Dark" ? offsets.pawn.dark : offsets.pawn.light;
    this.defaultPos =
      color === "Dark"
        ? file === 0 || (isNaN(file) && file === "A")
          ? [6, 0]
          : file === 1 || (isNaN(file) && file === "B")
          ? [6, 1]
          : file === 2 || (isNaN(file) && file === "C")
          ? [6, 2]
          : file === 3 || (isNaN(file) && file === "D")
          ? [6, 3]
          : file === 4 || (isNaN(file) && file === "E")
          ? [6, 4]
          : file === 5 || (isNaN(file) && file === "F")
          ? [6, 5]
          : file === 6 || (isNaN(file) && file === "G")
          ? [6, 6]
          : file === 7 || (isNaN(file) && file === "H")
          ? [6, 7]
          : null
        : file === 0 || (isNaN(file) && file === "A")
        ? [1, 0]
        : file === 1 || (isNaN(file) && file === "B")
        ? [1, 1]
        : file === 2 || (isNaN(file) && file === "C")
        ? [1, 2]
        : file === 3 || (isNaN(file) && file === "D")
        ? [1, 3]
        : file === 4 || (isNaN(file) && file === "E")
        ? [1, 4]
        : file === 5 || (isNaN(file) && file === "F")
        ? [1, 5]
        : file === 6 || (isNaN(file) && file === "G")
        ? [1, 6]
        : file === 7 || (isNaN(file) && file === "H")
        ? [1, 7]
        : null;
    this.location = this.defaultPos;
  }

  watches = [];
  availableOffsets = [];
  value = [1, 3, 4, 8];
  symbol = "P";
  hasMoved = false;
  isEnPassantable = false;
}
