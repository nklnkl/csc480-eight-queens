export {
  Board
}

interface Tile {
  row: number;
  col: number;
};

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

  public update (row: number, col: number, value: boolean): boolean {
    if (this.checkRow(row) && this.checkCol(col) && this.checkDiag(row, col)) {
      this.tiles[row][col] = value;
      return true;
    }
    else {
      return false;
    }
  }

  public checkRow (row: number): boolean {
    // If there is something already in this row.
    if (this.tiles[row].indexOf(true) != -1) {
      return false;
    }
    // Else if the row is free.
    else {
      return true;
    }
  }

  public checkCol (col: number): boolean {
    for (let i:number = 0; i < this.size; i++) {
      if (this.tiles[i][col] == true) {
        return false;
      }
    }
    return true;
  }

  public checkDiag (row: number, col: number): boolean {
    if (this.checkPositiveSlope(row, col) && this.checkNegativeSlope(row, col)) {
      return true;
    }
    else
      return false;
  }

  private maxNegativeSlope (row: number, col: number): Tile {
    let tile: Tile = {
      row: row,
      col: col
    };

    while (tile.col > 0 && tile.row > 0) {
      tile.row -= 1;
      tile.col -= 1;
    }

    return tile;
  }

  private minPositiveSlope (row: number, col: number): Tile {
    let tile: Tile = {
      row: row,
      col: col
    };

    while (tile.col > 0 && tile.row < this.size-1) {
      tile.row += 1;
      tile.col -= 1;
    }

    return tile;
  }

  /*
    Return
      true - if there are no pieces in diagonal negative slope
      false - if there are pieces in diagonal negative slope.
  */
  private checkNegativeSlope (row: number, col: number): boolean {
    let tile: Tile = this.maxNegativeSlope(row, col);

    while(tile.col < this.size-1 && tile.row < this.size-1 ) {

      if (this.tiles[tile.row][tile.col] == true) {
        return false;
      }

      tile.col += 1;
      tile.row += 1;
    }

    return true;
  }

  /*
    Return
      true - if there are no pieces in diagonal positive slope
      false - if there are pieces in diagonal positive slope.
  */
  private checkPositiveSlope (row: number, col: number): boolean {
    let tile: Tile = this.minPositiveSlope(row, col);

    while(tile.col < this.size-1 && tile.row > 0 ) {

      if (this.tiles[tile.row][tile.col] == true) {
        return false;
      }

      tile.col += 1;
      tile.row -= 1;
    }

    return true;
  }
}