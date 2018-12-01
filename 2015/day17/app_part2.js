'use strict'

const fs = require('fs');
const _ = require('lodash');
const Combinatorics = require('js-combinatorics')

let getFileContents = path => fs.readFileSync(path, 'utf8').trim();
let lines = _.map(getFileContents('./input.txt').split('\n'), n => parseInt(n))

const target = 150;

let smallest = lines.length;
let findSmallest = () => {

	let pset = Combinatorics.power(lines);

	let current_perm = pset.next();
	while (current_perm !== undefined) {

		if (_.sum(current_perm) == target) {
			if (current_perm.length < smallest) smallest = current_perm.length;
		}

		current_perm = pset.next();
	}
}

let pset = Combinatorics.power(lines);
let count = 0;
findSmallest(pset);
console.log(smallest)

let current_perm = pset.next();
while (current_perm !== undefined) {
	// console.log(current_perm)
	if (current_perm.length == smallest && _.sum(current_perm) == target) {
		// console.log('found one', current_perm)
		count++;
	}

	current_perm = pset.next();
}

console.log(count + ' cominations found')
