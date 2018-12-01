var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var ab = "abcdefghijhlmnopqrstuvwxyz".split('')
var input = "vzbxkghb";

var reg = new RegExp(/(\w)\1/g);
var reg2 = new RegExp(/[iol]+/g);


var iterate = (pw) => {
	var r = pw.split('');
	// console.log(r)

	var roll = false;
	for(var i = r.length-1; i > 0; i--){
		if (i == r.length-1) {
			if(r[i] == 'z') {
				r[i] = 'a';
				roll = true;
			} else {
				r[i] = String.fromCharCode(r[i].charCodeAt(0) + 1);
			}
		} else if (roll === true) {
			if(r[i] == 'z') {
				r[i] = 'a';
				roll = true;
			} else {
				r[i] = String.fromCharCode(r[i].charCodeAt(0) + 1);
				roll = false;
			}
		}		

	}
	delete roll;
	return r.join('');
}


var found = false;
var j = 0;
while(found !== true) {
	j++;
	input = iterate(input);

	if(j%1000000 == 0){
		console.log(j, input)
	}

	var test1 = false;
	var test2 = false;
	if (input.match(reg) && input.match(reg).length > 1){
		test1 = true;
		console.log('test1 passed', input)
	}

	if (!input.match(reg2)){
		test2 = true;
		console.log('test2 passed', input)
	}

	if (test1 && test2){
		console.log('tests passed', input)
	} else {
		// console.log('tests failed', input, test1, test2)
		delete test1;
		delete test2;
		continue;
	}

	var seq = false;
	for(var i = 0; i < input.length; i++) {
		//if (_.contains(['i','o','l'], input[i])) break; continue;

		var li = _.indexOf(ab, input[i]);
		console.log(i,input,li)
		if(i+1 == input.length || i+2 == input.length) continue;
		if(input[i+1] === ab[li+1]){
			if(input[i+2] === ab[li+2]){
				seq = true;
				console.log('test')
			}
		}
	}

	if (seq === true) found = true;
}
console.log(input);