var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var input = getFileContents('./input.txt');

var list = input.split('\n');

var total_area = 0;
var total_ribbon = 0;

for(var i = 0; i < list.length; i++){
	var item = _(list[i].split('x')).map(n => parseInt(n)).sortBy().value();
	var a = item[0];
	var b = item[1];
	var c = item[2];

	total_ribbon += 2 * (a + b);
	total_ribbon += a * b * c;

	var dim1 = a*b;
	var dim2 = b*c;
	var dim3 = c*a;

	var smallest = _.min([dim1,dim2,dim3]);

	var area = _.sum([dim1,dim2,dim3]) * 2;
	area += smallest;

	total_area += area;
}

console.log('total area',total_area);
console.log('total ribbon', total_ribbon);