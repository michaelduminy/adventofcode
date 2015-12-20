var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var list = getFileContents('./input.txt').split('\n');
var vowels = ['a','e','i','o','u'];
var bads = new RegExp(/(ab|cd|pq|xy)/);
var repeats = new RegExp(/(\w)\1{1}/);

var results = _.filter(list, function(n) {
	var vowelsInN = _.filter(n.split(''), nn => _(vowels).contains(nn));

  	return bads.test(n) == false && 
  			repeats.test(n) &&
	  		_.size(vowelsInN) > 2;
})

console.log(results.length);
