var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var input = getFileContents('./input.txt');

var list = [];
list.push('0,0');

for(var i = 0; i < input.length; i++){
	var c = input[i];
	var prev = list[i].split(',');

	var cur_x = parseInt(prev[0]);
	var cur_y = parseInt(prev[1]);

	if (c === '^'){
		cur_y++;
	} else if(c === '>'){
		cur_x++;
	} else if(c === '<'){
		cur_x--;
	} else if(c === 'v'){
		cur_y--;
	}

	var newpos = ''+cur_x+','+cur_y;

	list.push(newpos);
}

var uniq = _.uniq(list);
console.log(uniq.length);