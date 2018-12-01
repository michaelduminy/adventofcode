'use strict'

const fs = require('fs');
const _ = require('lodash');

let getFileContents = path => fs.readFileSync(path, 'utf8').trim();

let lines = _(getFileContents('./input.txt').split('\n'))
	.map(n => n.replace(/[:|,]/g, '').split(' '))
	.map(n => {
		let r = {};
		for(let i = 0; i < n.length; i += 2){
			r[n[i]] = parseInt(n[i+1])
		}
		return r;
	}).value();
console.log(lines)

let match = {};
_(getFileContents('./output.txt').split('\n'))
	.map(n => n.replace(':', '').split(' '))
	.map(n => {
		match[n[0]] = parseInt(n[1])
	}).value();

console.log(match)

let matches = [];
for (let i = 0; i < lines.length; i++){
	let is_match = [];
	for (let p in lines[i]){

		if (p == 'Sue') continue;
		// console.log(p, lines[i][p], match[p])

		if (p == 'cats' || p == 'trees'){
			let val = lines[i][p];
			if (val > match[p]) {
				is_match.push(true)
			} else {
				is_match.push(false)
			}
		} else if (p == 'pomeranians' || p == 'goldfish'){
			let val = lines[i][p];
			if (val < match[p]) {
				is_match.push(true)
			} else {
				is_match.push(false)
			}
		} else if(lines[i][p] == match[p]) {
			is_match.push(true);
		} else {
			is_match.push(false);
		}
	}

	// console.log(is_match)

	if (_.every(is_match, Boolean)) matches.push(lines[i])
}

console.log(matches)