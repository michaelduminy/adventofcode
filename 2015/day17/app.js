'use strict'

const fs = require('fs');
const _ = require('lodash');
const Combinatorics = require('js-combinatorics')

let getFileContents = path => fs.readFileSync(path, 'utf8').trim();
let lines = _.map(getFileContents('./input.txt').split('\n'), n => parseInt(n))

const target = 150;
let perms = Combinatorics.power(lines);
console.log(perms.valueOf() + ' in power set')

let count = 0;
let current_perm = perms.next();
while(current_perm !== undefined){

	if (_.sum(current_perm) == target){
		// console.log('found one', current_perm)
		count++;
	}

	current_perm = perms.next();
}

console.log(count + ' cominations found')