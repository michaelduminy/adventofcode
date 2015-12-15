var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var lines = getFileContents('./input.txt').split('\n');


