import R from 'ramda';
import { readFile } from '../../lib/utils';

const partOne = async () => {
  const input = await readFile(__dirname + '/input.txt');
  const resultFunc = R.pipe(
    R.curry(R.split)('\n'),
    R.map(parseInt),
    R.reduce((a, b) => a + b, 0)
  );

  return resultFunc(input);
};

const partTwo = async () => {
  const input = await readFile(__dirname + '/input.txt');
  const cleanArray = R.pipe(
    R.curry(R.split)('\n'),
    R.map(parseInt)
  )(input);

  let history = [],
    found = false,
    i = 0,
    result = 0;

  console.time('duration');
  while (!found) {
    let acc = history[history.length - 1] || 0;

    if (++i % 10 == 0) console.log(`iteration ${i}, acc = ${acc}`);

    for (let item of cleanArray) {
      acc = acc + item;
      if (history.includes(acc)) {
        result = acc;
        found = true;
        break;
      } else {
        history.push(acc);
      }
    }
  }
  console.timeEnd('duration');

  return result;
};

export { partOne, partTwo };
