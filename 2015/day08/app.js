var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var lines = getFileContents('./input.txt').split('\n');

var memcount = 0;
var charcount = 0;

for(var i = 0; i < lines.length; i++) {
	var line = lines[i];
	charcount += line.length;

	for(var j = 1; j < line.length-1; j++){
		memcount++;
		if (line[j] == '\\'){
			var next = line[j+1];
			if (next == 'x') {
				var hex = line.substring(j+2,j+4);
				if(/[0-9a-f]/.test(hex)) j += 3;
			}
			if (next == '\"') j++;
			if (next == '\\') j++;
		}
	}
}

console.log('charcount',charcount, 'memcount', memcount);
console.log(charcount-memcount)

