var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();
var input = getFileContents('./input.txt');

var numbers = input.match(/(-*\d+)/g);

var total = 0;
for(var i = 0; i < numbers.length; i++) {
	total += parseInt(numbers[i]);
}

console.log(total)
