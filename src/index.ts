import * as ReadLine from 'readline-sync';
import { NQueen } from './n-queen';

let N: string = ReadLine.question('Number of pieces to place?');

console.log('');
console.log('');
console.log('');

/*
let nQueens: Array<NQueen> = new Array<NQueen>();
for (let i = 1; i <= parseInt(N); i++) {
  for (let j = 1; j <= parseInt(N); j++) {
    nQueens.push(new NQueen(parseInt(N), j,i));
  }
}

nQueens.forEach((nQueen: NQueen) => {
  nQueen.search();
});
*/

let nQueen: NQueen = new NQueen(parseInt(N), 1,1);
nQueen.search();

console.log('');
console.log('');
console.log('');

ReadLine.keyIn('Press any key to print solutions...');