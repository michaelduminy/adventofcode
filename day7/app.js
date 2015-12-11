var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var lines = getFileContents('./input.txt').split('\n');
var wires = _.shuffle(_.map(lines, n => n.replace(' ->', '').split(' ')));

var extractArgs = function(arr) {
	if (arr.length < 4) return [arr[arr.length - 2]];
	if (arr.length == 4) return [arr[0], arr[2]];
}

var extractCalc = function(arr) {
	if (arr.length == 3) return a => ~a;

	if (arr.length == 4) {
		switch (arr[1]) {
			case 'AND':
				return (a, b) => a & b;
				break;
			case 'OR':
				return (a, b) => a | b;
				break;
			case 'LSHIFT':
				return (a, b) => a << b;
				break;
			case 'RSHIFT':
				return (a, b) => a >> b;
				break;
		}
	}
}

var circuit = {};

var evaluate = function(v) {
	if (circuit[v]) return circuit[v];

	var dependancy = _.find(wires, n => n[n.length - 1] === v);
	if (!dependancy) return parseInt(v);

	var signal = {
		args: extractArgs(dependancy),
		calc: extractCalc(dependancy)
	};

	var resolvedArgs = _.map(signal.args, x => evaluate(x)).value();

	circuit[v] = signal.calc ? signal.calc.apply(this, resolvedArgs) : resolvedArgs[0];
	return circuit[v];
}

evaluate('a');