import { NQueenMath, Queen } from './n-queen-math';

class NQueen {
  private queens: Array<Queen>;
  private size: number;
  private x: number;
  private y: number;
  private start: number;
  private solution: number;

  constructor (size: number) {
    this.queens = new Array<Queen>();
    this.size = size;
    this.x = 1;
    this.y = 1;
    this.start = -1;
    this.solution = 0;
  }

  public search () {
    // Check if valid move.
    if (NQueenMath.isValid(this.x, this.y, this.queens)) {
      // If so add queen to position.
      this.queens.push({ x: this.x, y: this.y });
      // If this was our only queen so far, set start.
      if (this.queens.length == 1)
        this.start = this.y;
    }

    // If we have achieved our goal
    if (this.queens.length == this.size) {
      this.solution += 1;
      this.print();
      this.goBack();
    }


    // Search again.
    this.x +=1;
    this.correct();
    this.search();
  }

  public goBack ():void {
    // Go back to last queen's position + 1.
    this.x = this.queens[this.queens.length-1].x+1;
    this.y = this.queens[this.queens.length-1].y;

    // Remove last queen.
    this.queens.pop();

    // If there are no more queens left, adjust startingRow/overlap.
    if (this.queens.length == 0)
      this.start = -1;
    
    this.correct();

    return;
  }

  private correct(): void {
    // If the next column is out of bounds.
    if (this.x > this.size) {
      // Set column to 1 and increment row.
      this.x = 1;
      this.y += 1;
    }

    // If the next row is out of bounds.
    if (this.y > this.size) {
      // Set row to row 1.
      this.y = 1;
    }

    // Check if we started in this row.
    if (this.y == this.start) {
      // If we did, go back.
      this.goBack();
    }

    return;
  }

  public print () {
    console.log('');
    console.log('Solution ', this.solution);

    // Iterate rows/y coordinate
    for (let i: number = 1; i <= this.size; i++) {

      let row: string = '';

      // Iterate columns/x coordinate
      for (let j: number = 1; j <= this.size; j++) {

        let printQueen: boolean = false;
        let queenIndex: string = '';
        
        this.queens.forEach((queen: Queen, index: number) => {
          if (queen.x == j && queen.y == i) {
            printQueen = true;
            queenIndex = index+1 + ' ';
          }
        });

        if (printQueen)
          row += queenIndex;
        else
          row += '_ ';

      }// Iterate columns/x coordinate

      console.log(row + i.toString());

    }// Iterate rows/y coordinate

  } // public print ()

}

let nQueen: NQueen = new NQueen(4);
nQueen.search();