var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var until = 2503;
var lines = _(getFileContents('./input.txt').split('\n'))
	.map(n => n.replace('.', '').split(' '))
	.map(n => {
		return {
			deer: n[0],
			spd: parseInt(n[3]),
			time: parseInt(n[6]),
			rest: parseInt(n[13]),
			dist: 0,
			points: 0
		}; 
	}).value();

// console.log(lines)

var leader;
for(var i = 1; i <= until; i++) {
	_.forEach(lines, n => {
		var segment = n.time + n.rest;
		var segments = i / segment;
		var remain = i % segment;

		var dist = _.floor(segments)*n.spd*n.time;

		dist += _.min([remain,n.time])*n.spd;
		// console.log(n.deer, segment, segments, remain,dist, n.dist, n.points);

		n.dist = dist;
	});

	leader = _.max(lines, 'dist');

	lines[_.indexOf(lines,leader)].points++;
		
	if (i === 1) lines[_.indexOf(lines,leader)].points++;
	// console.log(i, leader)

}

var winner = _.max(lines, 'points');
// console.log(lines)
// console.log(_.sum(lines, 'points'))
console.log('winner is', winner.deer, 'with', winner.points, 'points')
