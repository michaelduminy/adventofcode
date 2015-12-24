'use strict'

const fs = require('fs');
const _ = require('lodash');
const Combinatorics = require('js-combinatorics')

let getFileContents = path => fs.readFileSync(path, 'utf8').trim();
let lines = _(getFileContents('./input.txt').split('\n'))
	.map(n => n = n.split('')).value()

_.map((lines), n => {
	console.log(n.join(''));
})

let getNeighboursCount = (arr, i, j) => {
	// let log = false;
	// if (i == 97 && j == 96) {
	// 	log = true;
	// }

	let count = 0;
	for (let k = i - 1; k < i + 2; k++) {
		if (!arr[k]) continue;
		for (let l = j - 1; l < j + 2; l++) {
			if (arr[k][l] == '#') {
				//if (log) console.log(arr[k][l])
				count++;
			}
		}
	}
	return count;
}

for (let outer = 0; outer < 101; outer++) {
	let snapshot = _.cloneDeep(lines);

	for (let i = 0; i < snapshot.length; i++) {
		for (let j = 0; j < snapshot[i].length; j++) {
			let state = snapshot[i][j] == '#';
			let neighbours = getNeighboursCount(snapshot, i, j);

			if (state && (neighbours == 2 || neighbours == 3)) {
				lines[i][j] = '#';
				continue;
			} else if (!state && neighbours == 3) {
				lines[i][j] = '#';
				continue;
			}

			lines[i][j] = '.';

			// if (outer == 0 && i == 0 && j == 0) console.log(state)
		}
	}
	// console.log('')
	// _.map((lines), n => {
	// 	console.log(n.join(''));
	// })
}
_.map((lines), n => {
	console.log(n.join(''));
})
console.log(_.filter(_.flatten(lines), n => n == '#').length)