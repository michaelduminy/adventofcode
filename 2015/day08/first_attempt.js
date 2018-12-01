var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var lines = getFileContents('./input.txt').split('\n');

var memcount = 0;
var charcount = 0;


var hexreg = new RegExp(/\\x[0-9a-f]{2}/gi);
var quotreg = new RegExp(/\\\"/gi);
var slashreg = new RegExp(/\\/gi);

var findReplace = (str, reg) => {
	var esc = reg.exec(str);
	if (esc == null) return str;
	do{
		console.log(esc)
		console.log(str, esc.index, str.length,esc[0].length)
		str = Array.from(str).splice(esc.index, esc[0].length).join('');
		console.log(str)
		memcount += 1;
		esc = reg.exec(str);
	} while (esc != null)

	return str;
}

var replacer = (match,p1,p2,p3,index,orig) => {
	console.log(match,p1,p2,p3,index,orig);

	if(match) memcount++;

	orig = orig.replace(match,'$')
	console.log(orig)
	return orig;
}


for(var i = 0; i < lines.length; i++) {
	var line = lines[i];
	charcount += line.length;
	console.log(line, line.length);

	for(var j = 1; j < line.length-1; j++){
		memcount++;
		var x = line[j];
		var y = line[j+1];
		if (x == '\\'){
			if (y == 'x') j += 3;
			if (y == '\\' || y == '\"') j++;
		}
	}
}

	//n = n.match(/^\"(.*)\"$/)[1];

	// n = n.replace(/(\\x[0-9a-f]{2})+|(\\\")+|(\\)+/gi, '$');
	// console.log(n)
	// console.log(n.split('$').length-1)
	// memcount += n.split('$').length-1;

	// n = findReplace(n, hexreg);
	// console.log(n, 'after hex')
	// n = findReplace(n, quotreg);
	// console.log(n, 'after quot')
	// n = findReplace(n, slashreg);
	// console.log(n, 'after slash')
	

//})

console.log('charcount',charcount);
console.log('memcount',memcount);

console.log(charcount-memcount)
// var a = _.map(list, n => n.replace(/(\")/gi, '1'))

// var hexreg = new RegExp(/(\\x[0-9a-f]{2})/gi);

// //var b = _.map(a, n => n.split(hexreg));

// console.log(a)
