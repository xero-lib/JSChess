//duplicate of calcOffsets except it counts own pieces. It can all be consolidated at some point.

import { Pawn, Rook, Knight, Bishop, Queen, King } from "../data/classes.js";
import board from "../board/compboard.js"

export default function(piece, compboard = board) {
  let watches = [];
  let currentMove = [];
  let possibleOffsets;
  if (piece.constructor == Pawn) possibleOffsets = {...piece.offsets};
  else possibleOffsets = [...piece.offsets];
  let [y_ax, x_ax] = piece.location;
  let found = false;
  let distance = 0;

  if (y_ax == undefined || x_ax == undefined) return null;

  switch (piece.constructor) {
    case Pawn:
      //autofilter forward
      possibleOffsets.move = null;
      possibleOffsets.first = null;
      
      //check for edge pawn
      if (x_ax === 0)
        possibleOffsets.capture = possibleOffsets.capture?.filter(
          (move) => move[1] !== -1
        );

      if (x_ax === 7)
        possibleOffsets.capture = possibleOffsets.capture?.filter(
          (move) => move[1] !== 1
        );
      possibleOffsets.capture?.forEach((offset) => {
        if(offset !== null) currentMove = [y_ax + offset[0], x_ax + offset[1]]
        if(currentMove) watches.push(currentMove); 
      });

      return watches;
    case Rook:
      if (y_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[0] <= 0);
      if (y_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[0] >= 0);
      if (x_ax == 7)
        possibleOffsets = possibleOffsets.filter((move) => move[1] <= 0);
      if (x_ax == 0)
        possibleOffsets = possibleOffsets.filter((move) => move[1] >= 0);

      //search distance up
      if (y_ax !== 7) {
        distance = 0;
        found = false;
        for (let y = 1; y < 7-y_ax && found === false; y++) {
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
        for (let y = 1; y <= y_ax  && found === false; y++) {
          if (compboard[y_ax - y][x_ax]?.piece !== null) {
            found = true;
          }
          distance = y;
        }

        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter((move) => -move[0] <=  distance || move[1] != 0 || move[0] >=0);
      }
      
      //search distance left
      if (x_ax !== 0) {
        distance = 0;
        found = false;
        for (let x = 1; x <= x_ax && found === false; x++) {
          if (compboard[y_ax][x_ax - x]?.piece !== null) {
            found = true;
          }
          distance = x;
        }

        //filter impossible offsets
        possibleOffsets = possibleOffsets.filter((move) => -move[1] <= distance || move[0] != 0);
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
        possibleOffsets = possibleOffsets.filter(
          (move) => move[1] <= distance
        );
      }
      
      possibleOffsets.forEach((offset) => {
        currentMove = [y_ax + offset[0], x_ax + offset[1]]
        if(currentMove) watches.push(currentMove); 
      });

      return watches;
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

      possibleOffsets.forEach((offset) => {
        currentMove = [y_ax + offset[0], x_ax + offset[1]]
        if(currentMove) watches.push(currentMove); 
      });

      return watches;
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
          }
          distance = i;
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
          }
          distance = i;
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

        for (let i = 1; i <= x_ax && i <= y_ax && found === false; i++) {
          if (compboard[y_ax - i][x_ax - i]?.piece !== null && compboard[y_ax - i][x_ax - i]?.piece !== undefined ) {
            found = true;
          }
          distance = i;
        }
        
        possibleOffsets = possibleOffsets.filter((move) => {
          if (-move[0] >= distance && -move[1] <= distance) {
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
          }
          distance = i;
        }

        //! probably an issue
        possibleOffsets = possibleOffsets.filter((move) => (move[0] >= 0 - distance && move[1] <= distance) || move[0] >= 0 || move[1] <= 0 );
      }

      possibleOffsets.forEach((offset) => {
        currentMove = [y_ax + offset[0], x_ax + offset[1]]
        if(currentMove) watches.push(currentMove); 
      });

      return watches;
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
          }
          distance = y + 1;
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
          }
          distance = y_ax - y;
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
          }
          distance = x_ax - x + 1;
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
          }
          distance = x;  
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
          }
          distance = i;
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
          }
          distance = i;
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
          }
          distance = i;
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
          }
          distance = i;
        }

        possibleOffsets = possibleOffsets.filter((move) => {
          if (move[0] != move[1]) {
            return move;
          }

          if (move[0] >= 0 - distance && move[1] <= 0 - distance) {
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
      
      
      watches = [];
      currentMove;
      possibleOffsets.forEach((offset) => {
        currentMove = [y_ax + offset[0], x_ax + offset[1]]
        if(currentMove) watches.push(currentMove); 
      });

      return watches;
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

      
      watches = [];
      currentMove;
      possibleOffsets.forEach((offset) => {
        currentMove = [y_ax + offset[0], x_ax + offset[1]]
        if(currentMove) watches.push(currentMove); 
      });

      return watches;
    default:
      return;
  }
}
