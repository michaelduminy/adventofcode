import * as dayOne from './src/days/01/index';
import * as dayTwo from './src/days/02/index';

const app = async day => {
  switch (day) {
    case '01':
      return await dayOne.partOne();
    case '01b':
      return await dayOne.partTwo();
    case '02':
      return await dayTwo.partOne();
    case '02b':
      return await dayTwo.partTwo();
    default:
      console.log('No day specified');
  }
};

export default app;
