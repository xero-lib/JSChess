import board from "../board/compboard.js";
import offsets from "../data/offsets.js";
import coordCompare from "../util/coordCompare.js";
import persist from "../util/persist.js";

export default function calcWatches(piece, compboard = board) {
  if (!piece) { return; }
  let watches = [],
    currentMove = [],
    possibleOffsets = [];

  switch (piece.symbol.toLowerCase()) {
    case 'p':
      possibleOffsets = persist(offsets.pawn[piece.color.toLowerCase()].capture);
      break;
    case 'r':
      possibleOffsets = persist(offsets.rook);
      break;
    case 'n':
      possibleOffsets = persist(offsets.knight);
      break;
    case 'b':
      possibleOffsets = persist(offsets.bishop);
      break;
    case 'q':
      possibleOffsets = persist(offsets.queen);
      break;
    case 'k':
      possibleOffsets = persist(offsets.king);
      break;
    default: return []
  }

  let found = false;
  let distance = 0;
  let [y_ax, x_ax] = piece.location;

  if (y_ax === undefined || x_ax === undefined) return [];

  switch (piece.symbol.toLowerCase()) {
    case 'p': {
      //check for edge pawn
      if (x_ax === 0) {
        return [
          [
            piece.location[0] + (piece.color === "Dark" ? -1 : 1),
            piece.location[1] + 1,
          ],
        ];
      }

      if (x_ax === 7) {
        return [
          [
            piece.location[0] + (piece.color === "Dark" ? -1 : 1),
            piece.location[1] - 1,
          ],
        ];
      }

      //if not edge pawn
      switch (piece.color) {
        case "Light":
          return [
            [piece.location[0] + 1, piece.location[1] + 1],
            [piece.location[0] + 1, piece.location[1] - 1],
          ];
        case "Dark":
          return [
            [piece.location[0] - 1, piece.location[1] + 1],
            [piece.location[0] - 1, piece.location[1] - 1],
          ];
        default:
          return [];
      }
    }
    case 'r': {
      if (y_ax === 7)
        possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0);
      if (y_ax === 0)
        possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0);
      if (x_ax === 7)
        possibleOffsets = possibleOffsets.filter((move) => move[1] <= 0);
      if (x_ax === 0)
        possibleOffsets = possibleOffsets.filter((move) => move[1] >= 0);

      //search distance up
      if (y_ax !== 7) {
        distance = 0;
        found = false;

        for (let y = 1; y < 7 - y_ax && found === false; y++) {
          if (compboard[y_ax + y][x_ax].piece !== null) {
            found = true;
          }
          distance = y;
        }

        possibleOffsets = possibleOffsets.filter((move) => move[0] <= distance || move[0] <= 0);
      }

      //search distance down
      if (y_ax !== 0) {
        distance = 0;
        found = false;
        for (let y = 1; y <= y_ax && found === false; y++) {
          if (compboard[y_ax - y][x_ax].piece !== null) {
            found = true;
          }
          distance = y;
        }

        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter(
          (move) => -move[0] <= distance || move[1] !== 0 || move[0] >= 0
        );
      }

      //search distance left
      if (x_ax !== 0) {
        distance = 0;
        found = false;
        for (let x = 1; x <= x_ax && found === false; x++) {
          if (compboard[y_ax][x_ax - x].piece !== null) {
            found = true;
          }
          distance = x;
        }

        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter(
          (move) => -move[1] <= distance || move[0] !== 0
        );
      }

      //search distance right
      if (x_ax !== 7) {
        distance = 0;
        found = false;
        for (let x = 1; x < 7 - x_ax && found === false; x++) {
          if (compboard[y_ax][x_ax + x].piece !== null) {
            found = true;
          }
          distance = x;
        }
        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter((move) => move[1] <= distance);
      }

      possibleOffsets.forEach((offset) => {
        currentMove = [y_ax + offset[0], x_ax + offset[1]];
        if (currentMove) watches.push(currentMove);
      });

      return watches ?? [];
    }
    case 'n': {
      //filter y edges
      if (y_ax === 0)
        possibleOffsets = possibleOffsets.filter((move) => move[0] > 0);
      if (y_ax === 1)
        possibleOffsets = possibleOffsets.filter((move) => move[0] !== -2);
      if (y_ax === 6)
        possibleOffsets = possibleOffsets.filter((move) => move[0] !== 2);
      if (y_ax === 7)
        possibleOffsets = possibleOffsets.filter((move) => move[0] < 0);

      //filter x edges
      if (x_ax === 0)
        possibleOffsets = possibleOffsets.filter((move) => move[1] > 0);
      if (x_ax === 1)
        possibleOffsets = possibleOffsets.filter((move) => move[1] !== -2);
      if (x_ax === 6)
        possibleOffsets = possibleOffsets.filter((move) => move[1] !== 2);
      if (x_ax === 7)
        possibleOffsets = possibleOffsets.filter((move) => move[1] < 0);

      possibleOffsets.forEach((offset) => {
        currentMove = [y_ax + offset[0], x_ax + offset[1]];
        if (currentMove) watches.push(currentMove);
      });

      return watches ?? [];
    }
    case 'b': {
      //check corners
      if (coordCompare([y_ax, x_ax], [0, 0])) {
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] > 0 || move[1] > 0
        );
      } else if (coordCompare([y_ax, x_ax], [0, 7])) {
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] < 0 || move[1] > 0
        );
      } else if (coordCompare([y_ax, x_ax], [7, 0])) {
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] > 0 || move[1] < 0
        );
      } else if (coordCompare([y_ax, x_ax], [7, 7])) {
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] > 0 || move[0] > 0
        );
      }

      //check edges
      if (y_ax === 7)
        possibleOffsets = possibleOffsets.filter((move) => move[0] < 0);
      else if (y_ax === 0)
        possibleOffsets = possibleOffsets.filter((move) => move[0] > 0);
      if (x_ax === 7)
        possibleOffsets = possibleOffsets.filter((move) => move[1] < 0);
      else if (x_ax === 0)
        possibleOffsets = possibleOffsets.filter((move) => move[1] > 0);

      //filter up/left
      if (!coordCompare([y_ax, x_ax], [7, 0])) {
        distance = 0;
        found = false;

        for (let i = 1; i < 8 - y_ax && i < x_ax + 1 && found === false; i++) {
          if (compboard[y_ax + i][x_ax - i].piece !== null) found = true;
          distance = i;
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          (move[0] === 0 - move[1] && move[0] <= distance) ||
          (move[0] < distance && move[1] < 0 - distance) ||
          (move[0] === 0 || move[1] === 0) ||
          (move[1] >= 0) ||
          (move[0] <= 0)
        ));
      }

      //filter up/right
      if (!coordCompare([y_ax, x_ax], [7, 7])) {
        distance = 0;
        found = false;

        for (let i = 1; i < 8 - y_ax && i < 8 - x_ax && found === false; i++) {
          if (compboard[y_ax + i][x_ax + i].piece !== null) found = true;
          distance = i;
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          (move[0] !== move[1]) ||
          (move[0] <= distance && move[1] <= distance) ||
          (move[0] === 0 || move[1] === 0) ||
          (move[0] <= 0) ||
          (move[1] <= 0)
        ));
      }

      //filter down/left
      if (!coordCompare([y_ax, x_ax], [0, 0])) {
        distance = 0;
        found = false;

        for (let i = 1; i <= x_ax && i <= y_ax && found === false; i++) {
          if (
            compboard[y_ax - i][x_ax - i]?.piece !== null &&
            compboard[y_ax - i][x_ax - i]?.piece !== undefined
          ) {
            found = true;
          }
          distance = i;
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          (-move[0] >= distance && -move[1] <= distance) ||
          (move[0] > 0 || move[1] > 0)
        ));
      }

      //filter down/right //! probably broken
      if (!coordCompare([y_ax, x_ax], [0, 7])) {
        distance = 0;
        found = false;

        for (let i = 1; i < y_ax && i < 8 - x_ax && found === false; i++) {
          if (compboard[y_ax - i][x_ax + i].piece !== null) {
            found = true;
          }
          distance = i;
        }

        //! probably an issue
        possibleOffsets = possibleOffsets.filter((move) => {
          return (move[0] >= 0 - distance && move[1] <= distance) ||
            move[0] >= 0 ||
            move[1] <= 0;
        });
      }

      watches = [];
      possibleOffsets.forEach((offset) => {
        currentMove = [y_ax + offset[0], x_ax + offset[1]];
        if (currentMove) watches.push(currentMove);
      });

      return watches ?? [];
    }
    case 'q': {
      //check for corners
      if (coordCompare([y_ax, x_ax], [0, 0])) {
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0 && move[1] >= 0
        );
      } else if (coordCompare([y_ax, x_ax], [0, 7])) {
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0 && move[1] <= 0
        );
      } else if (coordCompare([y_ax, x_ax], [7, 0])) {
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] <= 0 && move[1] >= 0
        );
      } else if (coordCompare([y_ax, x_ax], [7, 7])) {
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] <= 0 && move[0] <= 0
        );
      }

      //check for edge
      if (y_ax === 0)
        possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0);
      else if (y_ax === 7)
        possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0);
      if (x_ax === 0)
        possibleOffsets = possibleOffsets.filter((move) => move[1] >= 0);
      else if (x_ax === 7)
        possibleOffsets = possibleOffsets.filter((move) => move[1] <= 0);

      //filter up
      if (y_ax !== 7) {
        distance = 0;
        found = false;

        for (let y = 1; y < 8 - y_ax && found === false; y++) {
          if (compboard[y_ax + y][x_ax].piece) {
            found = true;
          }
          distance = y + 1;
        }

        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] < distance || move[1] !== 0
        );
      }

      //filter down
      if (y_ax !== 0) {
        distance = 0;
        found = false;

        for (let y = y_ax - 1; y > 0 && found === false; y--) {
          if (compboard[y][x_ax].piece !== null) found = true;
          distance = y_ax - 1;
        }

        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0 - distance || move[1] !== 0
        );
      }

      //filter left
      if (x_ax !== 0) {
        distance = 0;
        found = false;

        for (let x = 1; x <= x_ax && found === false; x++) {
          if (compboard[y_ax][x_ax - x].piece !== null) {
            found = true;
          }
          distance = x;
        }

        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] !== 0 || move[1] >= 0 - distance
        );
      }

      //filter right
      if (x_ax !== 7) {
        distance = 0;
        found = false;

        for (let x = 1; x < 8 - x_ax && found === false; x++) {
          if (compboard[y_ax][x_ax + x].piece !== null) {
            found = true;
          }
          distance = x;
        }

        possibleOffsets = possibleOffsets.filter((move) => (move[0] !== 0 || move[1] <= distance || move[1] <= 0));
      }

      //filter up/right
      if (!coordCompare([y_ax, x_ax], [7, 7])) {
        distance = 0;
        found = false;

        for (let i = 1; i < 8 - y_ax && i < 8 - x_ax && found === false; i++) {
          if (compboard[y_ax + i][x_ax + i].piece !== null) found = true;
          distance = i;
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          (move[0] !== move[1]) ||
          (move[0] <= distance && move[1] <= distance) ||
          (move[0] === 0 || move[1] === 0) ||
          (move[0] <= 0) ||
          (move[1] <= 0)
        ));
      }

      //filter up/left
      if (!coordCompare([y_ax, x_ax], [7, 0])) {
        distance = 0;
        found = false;

        for (let i = 1; i < 8 - y_ax && i < x_ax + 1 && found === false; i++) {
          if (compboard[y_ax + i][x_ax - i].piece !== null) {
            found = true;
          }
          distance = i;
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          (move[0] <= distance && move[1] <= -distance) ||
          (move[0] === -move[1] && move[0] <= distance) ||
          move[0] === 0 ||
          move[1] === 0 ||
          move[1] >= 0 ||
          move[0] <= 0
        ));
      }

      //filter down/right
      if (!coordCompare([y_ax, x_ax], [0, 7])) {
        distance = 0;
        found = false;

        for (let i = 1; i < y_ax + 1 && i < 8 - x_ax && found === false; i++) {
          if (compboard[y_ax - i][x_ax + i].piece !== null) found = true;
          distance = i;
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          (0 - move[0] === move[1] && move[1] <= distance) ||
          (move[0] === -move[1] && move[1] < distance) ||
          move[0] === 0 ||
          move[1] === 0 ||
          move[0] >= 0 ||
          move[1] <= 0
        ));
      }

      //filter down/left
      if (!coordCompare([y_ax, x_ax], [0, 0])) {
        distance = 0;
        found = false;

        for (let i = 1; i < x_ax && i < y_ax && found === false; i++) {
          if (compboard[y_ax - i][x_ax - i].piece !== null) found = true;
          distance = i;
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          (move[0] >= 0 - distance && move[1] <= 0 - distance) ||
          move[0] !== move[1] ||
          move[0] === 0 ||
          move[1] === 0 ||
          move[0] >= 0 ||
          move[1] >= 0
        ));
      }

      watches = [];
      currentMove = null;
      possibleOffsets.forEach((offset) => {
        currentMove = [y_ax + offset[0], x_ax + offset[1]];
        if (currentMove) watches.push(currentMove);
      });

      return watches ?? [];
    }
    case 'k': {
      //check for corners
      if (coordCompare([y_ax, x_ax], [0, 0])) {
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0 && move[1] >= 0
        );
      } else if (coordCompare([y_ax, x_ax], [0, 7])) {
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0 && move[1] <= 0
        );
      } else if (coordCompare([y_ax, x_ax], [7, 0])) {
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] <= 0 && move[1] >= 0
        );
      } else if (coordCompare([y_ax, x_ax], [7, 7])) {
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] <= 0 && move[0] <= 0
        );
      }

      //check for edges
      if (y_ax === 0)
        possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0);
      else if (y_ax === 7)
        possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0);
      if (x_ax === 0)
        possibleOffsets = possibleOffsets.filter((move) => move[1] >= 0);
      else if (x_ax === 7)
        possibleOffsets = possibleOffsets.filter((move) => move[1] <= 0);

      watches = [];
      currentMove = null;
      possibleOffsets.forEach((offset) => {
        currentMove = [y_ax + offset[0], x_ax + offset[1]];
        if (currentMove) watches.push(currentMove);
      });

      return watches ?? [];
    }
    default: {
      return;
    }
  }
}
