import * as fs from 'fs';
import * as util from 'util';

const readFilePromise = util.promisify(fs.readFile);

const readFile = async fileName =>
  await readFilePromise(fileName, { encoding: 'utf8' });

export { readFile };
