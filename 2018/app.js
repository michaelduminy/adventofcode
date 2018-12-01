import * as dayOne from './src/days/01/index';

const app = async day => {
  switch (day) {
    case '01':
      return await dayOne.partOne();
    case '01b':
      return await dayOne.partTwo();
    default:
      console.log('No day specified');
  }
};

export default app;
