var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var lines = _(getFileContents('./input.txt').split('\n'))
	.map(n => n.replace(/[:|,]/, '').split(' '))
	.map(n => {
		return [n[2],n[4],n[6],n[8],n[10]];
			//name: n[0],
			//prop: [n[2],n[4],n[6],n[8],n[10]]
		
	})
	.map(n => n = _.map(n, m => parseInt(m))).value();

console.log(lines)

var combos = [0,0,0,0];

var rand = () => {
	var total = 100;
	combos = _.map(combos, n => {
		var x = _.random(0,total);
		total -= x;
		return x;
	})
}

var zeroWrap = (v) => v < 0 ? 0 : v;


var highest = 0;
var test = () => {
	var c = zeroWrap(_(lines).map(n => n[0] * combos[0]).sum());
	var d = zeroWrap(_(lines).map(n => n[1] * combos[1]).sum());
	var f = zeroWrap(_(lines).map(n => n[2] * combos[2]).sum());
	var t = zeroWrap(_(lines).map(n => n[3] * combos[3]).sum());
//	var cal = zeroWrap(_(lines).map(n => n[4] * combos[4]).sum());

	val = c*d*f*t;
//	val += cal;

	if (val > highest) highest = val;
}

for(var i = 0; i < 100000; i++){
	rand();
	console.log(combos)
	test();
}

console.log(highest)


