import { Pawn, Rook, Knight, Bishop, King, Queen } from "../data/classes.js";

export default function (letter) {
  switch (letter.toLowerCase()) {
    case "p":
      return Pawn;
    case "r":
      return Rook;
    case "n":
      return Knight;
    case "b":
      return Bishop;
    case "q":
      return Queen;
    case "k":
      return King;
    default:
      return false;
  }
}
