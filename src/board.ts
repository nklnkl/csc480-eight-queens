export {
  Board
}

class Board {

  private tiles: Array<Array<boolean>>;
  private size: number;
  private letter: string;

  constructor(size: number, letter: string) {
    this.size = size;
    this.letter = letter;
    this.tiles = new Array<Array<boolean>>();

    for (let i: number = 0; i < this.size; i ++) {
      let row: Array<boolean> = new Array<boolean>();

      for (let j = 0; j < this.size; j++) {
        row.push(false);
      }

      this.tiles.push(row);
    }
  }

  public print (): Array<string> {
    let board: Array<string> = new Array<string>();

    this.tiles.forEach((row: Array<boolean>) => {

      let rowString: string = '';

      row.forEach((unit: boolean) => {
        if (!unit)
          rowString += '_ ';
        else
          rowString += this.letter + ' ';
      });

      board.push(rowString);

    });

    return board;
  }

  public update (row: number, col: number, value: boolean) {
    if (this.checkRow(row)) {
      this.tiles[row][col] = value;
      return true;
    }
    else {
      return false;
    }
  }

  public checkRow (row: number) {
    // If there is something already in this row.
    if (this.tiles[row].indexOf(true) != -1) {
      return false;
    }
    // Else if the row is free.
    else {
      return true;
    }
  }
}