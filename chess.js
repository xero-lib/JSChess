//todo confirm that offset filters for each piece work
let moveCount = 0;
const files = ["A", "B", "C", "D", "E", "F", "G", "H"];
let colorboard = new Array(8);
for (let i = 0; i < 8; i++) {
  colorboard[i] = new Array(8);
}

//initialize colorboard
for (let i = 0; i < 8; i += 2) {
  for (let y = 0; y < 8; y += 2) {
    colorboard[i][y] = "#";
    colorboard[i][y + 1] = " ";

    colorboard[i + 1][y] = " ";
    colorboard[i + 1][y + 1] = "#";
  }
}

//assign offsets //! REMEMBER THAT OFFSETS ARE [y, x]
let offsets = {
  king: [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ],
  rook: new Array(32), //assign after
  queen: [], //assign after
  bishop: new Array(32), //assign after
  knight: [
    [-1, -2],
    [1, -2],
    [-2, -1],
    [2, -1],
    [-2, 1],
    [2, 1],
    [-1, 2],
    [1, 2],
  ],
  pawn: {
    light: {
      first: [
        [2, 0],
        [1, 0],
      ],
      move: [1, 0],
      capture: [
        [1, -1],
        [1, 1],
      ],
    },
    dark: {
      first: [
        [-2, 0],
        [-1, 0],
      ],
      move: [-1, 0],
      capture: [
        [-1, -1],
        [-1, 1],
      ],
    },
  },
};

//assign final rook offsets
for (let i = 0; i < 8; i++) {
  offsets.rook[i] = [i + 1, 0];
  offsets.rook[i + 8] = [0, i + 1];
  offsets.rook[i + 16] = [0 - (i + 1), 0];
  offsets.rook[i + 24] = [0, 0 - (i + 1)];
}
//assign final bishop offsets
for (let i = 0; i < 8; i++) {
  offsets.bishop[i] = [i + 1, i + 1];
  offsets.bishop[i + 8] = [0 - (i + 1), 0 - (i + 1)];
  offsets.bishop[i + 16] = [i + 1, 0 - (i + 1)];
  offsets.bishop[i + 24] = [0 - (i + 1), i + 1];
}

//assign final queen offsets
offsets.queen.push(...offsets.rook, ...offsets.bishop);

class King {
  constructor(color) {
    this.color = color;
    this.defaultPos = color.toLowerCase() == "dark" ? [7, 4] : [0, 4];
  }

  offsets = offsets.king;
  color = this.color;
  value = 100;
  symbol = "K";
  hasMoved = false;
  defaultPos = this.defaultPos;
}

class Queen {
  constructor(color) {
    this.color = color;
    this.defaultPos = color.toLowerCase() == "dark" ? [7, 3] : [0, 3];
  }

  offsets = offsets.queen;
  color = this.color;
  value = 8;
  symbol = "Q";
  defaultPos = this.defaultPos;
}

class Bishop {
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

  offsets = offsets.bishop;
  color = this.color;

  value = 3;
  symbol = "B";
  defaultPos = this.defaultPos;
}

class Knight {
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

  offsets = offsets.knight;
  color = this.color;

  value = 3;
  symbol = "N";
  defaultPos = this.defaultPos;
}

class Rook {
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

  offsets = offsets.rook;
  color = this.color;

  value = 4;
  symbol = "R";
  hasMoved = false;
  defaultPos = this.defaultPos;
}

class Pawn {
  constructor(color, file) {
    this.color = color;
    this.file = file;
    this.offsets =
      color.toLowerCase() == "dark" ? offsets.pawn.dark : offsets.pawn.light;
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
  offsets = this.offsets;
  color = this.color;
  value = [1, 3, 4, 8];
  symbol = "P";
  hasMoved = false;
  defaultPos = this.defaultPos;
}

const DarkKing = new King("Dark");
const LightKing = new King("Light");

const DarkQueen = new Queen("Dark");
const LightQueen = new Queen("Light");

const DarkKingsBishop = new Bishop("Dark", "King");
const DarkQueensBishop = new Bishop("Dark", "Queen");
const LightKingsBishop = new Bishop("Light", "King");
const LightQueensBishop = new Bishop("Light", "Queen");

const DarkKingsKnight = new Knight("Dark", "King");
const DarkQueensKnight = new Knight("Dark", "Queen");
const LightKingsKnight = new Knight("Light", "King");
const LightQueensKnight = new Knight("Light", "Queen");

const DarkKingsRook = new Rook("Dark", "King");
const DarkQueensRook = new Rook("Dark", "Queen");
const LightKingsRook = new Rook("Light", "King");
const LightQueensRook = new Rook("Light", "Queen");

const DarkAPawn = new Pawn("Dark", "A");
const DarkBPawn = new Pawn("Dark", "B");
const DarkCPawn = new Pawn("Dark", "C");
const DarkDPawn = new Pawn("Dark", "D");
const DarkEPawn = new Pawn("Dark", "E");
const DarkFPawn = new Pawn("Dark", "F");
const DarkGPawn = new Pawn("Dark", "G");
const DarkHPawn = new Pawn("Dark", "H");
const LightAPawn = new Pawn("Light", "A");
const LightBPawn = new Pawn("Light", "B");
const LightCPawn = new Pawn("Light", "C");
const LightDPawn = new Pawn("Light", "D");
const LightEPawn = new Pawn("Light", "E");
const LightFPawn = new Pawn("Light", "F");
const LightGPawn = new Pawn("Light", "G");
const LightHPawn = new Pawn("Light", "H");

//assign pieces
const pieces = {
  dark: [
    DarkKing,
    DarkQueen,
    DarkKingsRook,
    DarkQueensRook,
    DarkKingsBishop,
    DarkQueensBishop,
    DarkKingsKnight,
    DarkQueensKnight,
    DarkAPawn,
    DarkBPawn,
    DarkCPawn,
    DarkDPawn,
    DarkEPawn,
    DarkFPawn,
    DarkGPawn,
    DarkHPawn,
  ],
  light: [
    LightKing,
    LightQueen,
    LightKingsRook,
    LightQueensRook,
    LightKingsBishop,
    LightQueensBishop,
    LightKingsKnight,
    LightQueensKnight,
    LightAPawn,
    LightBPawn,
    LightCPawn,
    LightDPawn,
    LightEPawn,
    LightFPawn,
    LightGPawn,
    LightHPawn,
  ],
};

//init pieceboard
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

//init comp board
let compboard = new Array(8);
for (let i = 0; i < 8; i++) compboard[i] = new Array(8);

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

const refreshBoard = () => {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (compboard[y][x].piece) {
        compboard[y][x].piece.location = [y, x];
        compboard[y][x].piece.coordinate = compboard[y][x].coordinate;
      }
    }
  }
};

//run this over every piece and store the new value after every move
const calcOffsets = (piece) => {
  refreshBoard();
  let possibleOffsets;
  if (piece.constructor == Pawn) possibleOffsets = { ...piece.offsets };
  else possibleOffsets = [...piece.offsets];
  let [y_ax, x_ax] = piece.location;
  let found = false;
  let distance = 0;

  if (y_ax == undefined || x_ax == undefined) return null;

  switch (piece.constructor) {
    case Pawn:
      //check for edge pawn
      if (x_ax === 0)
        possibleOffsets.capture = possibleOffsets.capture.filter(
          (move) => move[1] !== -1
        );

      if (x_ax === 7)
        possibleOffsets.capture = possibleOffsets.capture.filter(
          (move) => move[1] !== 1
        );

      //check color
      if (piece.color.toLowerCase() == "dark") {
        //1 down
        if (compboard[y_ax - 1][x_ax].piece !== null) {
          possibleOffsets.move = null;
        }

        //remove possible first moves if piece hasMoved
        if (piece.hasMoved) possibleOffsets.first = null;

        //if piece has not moved,
        if (!piece.hasMoved) {
          if (
            compboard[y_ax - 1][x_ax].piece !== null &&
            compboard[y_ax - 2][x_ax].piece !== null
          ) {
            possibleOffsets.first = possibleOffsets.first.filter(
              (move) => move[0] != -2
            );
          }

          if (compboard[y_ax - 1][x_ax].piece !== null) {
            possibleOffsets.first = possibleOffsets.first.filter(
              (move) => move[0] != -1
            );
          }
        }

        if (
          x_ax !== 0 &&
          x_ax !== 7 /* (implement en passant) && y_ax !== 5*/
        ) {
          if (
            compboard[y_ax - 1][x_ax - 1].piece === null ||
            compboard[y_ax - 1][x_ax - 1].piece.color != piece.color
          ) {
            possibleOffsets.capture = possibleOffsets.capture.filter(
              (move) => move[1] != -1
            );
          }

          if (
            compboard[y_ax - 1][x_ax + 1] === null ||
            compboard[y_ax - 1][x_ax + 1].piece.color != piece.color
          ) {
            possibleOffsets.capture = possibleOffsets.capture.filter(
              (move) => move[1] != 1
            );
          }
        }

        if (
          (x_ax !== 0 && compboard[y_ax - 1][x_ax - 1].piece === null) ||
          compboard[y_ax - 1][x_ax - 1].piece.color != piece.color
        ) {
          possibleOffsets.capture = possibleOffsets.capture.filter(
            (move) => move[1] != -1
          );
        }

        if (
          (x_ax !== 7 && compboard[y_ax - 1][x_ax + 1].piece === null) ||
          compboard[y_ax - 1][x_ax + 1].piece.color != piece.color
        ) {
          possibleOffsets.capture = possibleOffsets.capture.filter(
            (move) => move[1] != 1
          );
        }
        //implement en passant
      } else {
        if (compboard[y_ax + 1][x_ax].piece !== null) {
          possibleOffsets.move = null;
        }

        if (piece.hasMoved) possibleOffsets.first = null;

        if (!piece.hasMoved) {
          if (
            compboard[y_ax + 1][x_ax].piece !== null &&
            compboard[y_ax + 2][x_ax].piece !== null
          ) {
            possibleOffsets.first = possibleOffsets.first.filter(
              (move) => move[0] != 2
            );
          }

          if (compboard[y_ax + 1][x_ax].piece !== null) {
            possibleOffsets.first = possibleOffsets.first.filter(
              (move) => move[0] != 1
            );
          }
        }

        if (
          x_ax !== 0 &&
          x_ax !== 7 /* (implement en passant) && 
		  y_ax !== 5*/
        ) {
          if (compboard[y_ax + 1][x_ax - 1].piece === null) {
            possibleOffsets.capture = possibleOffsets.capture.filter(
              (move) => move[1] != -1
            );
          }

          if (compboard[y_ax + 1][x_ax + 1] === null) {
            possibleOffsets.capture = possibleOffsets.capture.filter(
              (move) => move[1] != 1
            );
          }
        }
        //^v consolidate
        if (x_ax !== 0 && compboard[y_ax + 1][x_ax - 1].piece === null) {
          possibleOffsets.capture = possibleOffsets.capture.filter(
            (move) => move[1] != -1
          );
        }

        if (x_ax !== 7 && compboard[y_ax + 1][x_ax + 1].piece === null) {
          possibleOffsets.capture = possibleOffsets.capture.filter(
            (move) => move[1] != 1
          );
        }

        //implement en passant
      }
      if (possibleOffsets.capture.length === 1)
        possibleOffsets.capture = possibleOffsets.capture[0];
      return possibleOffsets;
    case Rook:
      if (y_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0);
      if (y_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0);
      if (x_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[1] <= 0);
      if (x_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[1] >= 0);

      found = false;
      distance = 0;

      //search distance up
      if (y_ax !== 7) {
        distance = 0;
        for (let y = 1; y < 8 - y_ax && found === false; y++) {
          if (compboard[y_ax + y][x_ax].piece !== null) {
            found = true;
            if (compboard[y_ax + y][x_ax].piece.color !== piece.color) {
              distance = y;
            } else {
              distance = y - 1;
            }
          } else {
            distance = y - 1;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => move[0] <= distance);
      }

      //search distance down
      if (y_ax !== 0) {
        distance = 0;
        found = false;
        for (let y = y_ax - 1; y > 0 && found === false; y--) {
          if (compboard[y][x_ax].piece !== null) {
            found = true;
            if (compboard[y_ax - y][x_ax].piece.color !== piece.color) {
              distance = y_ax - 1 - y;
            } else {
              distance = y_ax - 1 - y - 1;
            }
          } else {
            distance = y_ax - 1 - y - 1;
          }
        }

        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0 - distance
        );
      }

      //search distance left
      if (x_ax !== 0) {
        distance = 0;
        found = false;
        for (let x = x_ax; x > 0 && found === false; x--) {
          if (compboard[y_ax][x].piece !== null) {
            found = true;
            if (compboard[y_ax][x].piece.color !== piece.color) {
              distance = x_ax - x;
            } else {
              distance = x_ax - x - 1;
            }
          } else {
            distance = x_ax - x - 1;
          }
        }

        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter(
          (move) => move[1] >= 0 - distance
        );
      }

      //search distance right
      if (x_ax !== 7) {
        distance = 0;
        found = false;
        for (let x = 1; x < 8 - x_ax && found === false; x++) {
          if (compboard[y_ax][x_ax + x].piece !== null) {
            found = true;
            if (compboard[y_ax][x_ax + x].piece.color !== piece.color) {
              distance = x;
            } else {
              distance = x - 1;
            }
          } else {
            distance = x - 1;
          }
        }
        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter((move) => move[1] <= distance);
      }

      return possibleOffsets;
    case Knight:
      //filter y edges
      if (y_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[0] > 0);
      if (y_ax == 1)
        possibleOffsets = possibleOffsets.filter((move) => move[0] !== -2);
      if (y_ax == 6)
        possibleOffsets = possibleOffsets.filter((move) => move[0] !== 2);
      if (y_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[0] < 0);

      //filter x edges
      if (x_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[1] > 0);
      if (x_ax == 1)
        possibleOffsets = possibleOffsets.filter((move) => move[1] !== -2);
      if (x_ax == 6)
        possibleOffsets = possibleOffsets.filter((move) => move[1] !== 2);
      if (x_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[1] < 0);

      //filter final position
      possibleOffsets.forEach((move) => {
        let dest = compboard[y_ax + move[0]][[x_ax + move[1]]];
        if (dest.piece !== null) {
          possibleOffsets = possibleOffsets.filter((offset) => {
            if (compboard[y_ax + offset[0]][[x_ax + offset[1]]].piece) {
              return (
                compboard[y_ax + offset[0]][[x_ax + offset[1]]].piece.color !==
                piece.color
              );
            } else {
              return true;
            }
          });
        }
      });
      return possibleOffsets;
    case Bishop:
      //check corners
      if ([y_ax, x_ax] == [0, 0])
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] < 0 || move[1] < 0
        );
      if ([y_ax, x_ax] == [0, 7])
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] < 0 || move[1] > 0
        );
      if ([y_ax, x_ax] == [7, 0])
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] > 0 || move[1] < 0
        );
      if ([y_ax, x_ax] == [7, 7])
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] > 0 || move[0] > 0
        );

      //check edges
      if (y_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[0] < 0);
      if (y_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[0] > 0);
      if (x_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[1] < 0);
      if (x_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[1] > 0);

      //filter up/left
      if ([y_ax, x_ax] != [7, 0]) {
        distance = 0;
        found = false;

        for (let i = 1; i < 8 - y_ax && i < x_ax + 1 && found === false; i++) {
          if (compboard[y_ax + i][x_ax - i].piece !== null) {
            found = true;
            if (compboard[y_ax + i][x_ax - i].piece.color != piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] == 0 - move[1] && move[0] <= distance) {
            // console.log("ul",1,move,"accepted");
            return move;
          } else {
            // console.log("ul",1,move,"refused");
          }

          if (move[0] < distance && move[1] < 0 - distance) {
            // console.log("ul",2,move,"accepted");
            return move;
          } else {
            // console.log("ul",2,move,"refused");
          }
          if (move[0] == 0 || move[1] == 0) {
            // console.log("ul",3,move,"accepted");
            return move;
          } else {
            // console.log("ul",3,move,"refused");
          }

          if (move[1] >= 0) {
            return move;
          }

          if (move[0] <= 0) {
            return move;
          }
        });
      }
      //filter up/right
      if ([y_ax, x_ax] != [7, 7]) {
        distance = 0;
        found = false;

        for (let i = 1; i < 8 - y_ax && i < 8 - x_ax && found === false; i++) {
          if (compboard[y_ax + i][x_ax + i].piece !== null) {
            found = true;
            if (compboard[y_ax + i][x_ax + i].piece.color != piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] != move[1]) {
            // console.log("ur",1,move,"accepted");
            return move;
          } else {
            // console.log("ur",1,move,"refused");
          }

          if (move[0] <= distance && move[1] <= distance) {
            // console.log("ur",2,move,"accepted");
            return move;
          } else {
            // console.log("ur",2,move,"refused");
          }

          if (move[0] == 0 || move[1] == 0) {
            // console.log("ur",3,move,"accepted");
            return move;
          } else {
            // console.log("ur",3,move,"refused");
          }

          if (move[0] <= 0) {
            return move;
          }

          if (move[1] <= 0) {
            return move;
          }
        });
      }

      //filter down/left
      if ([y_ax, x_ax] != [0, 0]) {
        distance = 0;
        found = false;

        for (let i = 1; i < x_ax && i < y_ax && found === false; i++) {
          if (compboard[y_ax - i][x_ax - i].piece !== null) {
            found = true;
            if (compboard[y_ax - i][x_ax - i].piece.color != piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] > 0 - distance && move[1] < 0 - distance) {
            return move;
          } else if (move[0] > 0 || move[1] > 0) {
            return move;
          }
        });
      }

      //filter down/right
      if ([y_ax, x_ax] != [0, 7]) {
        distance = 0;
        found = false;

        for (let i = 1; i < y_ax && i < 8 - x_ax && found === false; i++) {
          if (compboard[y_ax - i][x_ax + i].piece !== null) {
            found = true;
            if (compboard[y_ax - i][x_ax + i].piece.color != piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i - 1;
          }
        }

        possibleOffsets = possibleOffsets.filter(
          (move) =>
            (move[0] > 0 - distance && move[1] > distance) ||
            move[0] > 0 ||
            move[1] > 0
        );
      }

      return possibleOffsets;
    case Queen:
      //check for block check //! needs to be done for all pieces

      //check for corners
      if ([y_ax, x_ax] == [0, 0])
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0 && move[1] >= 0
        );
      else if ([y_ax, x_ax] == [0, 7])
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0 && move[1] <= 0
        );
      else if ([y_ax, x_ax] == [7, 0])
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] <= 0 && move[1] >= 0
        );
      else if ([y_ax, x_ax] == [7, 7])
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] <= 0 && move[0] <= 0
        );

      //check for edge
      if (y_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0);
      if (y_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0);
      if (x_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[1] >= 0);
      if (x_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[1] <= 0);

      //filter up
      if (y_ax != 7) {
        distance = 0;
        found = false;

        for (let y = 1; y < 8 - y_ax && found === false; y++) {
          if (compboard[y_ax + y][x_ax].piece) {
            found = true;
            if (compboard[y_ax + y][x_ax].piece.color != piece.color) {
              distance = y + 1;
            } else {
              distance = y;
            }
          } else {
            distance = y;
          }
        }
        // console.log(possibleOffsets);
        // console.log("Up Distance:",distance)
        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] < distance || move[1] !== 0) {
            // console.log('u',move,"accepted");
            return move;
          } else {
            // console.log('u',move,"refused")
          }
        });
      }

      //filter down
      if (y_ax != 0) {
        distance = 0;
        found = false;

        for (let y = y_ax - 1; y > 0 && found === false; y--) {
          if (compboard[y][x_ax].piece !== null) {
            found = true;
            if (compboard[y][x_ax].piece.color != piece.color) {
              distance = y_ax - 1 - y + 1;
            } else {
              distance = y_ax - 1 - y;
            }
          } else {
            distance = y_ax - 1 - y + 1;
          }
        }
        // console.log(distance)

        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] >= 0 - distance || move[1] !== 0) {
            // console.log('d',move,"accepted");
            return move;
          } else {
            // console.log('d',move,"refused");
          }
        });
      }

      //filter left
      if (x_ax != 0) {
        distance = 0;
        found = false;

        for (let x = x_ax; x > 0 && found === false; x--) {
          if (compboard[y_ax][x - 1].piece !== null) {
            found = true;
            if (compboard[y_ax][x - 1].piece.color != piece.color) {
              distance = x_ax - x + 1;
            } else {
              distance = x_ax - x;
            }
          } else {
            distance = x_ax - x + 1;
          }
        }
        // console.log('ldist', distance)
        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] !== 0 || move[1] >= 0 - distance) {
            // console.log('l',move,"accepted");
            return move;
          } else {
            // console.log('l',move,"refused");
          }
        });
      }

      //filter right
      if (x_ax != 7) {
        distance = 0;
        found = false;

        for (let x = 1; x < 8 - x_ax && found === false; x++) {
          if (compboard[y_ax][x_ax + x].piece !== null) {
            found = true;
            if (compboard[y_ax][x_ax + x].piece.color != piece.color) {
              distance = x;
            } else {
              distance = x - 1;
            }
          } else {
            distance = x;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] !== 0 || move[1] <= distance) {
            // console.log('r',move,"accepted");
            return move;
          } else {
            // console.log('r',move,"refused");
          }

          if (move[1] <= 0) {
            return move;
          }
        });
      }

      //filter up/right
      if ([y_ax, x_ax] != [7, 7]) {
        distance = 0;
        found = false;

        for (let i = 1; i < 8 - y_ax && i < 8 - x_ax && found === false; i++) {
          if (compboard[y_ax + i][x_ax + i].piece !== null) {
            found = true;
            if (compboard[y_ax + i][x_ax + i].piece.color != piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] != move[1]) {
            // console.log("ur",1,move,"accepted");
            return move;
          } else {
            // console.log("ur",1,move,"refused");
          }

          if (move[0] <= distance && move[1] <= distance) {
            // console.log("ur",2,move,"accepted");
            return move;
          } else {
            // console.log("ur",2,move,"refused");
          }

          if (move[0] == 0 || move[1] == 0) {
            // console.log("ur",3,move,"accepted");
            return move;
          } else {
            // console.log("ur",3,move,"refused");
          }

          if (move[0] <= 0) {
            return move;
          }

          if (move[1] <= 0) {
            return move;
          }
        });
      }

      //filter up/left
      if ([y_ax, x_ax] != [7, 0]) {
        distance = 0;
        found = false;

        for (let i = 1; i < 8 - y_ax && i < x_ax + 1 && found === false; i++) {
          if (compboard[y_ax + i][x_ax - i].piece !== null) {
            found = true;
            if (compboard[y_ax + i][x_ax - i].piece.color != piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] == 0 - move[1] && move[0] <= distance) {
            // console.log("ul",1,move,"accepted");
            return move;
          } else {
            // console.log("ul",1,move,"refused");
          }

          if (move[0] < distance && move[1] < 0 - distance) {
            // console.log("ul",2,move,"accepted");
            return move;
          } else {
            // console.log("ul",2,move,"refused");
          }
          if (move[0] == 0 || move[1] == 0) {
            // console.log("ul",3,move,"accepted");
            return move;
          } else {
            // console.log("ul",3,move,"refused");
          }

          if (move[1] >= 0) {
            return move;
          }

          if (move[0] <= 0) {
            return move;
          }
        });
      }

      //filter down/right
      if ([y_ax, x_ax] != [0, 7]) {
        distance = 0;
        found = false;

        for (let i = 1; i < y_ax + 1 && i < 8 - x_ax && found === false; i++) {
          if (compboard[y_ax - i][x_ax + i].piece !== null) {
            found = true;
            if (compboard[y_ax - i][x_ax + i].piece.color != piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => {
          if (0 - move[0] == move[1] && move[1] <= distance) {
            // console.log('dr',1,move,"accepted");
            return move;
          } else {
            // console.log('dr',1,move,"refused")
          }
          if (move[0] == -move[1] && move[1] < distance) {
            // console.log('dr',2,move,"accepted");
            return move;
          } else {
            // console.log('dr',2,move,"refused")
          }
          if (move[0] == 0 || move[1] == 0) {
            // console.log('dr',3,move,"accepted");
            return move;
          } else {
            // console.log('dr',3,move,"refused");
          }

          if (move[0] >= 0) {
            // console.log("dr",4,move,"accepted");
            return move;
          } else {
            // console.log("dr",4,move,"refused");
          }

          if (move[1] <= 0) {
            return move;
          }
        });
      }

      //filter down/left
      if ([y_ax, x_ax] != [0, 0]) {
        distance = 0;
        found = false;

        for (let i = 1; i < x_ax && i < y_ax && found === false; i++) {
          if (compboard[y_ax - i][x_ax - i].piece !== null) {
            found = true;
            if (compboard[y_ax - i][x_ax - i].piece.color != piece.color) {
              distance = i + 1;
            } else {
              distance = i;
            }
          } else {
            distance = i + 1;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] != move[1]) {
            // console.log("dl",1,move,"accepted")
            return move;
          } else {
            // console.log("dl",1,move,"denied")
          }
          if (move[0] > 0 - distance && move[1] < 0 - distance) {
            // console.log("dl",2,move,"accepted")
            return move;
          } else {
            // console.log("dl",2,move,"denied")
          }
          if (move[0] == 0 || move[1] == 0) {
            // console.log("dl",3,move,"accepted")
            return move;
          } else {
            // console.log("dl",3,move,"denied")
          }

          if (move[0] >= 0) {
            return move;
          }

          if (move[1] >= 0) {
            return move;
          }
        });
      }
      console.log("Final offsets:", possibleOffsets);
      return possibleOffsets;
    case King:
      //check for corners
      if ([y_ax, x_ax] == [0, 0])
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0 && move[1] >= 0
        );
      else if ([y_ax, x_ax] == [0, 7])
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0 && move[1] <= 0
        );
      else if ([y_ax, x_ax] == [7, 0])
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] <= 0 && move[1] >= 0
        );
      else if ([y_ax, x_ax] == [7, 7])
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] <= 0 && move[0] <= 0
        );

      //check for edges
      if (y_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0);
      else if (y_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0);
      if (x_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[1] <= 0);
      else if (x_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[1] >= 0);

      //check for piece up
      if (y_ax != 7) {
        if (compboard[y_ax + 1][x_ax].piece !== null) {
          if (compboard[y_ax + 1][x_ax].piece.color == piece.color) {
            possibleOffsets = possibleOffsets.filter(
              (move) => move[0] >= 0 && move[1] != 0
            );
          }
        }
      }

      //check for piece down
      if (y_ax != 0) {
        if (compboard[y_ax - 1][x_ax].piece !== null) {
          if (compboard[y_ax - 1][x_ax].piece.color == piece.color) {
            possibleOffsets = possibleOffsets.filter(
              (move) => move[0] >= 0 && move[1] != 0
            );
          }
        }
      }

      //check for piece left
      if (x_ax != 0) {
        if (compboard[y_ax][x_ax - 1].piece !== null) {
          if (compboard[y_ax][x_ax - 1].piece.color == piece.color) {
            possibleOffsets = possibleOffsets.filter(
              (move) => move[1] >= 0 && move[0] != 0
            );
          }
        }
      }

      //check for piece right
      if (x_ax != 0) {
        if (compboard[y_ax][x_ax + 1].piece !== null) {
          if (compboard[y_ax][x_ax + 1].piece.color == piece.color) {
            possibleOffsets = possibleOffsets.filter(
              (move) => move[1] <= 0 && move[0] != 0
            );
          }
        }
      }

      //check for piece up/right
      if ([y_ax, x_ax] != [7, 7]) {
        if (y_ax == 0) {
          possibleOffsets = possibleOffsets.filter((move) => move[0] < 0);
        } else if (x_ax == 0) {
          possibleOffsets = possibleOffsets.filter((move) => move[1] < 0);
        } else if (compboard[y_ax + 1][x_ax + 1].piece !== null) {
          if (compboard[y_ax + 1][x_ax + 1].piece.color == piece.color) {
            possibleOffsets = possibleOffsets.filter(
              (move) => move[0] != 1 && move[1] != 1
            );
          }
        }
      }

      //check for piece up/left
      if ([y_ax, x_ax] != [7, 0]) {
        if (y_ax == 0) {
          possibleOffsets = possibleOffsets.filter((move) => move[0] < 0);
        } else if (x_ax == 0) {
          possibleOffsets = possibleOffsets.filter((move) => move[1] < 0);
        } else if (compboard[y_ax + 1][x_ax - 1].piece !== null) {
          if (compboard[y_ax + 1][x_ax - 1].piece == piece.color) {
            possibleOffsets = possibleOffsets.filter(
              (move) => move[0] != 1 && move[1] != -1
            );
          }
        }
      }

      //check for piece down/right
      if ([y_ax, x_ax] != [0, 7]) {
        if (y_ax == 0) {
          possibleOffsets = possibleOffsets.filter((move) => move[0] < 0);
        } else if (x_ax == 0) {
          possibleOffsets = possibleOffsets.filter((move) => move[1] < 0);
        } else if (compboard[y_ax - 1][x_ax + 1].piece !== null) {
          if (compboard[y_ax - 1][x_ax + 1].piece.color == piece.color) {
            possibleOffsets = possibleOffsets.filter(
              (move) => move[0] != -1 && move[1] != 1
            );
          }
        }
      }

      //check for piece down/left
      if ([y_ax, x_ax] != [0, 0]) {
        if (y_ax == 0) {
          possibleOffsets = possibleOffsets.filter((move) => move[0] < 0);
        } else if (x_ax == 0) {
          possibleOffsets = possibleOffsets.filter((move) => move[1] < 0);
        } else if (compboard[y_ax - 1][x_ax - 1].piece !== null) {
          if (compboard[y_ax - 1][x_ax - 1].piece.color == piece.color) {
            possibleOffsets = possibleOffsets.filter(
              (move) => move[0] != -1 && move[1] != -1
            );
          }
        }
      }

      return possibleOffsets;
    default:
      return;
  }
};

const calcMoves = (piece) => {
  refreshBoard();

  if (piece === null) return;

  let [y_ax, x_ax] = piece.location;
  let availableOffsets = calcOffsets(piece);
  if (piece.hasMoved) {
    availableOffsets.first = null;
  }

  //   console.log("pl", piece.location);
  //   console.log("ao", availableOffsets);
  let possibleMoves = [];

  if (availableOffsets.length == 0) return [];

  if (piece.constructor == Pawn) {
    let allMoves = [];
    if (!piece.hasMoved) {
      availableOffsets.first.forEach((idx) => {
        if (typeof idx[0] != "number") {
          if (availableOffsets.first !== null) {
            allMoves.push(...idx);
          }
        } else {
          if (availableOffsets.first !== null) {
            allMoves.push(idx);
          }
        }
      });
    }
    if (piece.hasMoved && availableOffsets.move)
      allMoves.push(availableOffsets.move);
    if (availableOffsets.capture[0]) {
      if (availableOffsets.capture[0].length > 1)
        allMoves.push(...availableOffsets.capture);
      else allMoves.push(availableOffsets.capture);
    } else if (typeof availableOffsets.capture[0] == "number")
      allMoves.push(availableOffsets.capture);
    else {
      availableOffsets.capture = null;
    }

    allMoves.forEach((offset) => {
      if (offset.length > 0) {
        possibleMoves.push([y_ax + offset[0], x_ax + offset[1]]);
      }
    });
  } else {
    availableOffsets.forEach((value, _, array) => {
      if (value.length > 1) {
        availableOffsets.forEach((offset) => {
          possibleMoves.push([y_ax + offset[0], x_ax + offset[1]]);
        });
      } else {
        possibleMoves.push(array);
      }
    });
  }
  return possibleMoves;
};

const alphaToCoord = (move) => {
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
};

const coordToPiece = (coord) => {
  let atc = alphaToCoord(coord);
  if (atc) {
    return compboard[atc[0]][atc[1]].piece;
  } else {
    return false;
  }
};

const move = (piece, destination) => {
  let availableMoves = calcMoves(piece);
  let atc = alphaToCoord(destination);

  if (atc) {
    if (!availableMoves) return false;
    if (availableMoves.some((move) => move[0] == atc[0] && move[1] == atc[1])) {
      compboard[atc[0]][atc[1]].piece = piece;
      compboard[atc[0]][atc[1]].piece.hasMoved = true;
      compboard[piece.location[0]][piece.location[1]].piece = null;
      return true;
    } else {
      return false;
    }
  }

  if (
    destination[0] >= 0 &&
    destination[0] <= 7 &&
    destination[1] >= 0 &&
    destination[1] <= 7
  ) {
    if (availableMoves.includes(destination)) {
      compboard[mtc[0]][mtc[1]].piece = piece;
      compboard[piece.location[0]][piece.location[1]].piece = null;
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const printBoard = () => {
  for (let y = 7; y >= 0; y--) {
    for (let x = 0; x < 8; x++) {
      if (compboard[y][x].piece === null) {
        process.stdout.write(" " + compboard[y][x].color);
      } else {
        process.stdout.write(" " + compboard[y][x].piece.symbol);
      }
    }
    console.log();
  }
};

const coordToLocation = (coord) => {
  let atc = alphaToCoord(coord);
  if (!atc) return false;
  return compboard[atc[0]][atc[1]];
};

const makeMove = (start, end) => {
  let ret = move(coordToLocation(start).piece, end);
  if (ret) {
    moveCount++;
    console.log("Move", moveCount);
    printBoard();
    console.log();
    return ret;
  } else {
    console.log("Illegal move.");
    printBoard();
    return false;
  }
};

printBoard();
console.log();

//all light pawn push
makeMove("a2", "a4");
makeMove("b2", "b4");
makeMove("c2", "c4");
makeMove("d2", "d4");
makeMove("e2", "e4");
makeMove("f2", "f4");
makeMove("g2", "g4");
makeMove("h2", "h4");
