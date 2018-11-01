import * as ReadLine from 'readline-sync';
import { NQueen } from './n-queen';

let N: string = ReadLine.question('Number of pieces to place?');

console.log('');
console.log('');
console.log('');

let nQueen: NQueen = new NQueen(parseInt(N), 1,1);
nQueen.search();

console.log('');
console.log('');
console.log('');

ReadLine.keyIn('Press any key to print solutions...');