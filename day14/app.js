var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var lines = _(getFileContents('./input.txt').split('\n'))
	.map(n => n.replace('.', '').split(' '))
	.map(n => {
		return {
			deer: n[0],
			spd: parseInt(n[3]),
			time: parseInt(n[6]),
			rest: parseInt(n[13])
		}; 
	}).value();

var until = 2503;

console.log(lines)

var farthest = 0;
for(var d in lines) {
	var segment = lines[d].time + lines[d].rest;
	var segments = until / segment;
	var remain = until % segment;

	var dist = _.floor(segments)*lines[d].spd*lines[d].time;

	dist += _.min([remain,lines[d].time])*lines[d].spd;
	console.log(lines[d].deer, segment, segments, remain,dist);

	if (dist > farthest) farthest = dist;
}

console.log(farthest)