import { Pawn, Rook, Knight, Bishop, Queen, King } from "./classes.js";

const DarkKing = new King("Dark");
const LightKing = new King("Light");

const DarkQueen = new Queen("Dark");
const LightQueen = new Queen("Light");

const DarkKingsBishop = new Bishop("Dark", "King");
const DarkQueensBishop = new Bishop("Dark", "Queen");
const LightKingsBishop = new Bishop("Light", "King");
const LightQueensBishop = new Bishop("Light", "Queen");

// DarkKingsBishop.location = DarkKingsBishop.defaultPos;
// DarkQueensBishop.location = DarkQueensBishop.defaultPos;
// LightKingsBishop.location = LightKingsBishop.defaultPos;
// LightQueensBishop.location = LightQueensBishop.defaultPos;

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

export default pieces;
