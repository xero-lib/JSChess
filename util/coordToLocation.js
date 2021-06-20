import alphaToCoord from "./alphaToCoord.js";
import compboard from "../board/compboard.js";

export default function coordToLocation(coord) {
  let atc = alphaToCoord(coord);
  if (!atc) return false;
  return compboard[atc[0]][atc[1]];
}
