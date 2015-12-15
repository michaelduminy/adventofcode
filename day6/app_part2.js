var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var list = getFileContents('./input.txt').split('\n');

var lights = [];

for (var i = 0; i < 1000; i++) {
	lights.push([]);
	for(var j = 0; j < 1000; j++) {
		lights[i].push(0);
	}
};

var coordsReg = new RegExp(/(\d+,\d+) through (\d+,\d+)/g);

// like a gaffer but for lighting things
function lafferate(from, to, state) {
	for (var i = from[0]; i < to[0]+1; i++) {
		for (var j = from[1]; j < to[1]+1; j++) {
			switch(state){
				case 'toggle':
					lights[i][j] += 2;
					break;
				case 'on':
					lights[i][j]++;
					break;
				case 'off':
					if(lights[i][j] > 0) lights[i][j]--;
					break;
			}
		};
	};
};

for(var i = 0; i < list.length; i++) {
	var line = list[i];

	var coords = line.match(coordsReg)[0].split(' through ');
	var from = _.map(coords[0].split(','), n => parseInt(n));
	var to = _.map(coords[1].split(','), n => parseInt(n));


	if (_.startsWith(line,'turn on')) {
		lafferate(from, to, 'on');
	} else if (_.startsWith(line,'turn off')) {
		lafferate(from, to, 'off');
	} else if (_.startsWith(line,'toggle')) {
		lafferate(from, to, 'toggle');
	}
}

var count = 0;
_.map(_.flatten(lights), n => count+=n);
console.log(count);