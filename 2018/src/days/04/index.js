import moment from 'moment';
import R from 'ramda';
import { readFile } from '../../lib/utils';

const partOne = async () => {
  const input = await readFile(__dirname + '/input.txt');

  const resultFunc = R.pipe(
    R.split('\n'),
    R.map(x => {
      let date = moment(x.substr(1, 16));
      let rest = x.substr(19);
      let guardRegex = rest.match(/\d{1,4}/);
      return {
        date: date.hour() === 23 ? date.hour(0).minute(0) : date,
        guard: (guardRegex || [])[0],
        rest: x.substr(19)
      };
    }),
    R.sort((a, b) => {
      let aDate = moment(a.date);
      let bDate = moment(b.date);
      if (aDate.isBefore(bDate)) return -1;
      if (aDate.isAfter(bDate)) return 1;
      return 0;
    })
  );

  return resultFunc(input);
};

const partTwo = async () => {
  const input = await readFile(__dirname + '/input.txt');

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
