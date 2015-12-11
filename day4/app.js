var _ = require('lodash');
var md5 = require('md5');

var input = 'bgvyzdsv';

var found = false;

var i = 1;

while(found !== true){
	console.log('testing: ' + i);
	var test = input + i;
	var hash = md5(test);

	if(_.take(hash.split(''), 5).join('') === '00000'){
		found = true;
		console.log(i);
	} else {
		i++;
	}
}