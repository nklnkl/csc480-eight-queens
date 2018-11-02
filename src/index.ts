import * as ReadLine from 'readline-sync';
import { NQueen } from './n-queen';

let N: string = ReadLine.question('Number of pieces to place?');

let r: boolean = true;
let rLoop: boolean = true;
while (rLoop) {
  let R: string = ReadLine.question('Run in full rotation? (y/n)');
  R = R.toLowerCase();
  switch (R) {
    case 'y':
      r = true;
      rLoop = false;
      break;
    case 'n':
      r = false;
      rLoop = false;
      break;
    default:
      console.log('Incorrect command, respond with y or n.'.red);
  }
}

console.log('');
console.log('');
console.log('');

let nQueen: NQueen = new NQueen(parseInt(N), 1,1, r);
nQueen.search();

console.log('');
console.log('');
console.log('');

ReadLine.keyIn('Press any key to print solutions...');