var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var input = "1113222113";
var iter = input;

var reg = new RegExp(/(\d)\1*/g);

for(var j = 1; j <= 50; j++){
	var match = iter.match(reg);
	iter = '';
	for(var i = 0; i < match.length; i++){
		
		var count = match[i].length;
		var c = match[i][0];

		iter += ''+count+c;
		
	}

	if (j == 40){
		console.log('part1', iter.length)
	}
}

console.log('part2',iter.length)
