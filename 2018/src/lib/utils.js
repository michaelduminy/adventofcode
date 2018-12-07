import * as fs from 'fs';
import * as util from 'util';
import R from 'ramda';
import levenshtein from 'fast-levenshtein';

const readFilePromise = util.promisify(fs.readFile);

const readFile = R.partialRight(readFilePromise, [{ encoding: 'utf8' }]);

const levenshteinDistance = (first, second) => levenshtein.get(first, second);

export { readFile, levenshteinDistance };
