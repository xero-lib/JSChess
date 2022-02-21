import { Pawn } from "../data/classes.js";
import calcOffsets from "./calcOffsets.js";

export default function calcMoves(piece) {
  if (piece === null) return;

  let [y_ax, x_ax] = piece.location;
  let ao = calcOffsets(piece); //available offsets

  let pm = []; //possible moves

  if (Object.keys(ao).length == 0) {
    return [];
  }

  if (piece.constructor == Pawn) {
    let allMoves = [];

    Object.keys(ao).forEach((key) => {
      if (ao[key] != null && ao[key].length != 0) {
        Array.isArray(ao[key][0]) // a little dangerous
          ? allMoves.push(...ao[key])
          : allMoves.push(ao[key]);
      }
    });

    allMoves.forEach((offset) => {
      if (offset.length != 0) {
        pm.push([y_ax + offset[0], x_ax + offset[1]]);
      }
    });
  } else {
    ao.forEach((offset, _idx, array) => {
      if (offset.length > 1) {
        pm.push([y_ax + offset[0], x_ax + offset[1]]);
      } else {
        pm.push([y_ax + array[0], x_ax + array[1]]);
      }
    });
  }
  // console.log(pm);
  return pm;
}
