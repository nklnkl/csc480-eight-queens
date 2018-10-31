import { Board } from './board';

let board: Board = new Board(8, 'Q');
console.log(board.update(1, 1, true));
console.log(board.update(2, 2, true));
console.log(board.update(3, 3, true));
console.log(board.update(4, 4, true));

console.log('');


let prt: Array<string> = board.print();

prt.forEach((row: string) => {
  console.log(row);
});