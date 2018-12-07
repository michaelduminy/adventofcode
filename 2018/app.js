import R from 'ramda';

const dayRegex = /(\d{1,2})(b*)/;
const extractDay = input => {
  const regexResult = R.tail(dayRegex.exec(input));

  return {
    day: regexResult[0].padStart(2, '0'),
    part: regexResult[1] === 'b' ? 2 : 1
  };
};

const app = async (input = '') => {
  const { day, part } = extractDay(input);

  const dayModule = require(`./src/days/${day}`);

  const func = part == 1 ? dayModule.partOne : dayModule.partTwo;
  return await func();
};

export default app;
