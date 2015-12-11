var fs = require('fs');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var input = getFileContents('./input.txt');

var floor = 0;

for (var i = 0; i < input.length; i++) {
	if (input[i] === '(') {
		floor++;
	} else if (input[i] === ')'){
		floor--;
	}
}

console.log('floor: ' + floor);