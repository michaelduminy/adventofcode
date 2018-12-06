import R from 'ramda';
import { readFile } from '../../lib/utils';

const markArea = (arr = [], x, y, w, h) => {
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      if (arr[i] === undefined) arr[i] = [];
      arr[i][j] = (arr[i][j] || 0) + 1;
    }
  }

  return arr;
};

let inputRegex = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/g;

const partOne = async () => {
  const input = await readFile('./src/days/03/input.txt');

  let end = false,
    area = [];
  while (!end) {
    const groups = inputRegex.exec(input);
    if (groups === null) {
      end = true;
      break;
    }

    const [_, id, x, y, w, h] = groups;
    area = markArea(area, parseInt(x), parseInt(y), parseInt(w), parseInt(h));
  }

  const resultFunc = R.pipe(
    R.flatten(),
    R.countBy(x => x > 1)
  );

  return resultFunc(area).true;
};

const areaIntersects = (arr = [], intersects, id, x, y, w, h) => {
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      if (arr[i] === undefined) arr[i] = [];
      const currentValue = arr[i][j];
      if (currentValue !== undefined) {
        intersects.add(currentValue);
        intersects.add(id);
      }
      arr[i][j] = id;
    }
  }

  return arr;
};

const partTwo = async () => {
  const input = await readFile('./src/days/03/input.txt');

  let end = false,
    area = [],
    ids = [],
    intersects = new Set();
  while (!end) {
    const groups = inputRegex.exec(input);
    if (groups === null) {
      end = true;
      break;
    }

    const [_, id, x, y, w, h] = groups;

    ids.push(id);
    area = areaIntersects(
      area,
      intersects,
      id,
      parseInt(x),
      parseInt(y),
      parseInt(w),
      parseInt(h)
    );
  }

  const result = R.filter(x => !intersects.has(x))(ids);

  return result[0];
};

export { partOne, partTwo };
