var fs = require('fs');
var _ = require('lodash');

var getFileContents = path => fs.readFileSync(path, 'utf8').trim();

var locs = [];
var lines = _(getFileContents('./input.txt').split('\n'))
	.map(n => n.replace(' to ', ' ').replace(' = ', ' ').split(' '))
	.map(n => {
		locs.push(n[0])
		locs.push(n[1])
		n[2] = parseInt(n[2]);
		return n; 
	}).value();

locs = _.uniq(locs)

var paths = {};
_.map(locs, n => {
	paths[n] = _(lines).map(m => {
		var from = m[0];
		var to = m[1];

		if (from === n) {
			return [to, m[2]]
		}

		if (to === n){
			return [from, m[2]]
		}
	}).filter(m => m).value()
})

console.log(paths)
console.log(locs)
var pi = 0; // path index
var dist = 0; // distance

function findFarthestFrom(from){
	// console.log(from)
	var p = paths[from];

	p = _.filter(p, n => _.indexOf(locs1, n[0]) !== -1)
	// console.log('after filter',p)

	var farthestVal = _.min(_.map(p, n => n[1]));

	return {
		to: _.flatten(p)[_.indexOf(_.flatten(p), farthestVal) - 1],
		d: farthestVal
	}
}

var shortest = 1000;
var locs1 = [];
for(var i = 0; i < 100000; i++){

	locs1 = _.shuffle(locs);
	// console.log(locs)

	var first = locs1.shift();
	var prev = {to:first};
	//locs.splice(_.indexOf(locs, first),1);

	var calc = [];

	while(locs1.length > 0){

		if(locs1.length == 1){
			// console.log('last one', prev, 'to', first)
			var p = paths[prev.to];
			// console.log(p)
			var roundTrip = _.flatten(p)[_.indexOf(_.flatten(p), first)+1];
			// console.log(roundTrip);
			//calc.push({place: first, d: roundTrip})
			//break;
		}
		
		var tmpplc = prev.to;
		prev = findFarthestFrom(prev.to);
		prev.from = tmpplc;
		calc.push(prev)
		// console.log(prev)
		locs1.splice(_.indexOf(locs1, prev.to),1);
		// console.log(locs)
	}

	// console.log(calc)

	var total = _.sum(calc, n => n.d)
	if (total < shortest) shortest = total;
	// console.log(total)
	}

console.log(shortest)

// for(var path in paths) {
// 	if (prev === '') {
// 		prev = path;
// 		locs.splice(_.indexOf(locs, prev), 1);
// 	}

// 	var quick = _.min(_.map(_.filter(paths[path], m => _.contains(locs, path)), n => n[1]));
// 	var index = _.indexOf(_.flatten(paths[path]), quick) - 1;
// 	var closest = _.flatten(paths[path])[index];
// 	console.log(path, closest, quick)

// 	if (_.indexOf(locs, closest) == -1) {
// 		console.log('no more left');
// 		break;
// 	} else {
// 		dist += quick;
// 	}
// 	//console.log(quick, path, index)
// 	//console.log(_.flatten(paths[path])[index])
// }


