import { NQueenMath, Queen } from './n-queen-math';

class NQueen {
  
  /*
    Array to keep track of pieces placed on the board.
  */
  private queens: Array<Queen>;

  /*
    Number to indicate the 1x1 dimension of the board as well as solution goal.
  */
  private size: number;

  /*
    Coordinates to iterate and keep track of board coordinates. These will be used to calculate 
    current positions and next positions.
  */
  private x: number;
  private y: number;

  /*
    Flag to indicate if the search process is running. On the first search() call, this will turn from false to true.
    When the search() runs into x=1 & y=1 after starting, the search() tree will return ending the recursion.
  */
  private started: boolean;

  /*
    Number to indicate how many solutions have been found. This wil be incremented every time the queens list reaches the size goal.
  */
  private solution: number;

  constructor (size: number) {
    this.queens = new Array<Queen>();
    this.size = size;
    this.x = 1;
    this.y = 1;
    this.started = false;
    this.solution = 0;
  }

  public search ():void {
    // If we have reached the initial position, after starting.
    if (this.x == 1 && this.y == 1 && this.started == true) {
      // Finally end.
      //console.log('# of push:', this.numPush, '# of block:', this.numBlock, '# of back:', this.numBack);
      return;
    }

    // Set started flag for true on first run.
    if (this.started == false)
      this.started = true;

    // Check if valid move.
    if (NQueenMath.isValid(this.x, this.y, this.queens)) {
      // If so add queen to position.
      this.queens.push({ x: this.x, y: this.y });

      // If we have achieved our goal
      if (this.queens.length == this.size) {
        this.solution += 1;
        this.print();
        this.goBack();
      }
    }

    // Go to next position.
    this.increment();

    // If we have overlapped to the front/head.
    if (this.queens.length > 0 && (this.queens[0].x == this.x && this.queens[0].y == this.y)) {
      this.goBack();
      this.increment();
    }

    return this.search();
  }

  private increment (): void {
    // Iterate to next col.
    this.x += 1;

    // If the next col is out of bounds.
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
  }

  public goBack ():void {
    // Go back to last queen's position + 1.
    this.x = this.queens[this.queens.length-1].x;
    this.y = this.queens[this.queens.length-1].y;

    // Remove last queen.
    this.queens.pop();

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

let nQueen: NQueen = new NQueen(5);
nQueen.search();