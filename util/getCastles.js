import compboard from "../board/compboard.js";
import { King } from "../data/classes.js";
import calcWatches from "../calc/calcWatches.js";
import coordCompare from "./coordCompare.js";
import calcChecks from "../calc/calcChecks.js";

export default function getCastles(king) {
  //check if able to castle
  let carr = [];
  /* 
      check if king is in check
      check if !king.hasMoved && (!LeftRook.hasMoved || !RightRook.hasMoved) && make sure they're on the proper squares in case of a FEN or other error
      check if there are any pieces on the castling squares (remember the unused square on queenside)
      check if there are pieces watching the castling squares that the king would pass or land on (not the unused square on queenside)
    */

  if (king.hasMoved) {
    return -1;
  } //if king has moved, return

  let castles = {
    queen: true,
    king: true,
  };
  let rookCheck = (y, x) =>
    compboard[y][x].piece != null &&
    compboard[y][x].piece.symbol == "R" &&
    compboard[y][x].piece.hasMoved == false;

  if (
    compboard[king.color == "Dark" ? 7 : 0][4].piece.color !=
      (king.color == "Dark" ? "Dark" : "Light") ||
    compboard[king.color == "Dark" ? 7 : 0][4].piece.constructor != King ||
    compboard[king.color == "Dark" ? 7 : 0][6].piece != null ||
    compboard[king.color == "Dark" ? 7 : 0][5].piece != null ||
    compboard[king.color == "Dark" ? 7 : 0][3].piece != null ||
    compboard[king.color == "Dark" ? 7 : 0][2].piece != null ||
    compboard[king.color == "Dark" ? 7 : 0][1].piece != null ||
    calcChecks(king) ||
    (king.color == "Dark"
      ? !rookCheck(7, 7) || !rookCheck(7, 0)
      : !rookCheck(0, 7) || !rookCheck(0, 0))
  ) {
    //get all watches for opposing color
    for (let row of compboard) {
      // could use optimizing
      for (let sqr of row) {
        if (!sqr.piece || sqr.piece.color != king.color) {
          continue;
        }
        for (let watch in calcWatches(sqr.piece)) {
          if (
            !Array.isArray(watch) &&
            coordCompare(calcWatches(sqr.piece), king.location)
          ) {
            if (calcWatches(sqr.piece)[1] < 4) {
              castles.queen = false;
            } else {
              castles.king = false;
            }
          }

          let y = king.color == "Dark" ? 7 : 0;

          if (
            coordCompare(watch, [y, 2]) ||
            coordCompare(watch, [y, 3]) ||
            compboard[y][3].piece != null ||
            compboard[y][2].piece != null ||
            compboard[y][1].piece != null
          ) {
            castles.queen = false; // disallow queen side castling
          }

          if (
            coordCompare(watch, [y, 5]) ||
            coordCompare(watch, [y, 6]) ||
            compboard[y][6].piece != null ||
            compboard[y][5].piece != null
          ) {
            castles.king = false;
          }

          if (coordCompare(watch, [y, 4])) {
            castles.queen = false;
            castles.king = false;
          }
        }
      }
    }
  }

  if (castles.king) {
    carr.push(king.color == "Light" ? "K" : "k");
  }

  if (castles.queen) {
    carr.push(king.color == "Light" ? "Q" : "q");
  }

  return carr;
}
