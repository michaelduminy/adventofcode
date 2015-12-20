var fs = require('fs');
var _ = require('lodash');

function getFileContents(path) {
	return fs.readFileSync(path, 'utf8').trim();
};

var input = getFileContents('./input.txt');

var lines = input.split('\n');
var list = [];

for(var i = 0; i < lines.length; i++) {
	list.push({
		instruction: lines[i],
		processed: false
	});
}

var and = function(a,b){
	return a & b;
}

var or = function(a,b){
	return a | b;
}

var not = function(a,b){
	return ~b + 65536;
}

var lshift = function(a,b){
	return (a << b) % 65536;
}

var rshift = function(a,b){
	return (a >> b);
}

var val = function(a){
	if (isNaN(a)) return circuit[a];
	return a;
}

var process = function(signal){
	var result = {
		vars: [],
		gate: ' ',
		calc: null,
	}

	if (_(signal).contains('AND')){
		result.gate = 'AND';
		result.calc = and;

		//console.log('logical AND gate between ' + vars[0] + ' and ' + vars[1])
		// if (circuit[vars[0]] !== undefined && circuit[vars[1]] !== undefined){
		// 	calc = circuit[vars[0]] & circuit[vars[1]];
		// }
		// var possibleInt = parseInt(vars[0]);
		// if (!isNaN(possibleInt)){
		// 	calc = possibleInt & circuit[vars[1]];
		// }

	} else if (_(signal).contains('OR')) {
		result.gate = 'OR';
		result.calc = or;

		//var vars = signal.split(' OR ');
		//console.log('logical OR gate between' + vars[0] + ' and ' + vars[1])

		// if (circuit[vars[0]] !== undefined && circuit[vars[1]] !== undefined){
		// 	calc = circuit[vars[0]] | circuit[vars[1]];
		// }

	} else if (_(signal).contains('NOT')){
		result.gate = 'NOT';
		result.calc = not;
		// var var1 = signal.split('NOT ');
		// console.log(var1[1])
		// console.log(circuit[var1[1]] + ' - ' + (circuit[var1[1]] !== undefined))
		// //console.log('inverting bits of ' + var1)

		// if (circuit[var1[1]] !== undefined){
		// 	calc = ~circuit[var1[1]] + 65536;
		// }

	} else if (_(signal).contains('LSHIFT')){
		result.gate = 'LSHIFT';
		result.calc = lshift;

		//var vars = signal.split(' LSHIFT ');
		//var num = parseInt(vars[1]);
		//console.log('left shifting ' + variable + ' ' + num + ' places')

		// if (circuit[vars[0]] !== undefined) {
		// 	calc = circuit[vars[0]] << num;
		// 	calc = calc % 65536;
		// }

	} else if (_(signal).contains('RSHIFT')){
		result.gate = 'RSHIFT';
		result.calc = rshift;
		
		//console.log('right shifting ' + variable + ' ' + num + ' places')

		// if (circuit[vars[0]] !== undefined) {
		// 	calc = circuit[vars[0]] >> num;
		// 	calc = calc % 65536;
		// }

	} else {
		//result.gate = 'VALUE';
		// numbers

		calc = val;
		// var val = parseInt(signal);
		// if (!isNaN(val)){
		// 	//console.log('sending number signal of ' + val)
		// 	calc = val;
		// } else {
		// 	//console.log('sending signal of ' + signal)
		// 	if (circuit[signal] !== undefined){
		// 		calc = circuit[signal];
		// 	}
		// }
		
	}

	result.vars = _(signal.split(result.gate)).map(function(n){
		n = n.trim();
		if (!isNaN(parseInt(n))){
			return parseInt(n);
		}
		return n;
	}).value();

	if (result.calc == null){
		result.calc = function(){
			console.log(signal);
		}
	}

	return result;
}

var unresolvedVars = function(vars){
	console.log(vars)
	return _.some(vars, function(n){ 
		if (_.isNumber(n)) return false;
		return circuit[n] === undefined || circuit[n] === null});
}

var prepare = function(vars){
	return _(vars).map(function(n){
		if (_.isNumber(n)) return n;
		return circuit[n];
	}).value();
}

var circuit = {};

//var signalParamsRegEx = new RegExp(/(.*)(?=->)/g);

//console.log(_(list).where({processed: false}).value())

var dependencies = {};

var processing = true;
while(processing)
{
//for (var i = 0; i < list.length; i++) {
	var temp = list.shift();
	//console.log(list);
	var signalLine = temp.instruction;

	var variable = signalLine.split('-> ')[1];
	//console.log(variable)
	//if (!circuit[variable]) circuit[variable] = 0;

	var signals = signalLine.split(' -> ')[0].trim();
	//console.log(signals)

	// determine type of signal
	var result = process(signals);
	result.vars = prepare(result.vars);

	if (unresolvedVars(result.vars)){
		list.push(temp);
		console.log('skipping - ' + signals);
	} else {
		//console.log('processing: ' + signals);
		//console.log('assigning to ' + variable + ' - ' + calc)
		circuit[variable] = result.calc.apply(this,result.vars);
	}

	if (_(list).where({processed: false}).value().length == 0) {
		processing = false;
	}
};

console.log(circuit)