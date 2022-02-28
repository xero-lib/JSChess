# JSChess

A JavaScript chessboard program.

## Basic Use

- Inside of index.js, you may list (in order) the moves to be made on the board, alternating between light and dark, with the `makeMove("start square", "end square")` function, with start `"start square"` and `"end square"` both being LetterNumber square coordinates.

- You can optionally set board state from a [FEN String](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) by using the `set_FEN("FEN string")` function.

## API

- `getBoardJSON()`

  - Allows you to get the current board state in form of an 8x8 2D array, the first dimension being the rows of the y axis and the second being each square along the x.

  - Each square has a `color` (either '#' (dark) or ' ' (light)) and a `coordinate` in the form of LetterNumber, and a `piece`. If there is not currently a piece on a given square, the `piece` value will be equal to `null`. Otherwise, it will have a piece object.

- `makeMove()`

  - Takes 2 parameters, a start and end position, both in "LetterNumber" format (ex. `makeMove("e2", "e4")`). If the move is illegal or there is no piece on the starting square, makeMove will return -1. If it is not the players turn, it will return -2. If the input is invalid, it will return -3.

- `getPly()`

  - Returns the current ply, being either `"Light"` or `"Dark"`.

- `resetBoard()`

  - Resets all pieces to their default starting positions.

- `clearBoard()`

  - Removes all pieces from the board. Implemented by default in `set_FEN()`.

- `get_FEN()`

  - Returns the FEN String representation of the current board state.

- `set_FEN()`

  - Sets the board state from any valid [FEN String](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) (ex. `set_FEN("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 0")`)

- `coordToAlpha()`

  - Converts an array of [y, x] (being a valid board coordinate) into a LetterNumber result.
  - For use in `makeMove()` given it only takes LetterNumber for start and end. 
