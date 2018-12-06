import * as fs from 'fs';
import * as util from 'util';
import levenshtein from 'fast-levenshtein';

const readFilePromise = util.promisify(fs.readFile);

const readFile = async fileName =>
  await readFilePromise(fileName, { encoding: 'utf8' });

const levenshteinDistance = (first, second) => levenshtein.get(first, second);

export { readFile, levenshteinDistance };
