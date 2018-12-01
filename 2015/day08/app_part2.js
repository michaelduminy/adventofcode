var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var lines = getFileContents('./input.txt').split('\n');

var memcount = 0;
var charcount = 0;

for(var i = 0; i < lines.length; i++) {
	var line = lines[i];
	charcount += line.length;
	//console.log(line, line.length);

	for(var j = 0; j < line.length; j++){
		memcount++;
		if (line[j] == '\"'){
			memcount++;
		}
		if (line[j] == '\\'){
			memcount++;
		}
	}

	memcount += 2;
}

console.log('charcount',charcount, 'memcount', memcount);
console.log(charcount-memcount)

