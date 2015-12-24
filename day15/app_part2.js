var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var lines = _(getFileContents('./input.txt').split('\n'))
	.map(n => n.replace(/[:|,]/, '').split(' '))
	.map(n => {
		return [n[2], n[4], n[6], n[8], n[10]];

	})
	.map(n => n = _.map(n, m => parseInt(m))).value();

console.log(lines)

var combo = [1, 1, 1, 1];

var limit = 100;
var iterate = (c) => {
	var roll = false;

	for (var i = 0; i < c.length; i++) {
		if (i == 0) {
			if (c[i] == limit) {
				c[i] = 0;
				roll = true;
			} else {
				c[i] += 1;
			}
		} else if (roll === true) {
			if (c[i] == limit) {
				c[i] = 0;
				roll = true;
			} else {
				c[i] += 1;
				roll = false;
			}
		}
	}

	return c;
}

var valid = (c) => _.sum(c) == limit;

var zeroWrap = (v) => v < 0 ? 0 : v;

var calc = (c, it) => {
	var amt = 0;
	for (var i = 0; i < lines.length; i++) {
		for (var j = 0; j < c.length; j++) {
			amt += lines[i++][it] * c[j];
		}
	}
	return amt;
}

var judge = (c) => {

	var calories = calc(c, 4);
	if (calories != 500) return 0;

	var capacity = zeroWrap(calc(c, 0));
	var durability = zeroWrap(calc(c, 1));
	var flavor = zeroWrap(calc(c, 2));
	var texture = zeroWrap(calc(c, 3));

	return capacity * durability * flavor * texture;
}


var score = 0;
var highscore = 0;

while (combo.join() != '100,100,100,100') {
	combo = iterate(combo);

	if (valid(combo)) {
		score = judge(combo);
		if (score == 0) continue;

		console.log(combo, score, highscore)
		if (score > highscore) highscore = score;
	}
}

console.log(combo, highscore)