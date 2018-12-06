import * as dayOne from './src/days/01/index';
import * as dayTwo from './src/days/02/index';
import * as dayThree from './src/days/03/index';

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
    case '03':
      return await dayThree.partOne();
    case '03b':
      return await dayThree.partTwo();
    default:
      console.log('No day specified');
  }
};

export default app;
