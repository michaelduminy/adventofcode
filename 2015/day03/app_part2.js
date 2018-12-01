var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var input = getFileContents('./input.txt');

var santa_list = [];
santa_list.push('0,0');

var robo_list = [];
robo_list.push('0,0');

for(var i = 0; i < input.length; i++){
	var c = input[i];

	var list = santa_list;
	if ((i % 2) == 1){
		list = robo_list;
	}

	var prev = list.pop().split(',');

	var cur_x = parseInt(prev[0]);
	var cur_y = parseInt(prev[1]);

	list.push(prev.join(','));

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

var uniq = _.uniq(santa_list.concat(robo_list));
console.log(uniq.length);