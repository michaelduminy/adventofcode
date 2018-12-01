var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var list = getFileContents('./input.txt').split('\n');

var good = new RegExp(/(\w{2}).*\1/g);
var repeats = new RegExp(/(\w).{1}\1/g);

var results = _.filter(list, function(n) {
  	return n.match(good) && n.match(repeats);
})

console.log(results.length);
