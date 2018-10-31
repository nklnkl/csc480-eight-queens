import { Board, Tile } from './board';

class Bot {
  solutions: Array<Array<string>>;
  maxPieces: number;
  pieces: Array<Tile>;

  constructor (maxPieces: number) {
    this.maxPieces = maxPieces;
    this.solutions = new Array<Array<string>>();
    this.pieces = new Array<Tile>();
  }

  public start (board: Board): void {
    for (let i: number = 0; i < board.getSize(); i++) {
      for (let j: number = 0; j < board.getSize(); j++) {

        // Place piece and get result.
        let placed: boolean = this.addPiece(i, j, board);

        // If the piece wasn't placed.
        if (!placed) {

        }

        // If we have reached a solution.
        if (this.pieces.length == this.maxPieces) {
          this.solutions.push(board.print());
        }

      }
    }
  }

  public printSolutions (): void {
    this.s
  }

  public addPiece (row: number, col: number, board: Board): boolean {
    const result: boolean = board.update(row, col, true);
    return result;
  }

  public removePiece (row: number, col: number, board: Board): boolean {
    board.update(row, col, false);
    return true;
  }
}