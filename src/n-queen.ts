export { NQueen };
import { NQueenMath, Queen } from './n-queen-math';
import 'colors';
import Moment from 'moment';

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
    Initial coordinates of the search. Will be used as the recursive base case to end the search. If full rotation
    is enabled, the recursive search will end once it has iterated back to the initial coordinates.
  */
  private startX: number;
  private startY: number;

  /*
    Flag to indicate if the search will run in full rotation. Full rotation means that the head node will be tried
    on every single position on the board vs only tried in the first row.
  */
  private fullRotation: boolean;

  /*
    Flag to indicate if the search process is running. On the first search() call, this will turn from false to true.
    When the search() runs into x=1 & y=1 after starting, the search() tree will return ending the recursion.
  */
  private started: boolean;

  /*
    Number to indicate how many solutions have been found. This wil be incremented every time the queens list reaches the size goal.
  */
  private solution: number;

  /*
    The start time of the process in UNIX epoch.
  */
  private startTime: number;

  /*
    The end time of the process in UNIX epoch.
  */
  private endTime: number;

  /*
    Algorithm tracking.
  */
  private numInc: number;
  private numAdd: number;
  private numBack: number;
  private numSearch: number;

  constructor (size: number, x: number, y: number, fullRotation: boolean) {
    this.queens = new Array<Queen>();
    this.size = size;
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.fullRotation = fullRotation;
    this.started = false;
    this.solution = 0;
    this.startTime = 0;
    this.endTime = 0;
    this.numInc = 0;
    this.numAdd = 0;
    this.numBack = 0;
    this.numSearch = 0;
  }

  public search ():void {
    this.numSearch += 1;

    // If we enabled full rotation & have reached the initial position, again.
    if (this.fullRotation == true && this.x == this.startX && this.y == this.startY && this.started == true && this.queens.length == 0)
      return this.report();
    
    // If we disabled full rotation & have reached the next row for the head node.
    if (this.fullRotation == false && this.x == this.startX && this.y == this.startY + 1 && this.started == true && this.queens.length == 0)
      return this.report();

    // Set started flag for true on first run.
    if (this.started == false) {
      this.started = true;
      this.startTime = Moment().valueOf();
    }

    // If we have found a valid move.
    if (NQueenMath.isValid(this.x, this.y, this.queens))
      this.addPiece();

    // If we have overlapped to the front/head.
    else if (this.queens.length > 0 && (this.queens[0].x == this.x && this.queens[0].y == this.y)) {
      this.goBack();
      this.increment();
    }

    // If we are neither at the end of this branch, or a valid move, traverse forward.
    else
      this.increment();

    // Clear call stack and 'link' application memory.
    let search = this.search.bind(this);
    process.nextTick(function () {
      search();
    });
  }

  private addPiece (): void {
    this.numAdd += 1;

    // If so add queen to position.
    this.queens.push({ x: this.x, y: this.y });

    // If we have achieved our goal
    if (this.queens.length == this.size) {
      this.solution += 1;
      this.print();
      this.goBack();
    }
    this.increment();
  }

  private increment (): void {
    this.numInc += 1;

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
    return;
  }

  private goBack ():void {
    this.numBack += 1;

    // Go back to last queen's position + 1.
    this.x = this.queens[this.queens.length-1].x;
    this.y = this.queens[this.queens.length-1].y;

    // Remove last queen.
    this.queens.pop();

    return;
  }

  private print () {
    console.log('');
    console.log(('Solution ' + this.solution.toString()).bgGreen.black);

    // To keep track of tile count for display purposes.
    let tile: number = 0;

    // Iterate rows/y coordinate
    for (let i: number = 1; i <= this.size; i++) {

      let row: string = '';

      // Iterate columns/x coordinate
      for (let j: number = 1; j <= this.size; j++) {

        tile += 1;

        let printQueen: boolean = false;
        let queenIndex: string = '';
        
        this.queens.forEach((queen: Queen, index: number) => {
          if (queen.x == j && queen.y == i) {
            printQueen = true;
            queenIndex = (index+1+' ').toString();
          }
        });

        // If odd tile.
        if ((j % 2) == (i % 2)) {
          if (printQueen)
            row += (queenIndex).bgBlack.white;
          else
            row += ('  ').bgBlack.white;
        }
        // If even tile.
        else {
          if (printQueen)
            row += (queenIndex).bgWhite.black;
          else
            row += ('  ').bgWhite.black;
        }

      }// Iterate columns/x coordinate

      // Print out row axis.
      console.log(row + (i.toString() + ' ').bgGreen.black);

    }// Iterate rows/y coordinate

    // Print out col axis.
    let colCount: string = '';
    for (let k: number = 1; k <= this.size; k++) {
      colCount += k.toString() + ' ';
    }
    console.log(colCount.bgGreen.black);

    return;
  } // public print ()

  private report (): void {
    // Finally end.
    this.endTime = Moment().valueOf();
    console.log('');
    if (this.fullRotation) {
      console.log('Rotated Solutions:', this.solution);
      console.log('Unique Solutions:', this.solution/this.size);
    }
    else {
      console.log('Unique Solutions:', this.solution);
    }
    console.log('');
    console.log('Start time:', Moment(this.startTime).format());
    console.log('End time:', Moment(this.endTime).format());
    console.log('');
    console.log('Start time (Unix Epoch):', Moment(this.startTime).valueOf());
    console.log('End time (Unix Epoch):', Moment(this.endTime).valueOf());
    console.log('');
    console.log('Search Time:', this.endTime - this.startTime, 'milliseconds');
    console.log('');
    console.log('Memory Allocated:', process.memoryUsage().heapTotal / 1000000, 'Mb');
    console.log('Memory Usage:', process.memoryUsage().heapUsed / 1000000, 'Mb');
    console.log('');
    console.log('# of Search:', this.numSearch);
    console.log('# of Increments:', this.numInc);
    console.log('# of Valid Moves:', this.numAdd);
    console.log('# of Backtracks:', this.numBack);
    return;
  }

}