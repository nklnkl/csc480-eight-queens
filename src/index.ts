import { Board } from './board';

let board: Board = new Board(8, 'Q');
console.log(board.update(4, 4, true));
console.log(board.update(0, 4, true));
console.log(board.update(4, 0, true));
console.log(board.update(0, 0, true));
console.log(board.update(1, 3, true));

console.log('');

let prt: Array<string> = board.print();

prt.forEach((row: string) => {
  console.log(row);
});
