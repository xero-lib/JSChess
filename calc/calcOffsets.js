//todo fix rook, moving right, down... broken

import { Pawn, Rook, Knight, Bishop, Queen, King } from "../data/classes.js";
import refreshBoard from "../util/refreshBoard.js";
import compboard from "../board/compboard.js";
import assignWatches from "../util/assignWatches.js";

export default function(piece) {
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
            possibleOffsets.move = possibleOffsets.move.filter(
              (move) => move[0] != -1
            );
          }
        }
        
        if (
          x_ax !== 0 &&
          x_ax !== 7
        ) {
          if (
            compboard[y_ax - 1][x_ax - 1].piece === null ||
            compboard[y_ax - 1][x_ax - 1].piece.color == piece.color
          ) {
            possibleOffsets.capture = possibleOffsets.capture.filter(
              (move) => move[1] != -1
            );
          }

          if (
            compboard[y_ax - 1][x_ax + 1] === null ||
            compboard[y_ax - 1][x_ax + 1].piece.color == piece.color
					) {
            possibleOffsets.capture = possibleOffsets.capture.filter(
              (move) => move[1] != 1
            );
          }
        }

        if (
          x_ax !== 0 &&
          (
            compboard[y_ax - 1][x_ax - 1].piece === null ||
            compboard[y_ax - 1][x_ax - 1].piece.color == piece.color
          )
				) {
          possibleOffsets.capture = possibleOffsets.capture.filter(
            (move) => move[1] != -1
          );
        }

        if (
          (x_ax !== 7 &&
            compboard[y_ax - 1][x_ax + 1].piece === null) ||
            compboard[y_ax - 1][x_ax + 1] ?.piece.color != piece.color
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
          x_ax !==
          7 /* (implement en passant) && 
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
        if (
          x_ax !== 0 &&
          compboard[y_ax + 1][x_ax - 1].piece === null
        ) {
          possibleOffsets.capture = possibleOffsets.capture.filter(
            (move) => move[1] != -1
          );
        }

        if (
          x_ax !== 7 &&
          compboard[y_ax + 1][x_ax + 1].piece === null
        ) {
          possibleOffsets.capture = possibleOffsets.capture.filter(
            (move) => move[1] != 1
          );
        }

        //implement en passant
      }
      if (possibleOffsets.capture.length === 1) possibleOffsets.capture = possibleOffsets.capture[0];
      
      console.log(possibleOffsets);
      return possibleOffsets;
    case Rook:
      if (y_ax == 7)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] <= 0
        );
      if (y_ax == 0)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0
        );
      if (x_ax == 7)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[1] <= 0
        );
      if (x_ax == 0)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[1] >= 0
        );

      found = false;
      distance = 0;

      //search distance up
      if (y_ax !== 7) {
        distance = 0;
        for (let y = 1; y < 8 - y_ax && found === false; y++) {
          if (compboard[y_ax + y][x_ax].piece !== null) {
            found = true;
            if (
              compboard[y_ax + y][x_ax].piece.color !==
              piece.color
            ) {
              distance = y;
            } else {
              distance = y - 1;
            }
          } else {
            distance = y;
          }
        }

        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] <= distance
        );
      }

      //search distance down
      if (y_ax !== 0) {
        distance = 0;
        found = false;
        for (let y = 1; y <= y_ax && found === false; y++) {
          if (compboard[y_ax - y][x_ax]?.piece !== null && compboard[y_ax - y][x_ax]?.piece !== undefined) {
            found = true;
            if (
              compboard[y_ax - y][x_ax].piece.color !==
              piece.color
            ) {
              distance = y;
            } else {
              distance = y_ax - 1 - y - 1;
            }
          } else {
            distance = y;
          }
        }

        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0 - distance || move[1] != 0 || move[0] > 0
        );
      }
      
      //search distance left
      if (x_ax !== 0) {
        distance = 0;
        found = false;
        for (let x = 1; x <= x_ax && found === false; x++) {
          if (compboard[y_ax][x_ax - x].piece !== null) {
            found = true;
            if (compboard[y_ax][x_ax - x].piece.color !== piece.color) {
              distance = x;
            } else {
              distance = x + 1;
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
        distance = 0;
        found = false;
        for (let x = 1; x < 8 - x_ax && found === false; x++) {
          if (compboard[y_ax][x_ax + x].piece !== null) {
            found = true;
            if (
              compboard[y_ax][x_ax + x].piece.color !==
              piece.color
            ) {
              distance = x;
            } else {
              distance = x - 1;
            }
          } else {
            distance = x;
          }
        }
        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter(
          (move) => move[1] <= distance
        );
      }

      return possibleOffsets;
    case Knight:
      //filter y edges
      if (y_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[0] > 0);
      if (y_ax == 1)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] !== -2
        );
      if (y_ax == 6)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] !== 2
        );
      if (y_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[0] < 0);

      //filter x edges
      if (x_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[1] > 0);
      if (x_ax == 1)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[1] !== -2
        );
      if (x_ax == 6)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[1] !== 2
        );
      if (x_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[1] < 0);

      //filter final position
      possibleOffsets.forEach((move) => {
        let dest = compboard[y_ax + move[0]][[x_ax + move[1]]];
        if (dest.piece !== null) {
          possibleOffsets = possibleOffsets.filter((offset) => {
            if (
              compboard[y_ax + offset[0]][[x_ax + offset[1]]]
                .piece
            ) {
              return (
                compboard[y_ax + offset[0]][[x_ax + offset[1]]]
                  .piece.color !== piece.color
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
          (move) => move[0] > 0 || move[1] > 0
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

        for (
          let i = 1;
          i < 8 - y_ax && i < x_ax + 1 && found === false;
          i++
        ) {
          if (compboard[y_ax + i][x_ax - i].piece !== null) {
            found = true;
            if (
              compboard[y_ax + i][x_ax - i].piece.color !=
              piece.color
            ) {
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
            return move;
          }

          if (move[0] < distance && move[1] < 0 - distance) {
            return move;
          }
          if (move[0] == 0 || move[1] == 0) {
            return move;
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

        for (
          let i = 1;
          i < 8 - y_ax && i < 8 - x_ax && found === false;
          i++
        ) {
          if (compboard[y_ax + i][x_ax + i].piece !== null) {
            found = true;
            if (
              compboard[y_ax + i][x_ax + i].piece.color !=
              piece.color
            ) {
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
            return move;
          }

          if (move[0] <= distance && move[1] <= distance) {
            return move;
          }

          if (move[0] == 0 || move[1] == 0) {
            return move;
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
            if (
              compboard[y_ax - i][x_ax - i].piece.color !=
              piece.color
            ) {
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

      //filter down/right //! brobably broken
      if ([y_ax, x_ax] != [0, 7]) {
        distance = 0;
        found = false;

        for (
          let i = 1;
          i < y_ax && i < 8 - x_ax && found === false;
          i++
        ) {
          if (compboard[y_ax - i][x_ax + i].piece !== null) {
            found = true;
            if (
              compboard[y_ax - i][x_ax + i].piece.color !=
              piece.color
            ) {
              distance = i;
            } else {
              distance = i - 1;
            }
          } else {
            distance = i - 1;
          }
        }

        //! probably an issue
        possibleOffsets = possibleOffsets.filter((move) => (move[0] >= 0 - distance && move[1] <= distance) || move[0] >= 0 || move[1] <= 0 );
      }
      return possibleOffsets;
    case Queen:
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
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0
        );
      if (y_ax == 7)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] <= 0
        );
      if (x_ax == 0)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[1] >= 0
        );
      if (x_ax == 7)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[1] <= 0
        );

      //filter up
      if (y_ax != 7) {
        distance = 0;
        found = false;

        for (let y = 1; y < 8 - y_ax && found === false; y++) {
          if (compboard[y_ax + y][x_ax].piece) {
            found = true;
            if (
              compboard[y_ax + y][x_ax].piece.color != piece.color
            ) {
              distance = y + 1;
            } else {
              distance = y;
            }
          } else {
            distance = y;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] < distance || move[1] !== 0) {
            return move;
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
              distance = y_ax - y;
            } else {
              distance = y_ax - y - 1;
            }
          } else {
            distance = y_ax - y;
          }
        }

        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] >= 0 - distance || move[1] !== 0) {
            return move;
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
        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] !== 0 || move[1] >= 0 - distance) {
            return move;
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
            if (
              compboard[y_ax][x_ax + x].piece.color != piece.color
            ) {
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
            return move;
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

        for (
          let i = 1;
          i < 8 - y_ax && i < 8 - x_ax && found === false;
          i++
        ) {
          if (compboard[y_ax + i][x_ax + i].piece !== null) {
            found = true;
            if (
              compboard[y_ax + i][x_ax + i].piece.color !=
              piece.color
            ) {
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
            return move;
          }

          if (move[0] <= distance && move[1] <= distance) {
            return move;
          }

          if (move[0] == 0 || move[1] == 0) {
            return move;
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

        for (
          let i = 1;
          i < 8 - y_ax && i < x_ax + 1 && found === false;
          i++
        ) {
          if (compboard[y_ax + i][x_ax - i].piece !== null) {
            found = true;
            if (
              compboard[y_ax + i][x_ax - i].piece.color !=
              piece.color
            ) {
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
            return move;
          }

          if (move[0] < distance && move[1] < 0 - distance) {
            return move;
          }
          if (move[0] == 0 || move[1] == 0) {
            return move;
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

        for (
          let i = 1;
          i < y_ax + 1 && i < 8 - x_ax && found === false;
          i++
        ) {
          if (compboard[y_ax - i][x_ax + i].piece !== null) {
            found = true;
            if (
              compboard[y_ax - i][x_ax + i].piece.color !=
              piece.color
            ) {
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
            return move;
          }

          if (move[0] == -move[1] && move[1] < distance) {
            return move;
          }

          if (move[0] == 0 || move[1] == 0) {
            return move;
          }

          if (move[0] >= 0) {
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
            if (
              compboard[y_ax - i][x_ax - i].piece.color !=
              piece.color
            ) {
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
            return move;
          }

          if (move[0] > 0 - distance && move[1] < 0 - distance) {
            return move;
          }
          
          if (move[0] == 0 || move[1] == 0) {
            return move;
          }

          if (move[0] >= 0) {
            return move;
          }

          if (move[1] >= 0) {
            return move;
          }
        });
      }
      
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
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] >= 0
        );
      else if (y_ax == 7)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[0] <= 0
        );
      if (x_ax == 0)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[1] >= 0
        );
      else if (x_ax == 7)
        possibleOffsets = possibleOffsets.filter(
          (move) => move[1] <= 0
        );

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
      if ([y_ax, x_ax] != [7, 7] && (y_ax != 7 && x_ax != 7)) {
        if (y_ax == 0) {
          possibleOffsets = possibleOffsets.filter(
            (move) => move[0] < 0
          );
        } else if (x_ax == 0) {
          possibleOffsets = possibleOffsets.filter(
            (move) => move[1] < 0
          );
        } else if (compboard[y_ax + 1][x_ax + 1] ?.piece !== null) {
          if (
            compboard[y_ax + 1][x_ax + 1].piece.color == piece.color
          ) {
            possibleOffsets = possibleOffsets.filter(
              (move) => move[0] != 1 && move[1] != 1
            );
          }
        }
      }

      //check for piece up/left
      if ([y_ax, x_ax] != [7, 0] && (y_ax != 7 && x_ax != 0)) {
        if (y_ax == 0) {
          possibleOffsets = possibleOffsets.filter(
            (move) => move[0] < 0
          );
        } else if (x_ax == 0) {
          possibleOffsets = possibleOffsets.filter(
            (move) => move[1] < 0
          );
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
          possibleOffsets = possibleOffsets.filter(
            (move) => move[0] < 0
          );
        } else if (x_ax == 0) {
          possibleOffsets = possibleOffsets.filter(
            (move) => move[1] < 0
          );
        } else if (compboard[y_ax - 1][x_ax + 1].piece !== null) {
          if (
            compboard[y_ax - 1][x_ax + 1].piece.color == piece.color
          ) {
            possibleOffsets = possibleOffsets.filter(
              (move) => move[0] != -1 && move[1] != 1
            );
          }
        }
      }

      //check for piece down/left
      if ([y_ax, x_ax] != [0, 0]) {
        if (y_ax == 0) {
          possibleOffsets = possibleOffsets.filter(
            (move) => move[0] < 0
          );
        } else if (x_ax == 0) {
          possibleOffsets = possibleOffsets.filter(
            (move) => move[1] < 0
          );
        } else if (compboard[y_ax - 1][x_ax - 1].piece !== null) {
          if (
            compboard[y_ax - 1][x_ax - 1].piece.color == piece.color
          ) {
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
}
