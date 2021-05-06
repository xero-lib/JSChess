export default coordToPiece = (coord) => {
    let atc = alphaToCoord(coord);
    if (atc) {
      return compboard[atc[0]][atc[1]].piece;
    } else {
      return false;
    }
  };