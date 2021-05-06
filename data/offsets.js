let offsets = {
    king: [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ],
    rook: new Array(32), //assign after
    queen: [], //assign after
    bishop: new Array(32), //assign after
    knight: [
      [-1, -2],
      [1, -2],
      [-2, -1],
      [2, -1],
      [-2, 1],
      [2, 1],
      [-1, 2],
      [1, 2],
    ],
    pawn: {
      light: {
        first: [
          [2, 0],
          [1, 0],
        ],
        move: [1, 0],
        capture: [
          [1, -1],
          [1, 1],
        ],
      },
      dark: {
        first: [
          [-2, 0],
          [-1, 0],
        ],
        move: [-1, 0],
        capture: [
          [-1, -1],
          [-1, 1],
        ],
      },
    },
  };

  for (let i = 0; i < 8; i++) {
    offsets.rook[i] = [i + 1, 0];
    offsets.rook[i + 8] = [0, i + 1];
    offsets.rook[i + 16] = [0 - (i + 1), 0];
    offsets.rook[i + 24] = [0, 0 - (i + 1)];
  }
  //assign final bishop offsets
  for (let i = 0; i < 8; i++) {
    offsets.bishop[i] = [i + 1, i + 1];
    offsets.bishop[i + 8] = [0 - (i + 1), 0 - (i + 1)];
    offsets.bishop[i + 16] = [i + 1, 0 - (i + 1)];
    offsets.bishop[i + 24] = [0 - (i + 1), i + 1];
  }
  
  //assign final queen offsets
  offsets.queen.push(...offsets.rook, ...offsets.bishop);
  
  export default offsets;