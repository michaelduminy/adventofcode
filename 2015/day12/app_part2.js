var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();
var input = getFileContents('./input.txt');

var arr = eval(input);

var disgardRed = (a) => {
	// console.log(a)
	if (a === 'red') {
		return '';
	}
	if (_.isArray(a)){
		a = _.map(a, n => disgardRed(n));
	} else if (_.isObject(a)){
		// console.log('object', a)
		for (var obj in a) {

			if (a[obj] === 'red') {
					// console.log('disgarding');
					return '';
			} else if (_.isArray(a[obj])){
				a[obj] = _.map(a[obj], n => disgardRed(n));
			} else {
				a[obj] = disgardRed(a[obj]);
			}
		}
	} else {
		if (a === 'red') return '';
	}

	return a;
}

arr = disgardRed(arr)

var json = JSON.stringify(arr);
//console.log(json)

var numbers = json.match(/(-*\d+)/g);

var total = 0;
for(var i = 0; i < numbers.length; i++) {
	total += parseInt(numbers[i]);
}

console.log(total)
