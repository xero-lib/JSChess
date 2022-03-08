import offsets from "../data/offsets.js";
import compboard from "../board/compboard.js";
import getCastles from "../util/getCastles.js";
import coordCompare from "../util/coordCompare.js";
import { Knight, Bishop, Queen, Rook, King, Pawn } from "../data/classes.js";
import { filterChecks } from "./calcChecks.js";
import persist from "../util/persist.js"

export default function calcOffsets(piece) {
  let
    possibleOffsets,
    [y_ax, x_ax] = piece.location,
    found = false,
    distance = 0;

  if (y_ax === undefined || x_ax === undefined) return null;

  switch (piece.constructor) {
    case Pawn:
      possibleOffsets = persist((piece.color === "Dark") ? offsets.pawn.dark : offsets.pawn.light);
      break;
    default:
      possibleOffsets = persist(offsets[piece.constructor.name.toLowerCase()]);
  }

  
  switch (piece.constructor) {
    case Pawn:
      //check for edge
      if (x_ax === 0) { possibleOffsets.capture = possibleOffsets.capture.filter((move) => move[1] !== -1); } else
      if (x_ax === 7) { possibleOffsets.capture = possibleOffsets.capture.filter((move) => move[1] !== 1); }

      //remove possible first moves if piece hasMoved
      if (piece.hasMoved) { possibleOffsets.first = []; }

      //check color
      if (piece.color === "Dark") {
        if (compboard[y_ax - 1][x_ax].piece !== null) {
          possibleOffsets.move = [];
          possibleOffsets.first = [];
        }

        //if piece has not moved
        if (!piece.hasMoved) {
          if (
            compboard[y_ax - 1][x_ax].piece !== null ||
            compboard[y_ax - 2][x_ax].piece !== null
          ) {
            possibleOffsets.first = [];
          }

          if (compboard[y_ax - 1][x_ax].piece !== null) {
            possibleOffsets.move = [];
          }
        } else {
          possibleOffsets.first = [];
        }

        //if not an edge pawn
        if (x_ax !== 0 && x_ax !== 7) {
          //down/left
          if (
            compboard[y_ax - 1][x_ax - 1].piece === null ||
            compboard[y_ax - 1][x_ax - 1].piece.color === piece.color
          ) {
            possibleOffsets.capture = possibleOffsets.capture.filter((move) => move[1] !== -1);
          }

          //down/right
          if (
            compboard[y_ax - 1][x_ax + 1] === null ||
            compboard[y_ax - 1][x_ax + 1].piece?.color === piece.color
          ) {
            possibleOffsets.capture = possibleOffsets.capture.filter((move) => move[1] !== 1);
          }
        }

        //if not left edge
        if (x_ax !== 0 && (compboard[y_ax - 1][x_ax - 1].piece === null || compboard[y_ax - 1][x_ax - 1].piece.color === piece.color)) {
          possibleOffsets.capture = possibleOffsets.capture.filter((move) => move[1] !== -1);
        }

        if (x_ax !== 7 && (compboard[y_ax - 1][x_ax + 1].piece === null || compboard[y_ax - 1][x_ax + 1].piece?.color === piece.color)) {
          possibleOffsets.capture = possibleOffsets.capture.filter((move) => move[1] !== 1);
        }
      } else {

        if (![0, 7].includes(y_ax) && compboard[y_ax + 1][x_ax].piece !== null) { possibleOffsets.move = []; }

        if (!piece.hasMoved) {
          if (
            compboard[y_ax + 1][x_ax].piece !== null &&
            compboard[y_ax + 2][x_ax].piece !== null
          ) { possibleOffsets.first = possibleOffsets.first.filter((move) => move[0] !== 2); }

          if (compboard[y_ax + 1][x_ax].piece !== null) {
            possibleOffsets.first = possibleOffsets.first.filter((move) => move[0] !== 1);
          }
        }

        if (x_ax !== 0 && compboard[y_ax + 1][x_ax - 1].piece === null) {
          possibleOffsets.capture = possibleOffsets.capture.filter((move) => move[1] !== -1);
        }
        
        if (x_ax !== 7 && compboard[y_ax + 1][x_ax + 1].piece === null) {
          possibleOffsets.capture = possibleOffsets.capture.filter((move) => move[1] !== 1);
        }
        
      }
      
      if (
        x_ax !== 0 &&
        compboard[y_ax][x_ax - 1].piece?.isEnPassantable // adjacent en pessantable pawn
      ) { possibleOffsets.capture.push([(piece.color === "Dark" ? -1 : 1), -1]); }

      if (
        x_ax !== 7 &&
        compboard[y_ax][x_ax + 1].piece?.isEnPassantable // adjacent en pessantable pawn
      ) { possibleOffsets.capture.push([(piece.color === "Dark" ? -1 : 1), 1]); }
      
      let flat = [];
      Object.keys(possibleOffsets).forEach((key) => {
        if (possibleOffsets[key] && possibleOffsets[key] !== null) {
          if (Array.isArray(possibleOffsets[key][0])) {
            flat.push(...possibleOffsets[key]);
          } else {
            flat.push(possibleOffsets[key]);
          }
        }
      });

      possibleOffsets = filterChecks(piece, flat.filter((i) => !isNaN(i[0])), [y_ax, x_ax]);

      return possibleOffsets;
    case Rook:
      if (y_ax === 7) { possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0); } else
      if (y_ax === 0) { possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0); }

      if (x_ax === 7) { possibleOffsets = possibleOffsets.filter((move) => move[1] <= 0); } else
      if (x_ax === 0) { possibleOffsets = possibleOffsets.filter((move) => move[1] >= 0); }

      
      //search distance up
      if (y_ax !== 7) {
        found = false;
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
            distance = y;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => move[0] <= distance);
      }

      //search distance down
      if (y_ax !== 0) {
        found = false;
        distance = 0;
        for (let y = 1; y <= y_ax && found === false; y++) {
          if (compboard[y_ax - y][x_ax].piece) {
            found = true;
            if (compboard[y_ax - y][x_ax].piece.color !== piece.color) {
              distance = y;
            } else {
              distance = y - 1;
            }
          } else {
            distance = y;
          }
        }

        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter((move) => (
          move[0] >= 0 - distance ||
          move[1] !== 0 ||
          move[0] > 0
        ));
      }

      //search distance left
      if (x_ax !== 0) {
        found = false;
        distance = 0;
        for (let x = 1; x <= x_ax && found === false; x++) {
          if (compboard[y_ax][x_ax - x].piece !== null) {
            found = true;
            if (compboard[y_ax][x_ax - x].piece.color !== piece.color) {
              distance = x;
            } else {
              distance = x - 1;
            }
          } else {
            distance = x;
          }
        }

        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter((move) => -move[1] <= distance);
      }

      //search distance right
      if (x_ax !== 7) {
        found = false;
        distance = 0;
        for (let x = 1; x < 8 - x_ax && found === false; x++) {
          if (compboard[y_ax][x_ax + x].piece !== null) {
            found = true;
            if (compboard[y_ax][x_ax + x].piece.color !== piece.color) {
              distance = x;
            } else {
              distance = x - 1;
            }
          } else {
            distance = x;
          }
        }
        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter((move) => move[1] <= distance);
      }

      possibleOffsets = filterChecks(piece, possibleOffsets, [y_ax, x_ax]);

      return possibleOffsets;
    case Knight:
      //filter y edges
      if (y_ax === 1) { possibleOffsets = possibleOffsets.filter((move) => move[0] !== -2); } else
      if (y_ax === 6) { possibleOffsets = possibleOffsets.filter((move) => move[0] !== 2); } else
      if (y_ax === 0) { possibleOffsets = possibleOffsets.filter((move) => move[0] > 0); } else
      if (y_ax === 7) { possibleOffsets = possibleOffsets.filter((move) => move[0] < 0); }

      //filter x edges
      if (x_ax === 1) { possibleOffsets = possibleOffsets.filter((move) => move[1] !== -2); } else
      if (x_ax === 6) { possibleOffsets = possibleOffsets.filter((move) => move[1] !== 2); } else
      if (x_ax === 0) { possibleOffsets = possibleOffsets.filter((move) => move[1] > 0); } else
      if (x_ax === 7) { possibleOffsets = possibleOffsets.filter((move) => move[1] < 0); }

      //filter final position
      possibleOffsets.forEach((move) => {
        let dest = compboard[y_ax + move[0]][[x_ax + move[1]]];
        if (dest.piece !== null) {
          possibleOffsets = possibleOffsets.filter((offset) => {
            if (compboard[y_ax + offset[0]][[x_ax + offset[1]]].piece) {
              return (
                compboard[y_ax + offset[0]][[x_ax + offset[1]]].piece.color !== piece.color
              );
            } else {
              return true;
            }
          });
        }
      });

      possibleOffsets = filterChecks(piece, possibleOffsets, [y_ax, x_ax]);

      return possibleOffsets;
    case Bishop:
      //check corners
      if (coordCompare([y_ax, x_ax], [0, 0])) { possibleOffsets = possibleOffsets.filter((move) => move[0] > 0 && move[1] > 0); }
      if (coordCompare([y_ax, x_ax], [0, 7])) { possibleOffsets = possibleOffsets.filter((move) => move[0] > 0 && move[1] < 0); }
      if (coordCompare([y_ax, x_ax], [7, 0])) { possibleOffsets = possibleOffsets.filter((move) => move[0] < 0 && move[1] > 0); }
      if (coordCompare([y_ax, x_ax], [7, 7])) { possibleOffsets = possibleOffsets.filter((move) => move[0] < 0 && move[1] < 0); }        

      //check edges
      if (y_ax === 7) { possibleOffsets = possibleOffsets.filter((move) => move[0] < 0); }
      if (y_ax === 0) { possibleOffsets = possibleOffsets.filter((move) => move[0] > 0); }
      if (x_ax === 7) { possibleOffsets = possibleOffsets.filter((move) => move[1] < 0); }
      if (x_ax === 0) { possibleOffsets = possibleOffsets.filter((move) => move[1] > 0); }

      //filter up/left
      if (!coordCompare([y_ax, x_ax], [7, 0])) {
        distance = 0;
        found = false;

        for (let i = 1; i < 8 - y_ax && i < x_ax + 1 && found === false; i++) {
          if (compboard[y_ax + i][x_ax - i].piece !== null) {
            found = true;
            if (compboard[y_ax + i][x_ax - i].piece.color !== piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          (move[0] === 0 - move[1] && move[0] <= distance) ||
          (move[0] <= distance && move[1] <= -distance) ||
          move[0] === 0 ||
          move[1] === 0 ||
          move[1] >= 0 ||
          move[0] <= 0
        ));
      }

      //filter up/right
      if (!coordCompare([y_ax, x_ax], [7, 7])) {
        distance = 0;
        found = false;

        for (let i = 1; i < 8 - y_ax && i < 8 - x_ax && found === false; i++) {
          if (compboard[y_ax + i][x_ax + i].piece !== null) {
            found = true;
            if (compboard[y_ax + i][x_ax + i].piece.color !== piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          (move[0] <= distance && move[1] <= distance) ||
          move[0] === 0 || move[1] === 0 ||
          move[0] !== move[1] ||
          move[0] <= 0 ||
          move[1] <= 0
        ));
      }

      //filter down/left
      if (!coordCompare([y_ax, x_ax], [0, 0])) {
        distance = 0;
        found = false;

        for (let i = 1; i <= x_ax && i <= y_ax && found === false; i++) {
          if (compboard[y_ax - i][x_ax - i].piece !== null) {
            found = true;
            if (compboard[y_ax - i][x_ax - i].piece.color !== piece.color) {
              distance = i ;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          (move[0] >= -distance && move[1] >= -distance) ||
          move[0] > 0 ||
          move[1] > 0
        ));
      }

      //filter down/right
      if (!coordCompare([y_ax, x_ax], [0, 7])) {
        distance = 0;
        found = false;

        for (let i = 1; i <= y_ax && i < 8 - x_ax && found === false; i++) {
          if (compboard[y_ax - i][x_ax + i].piece !== null) {
            found = true;
            if (compboard[y_ax - i][x_ax + i].piece.color !== piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => {
          return (move[0] >= -distance && move[1] <= distance) ||
            move[0] >= 0 ||
            move[1] <= 0
        });
      }

      possibleOffsets = filterChecks(piece, possibleOffsets, [y_ax, x_ax]);
      
      return possibleOffsets;
    case Queen:
      //check for corners
      if (coordCompare([y_ax, x_ax], [0, 0])) { possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0 && move[1] >= 0); } else
      if (coordCompare([y_ax, x_ax], [0, 7])) { possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0 && move[1] <= 0); } else
      if (coordCompare([y_ax, x_ax], [7, 0])) { possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0 && move[1] >= 0); } else
      if (coordCompare([y_ax, x_ax], [7, 7])) { possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0 && move[0] <= 0); }

      //check for edge
      if (y_ax === 0) { possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0); }
      if (y_ax === 7) { possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0); }
      if (x_ax === 0) { possibleOffsets = possibleOffsets.filter((move) => move[1] >= 0); }
      if (x_ax === 7) { possibleOffsets = possibleOffsets.filter((move) => move[1] <= 0); }

      //filter up
      if (y_ax !== 7) {
        distance = 0;
        found = false;

        for (let y = 1; y < 8 - y_ax && found === false; y++) {
          if (compboard[y_ax + y][x_ax].piece) {
            found = true;
            if (compboard[y_ax + y][x_ax].piece.color !== piece.color) {
              distance = y + 1;
            } else {
              distance = y;
            }
          } else {
            distance = y + 1;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => move[0] < distance || move[1] !== 0);
      }
      
      //filter down
      if (y_ax !== 0) {
        distance = 0;
        found = false;

        for (let y = 1; y <= y_ax && found === false; y++) {
          if (compboard[y_ax - y][x_ax].piece) {
            found = true;
            if (compboard[y_ax - y][x_ax].piece.color !== piece.color) {
              distance = y;
            } else {
              distance = y - 1;
            }
          } else {
            distance = y;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0 - distance || move[1] !== 0);
      }

      //filter left
      if (x_ax !== 0) {
        distance = 0;
        found = false;

        for (let x = 1; x <= x_ax && found === false; x++) {
          if (compboard[y_ax][x_ax - x].piece !== null) {
            found = true;
            if (compboard[y_ax][x_ax - x].piece.color !== piece.color) {
              distance = x;
            } else {
              distance = x - 1;
            }
          } else {
            distance = x;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => move[0] !== 0 || move[1] >= 0 - distance);
      }

      //filter right
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
            distance = x;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          move[0] !== 0 ||
          move[1] <= distance ||
          move[1] <= 0
        ));
      }

      //filter up/right
      if (!coordCompare([y_ax, x_ax], [7, 7])) {
        distance = 0;
        found = false;

        for (let i = 1; i < 8 - y_ax && i < 8 - x_ax && found === false; i++) {
          if (compboard[y_ax + i][x_ax + i].piece !== null) {
            found = true;
            if (compboard[y_ax + i][x_ax + i].piece.color !== piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          (move[0] <= distance && move[1] <= distance) ||
          move[0] !== move[1] ||
          move[0] === 0 ||
          move[1] === 0 ||
          move[0] <= 0 ||
          move[1] <= 0
        ));
      }

      //filter up/left
      if (!coordCompare([y_ax, x_ax], [7, 0])) {
        distance = 0;
        found = false;

        for (let i = 1; i < 8 - y_ax && i < x_ax + 1 && found === false; i++) {
          if (compboard[y_ax + i][x_ax - i].piece !== null) {
            found = true;
            if (compboard[y_ax + i][x_ax - i].piece.color !== piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
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

        for (let i = 1; i <= y_ax && i < 8 - x_ax && found === false; i++) {
          if (compboard[y_ax - i][x_ax + i].piece !== null) {
            found = true;
            if (compboard[y_ax - i][x_ax + i].piece.color !== piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => (
          (-move[0] === move[1] && move[1] <= distance) ||
          (move[0] === -move[1] && move[1] <= distance) ||
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

        for (let i = 1; i <= x_ax && i <= y_ax && found === false; i++) {
          if (compboard[y_ax - i][x_ax - i].piece !== null) {
            found = true;
            if (compboard[y_ax - i][x_ax - i].piece.color !== piece.color) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i;
          }
        }
        
        possibleOffsets = possibleOffsets.filter((move) => ( //pretty sure this works :P
          (move[0] >= -distance && move[1] >= -distance) ||
          move[0] !== move[1] ||
          move[0] === 0 ||
          move[1] === 0 ||
          move[0] >= 0 ||
          move[1] >= 0
        )
);
      }

      possibleOffsets = filterChecks(piece, possibleOffsets, [y_ax, x_ax]);


      return possibleOffsets;
    case King:
      //check for corners
      if (coordCompare([y_ax, x_ax], [0, 0])) { possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0 && move[1] >= 0); } else
      if (coordCompare([y_ax, x_ax], [0, 7])) { possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0 && move[1] <= 0); } else
      if (coordCompare([y_ax, x_ax], [7, 0])) { possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0 && move[1] >= 0); } else
      if (coordCompare([y_ax, x_ax], [7, 7])) { possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0 && move[0] <= 0); }

      //check for y edges
      if (y_ax === 0) { possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0); } else
      if (y_ax === 7) { possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0); }

      //check for x edges
      if (x_ax === 0) { possibleOffsets = possibleOffsets.filter((move) => move[1] >= 0); } else
      if (x_ax === 7) { possibleOffsets = possibleOffsets.filter((move) => move[1] <= 0); }

      //check for piece up 
      if (y_ax !== 7 && compboard[y_ax + 1][x_ax].piece?.color === piece.color) {
        possibleOffsets = possibleOffsets.filter((move) => move[0] !== 1 || move[1] !== 0);
      }

      //check for piece down
      if (y_ax !== 0 && compboard[y_ax - 1][x_ax].piece?.color === piece.color) {
        possibleOffsets = possibleOffsets.filter((move) => move[0] !== -1 || move[1] !== 0);
      }

      //check for piece right
      if (x_ax !== 0  && compboard[y_ax][x_ax + 1].piece?.color === piece.color) {
        possibleOffsets = possibleOffsets.filter((move) => move[0] !== 0 || move[1] !== 1);
      }
      
      //check for piece left
      if (x_ax !== 0 && compboard[y_ax][x_ax - 1].piece?.color === piece.color) {
        possibleOffsets = possibleOffsets.filter((move) => move[0] !== 0 || move[1] !== -1);
      }
      
      //check for piece up/right
      if (y_ax !== 7 && x_ax !== 7 && compboard[y_ax + 1][x_ax + 1].piece?.color === piece.color) {
        // possibleOffsets = possibleOffsets.filter((move) => move[0] !== move[1] || move[0] !== Math.abs(move[0]));
        possibleOffsets = possibleOffsets.filter((move) => move[0] !== 1 || move[1] !== 1);
      }
      
      //check for piece up/left
      if (y_ax !== 7 && x_ax !== 0 && compboard[y_ax + 1][x_ax - 1].piece?.color === piece.color) {
        possibleOffsets = possibleOffsets.filter((move) => move[0] !== 1 || move[1] !== -1);
      }

      //check for piece down/right
      if (y_ax !== 0 && x_ax !== 7 && compboard[y_ax - 1][x_ax + 1].piece?.color === piece.color) {
        possibleOffsets = possibleOffsets.filter((move) => move[0] !== -1 || move[1] !== 1);
      }

      //check for piece down/left
      if (y_ax !== 0 && x_ax !== 0 && compboard[y_ax - 1][x_ax - 1].piece?.color === piece.color) {
        possibleOffsets = possibleOffsets.filter((move) => move[0] !== -1 || move[1] !== -1);
      }

      let castles = getCastles(piece);

      if (castles !== -1) {
        let kingside = false;
        let queenside = false;

        castles.forEach((c) => {
          if (c.toLowerCase() === "k" && !kingside) {
            possibleOffsets.push([0, 2]);
            kingside = true;
          }
          if (c.toLowerCase() === "q" && !queenside) {
            possibleOffsets.push([0, -2]);
            queenside = true;
          }
        });
      }

      possibleOffsets = filterChecks(piece, possibleOffsets, [y_ax, x_ax]);
      
      return possibleOffsets;
    default:
      return;
  }
}
