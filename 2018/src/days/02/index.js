import R from 'ramda';
import { readFile, levenshteinDistance } from '../../lib/utils';

const haveExactly = num => {
  return R.pipe(
    R.countBy(R.toLower),
    R.toPairs(),
    R.any(x => x[1] === num)
  );
};

const partOne = async () => {
  const input = await readFile('./src/days/02/input.txt');
  let result = { twos: 0, threes: 0 };
  R.pipe(
    R.curry(R.split)('\n'),
    R.map(R.split('')),
    R.forEach(elem => {
      if (haveExactly(3)(elem)) {
        result.threes += 1;
      }

      if (haveExactly(2)(elem)) {
        result.twos += 1;
      }
    })
  )(input);

  return result.twos * result.threes;
};

// damn this one is dirty
const partTwo = async () => {
  const input = await readFile('./src/days/02/input.txt');
  const splitInput = R.split('\n')(input);

  const func = R.pipe(
    R.map(x => {
      const levens = R.map(y => ({
        first: x,
        second: y,
        distance: levenshteinDistance(x, y)
      }))(splitInput);
      return R.filter(x => x.distance == 1)(levens);
    }),
    R.flatten(),
    R.take(1)
  );

  const { first, second } = func(splitInput)[0];
  const fir = first.split('');
  const sec = second.split('');

  let result = [];
  for (let i = 0; i < fir.length; i++) {
    if (fir[i] == sec[i]) {
      result = result.concat(fir[i]);
    }
  }
  return result.join('');
};

export { partOne, partTwo };
