'use strict';

const R = require('ramda');

const util = require('./util.js');
const Trie = require('./trie.js');
const helpers = require('./helpers.js');

const isStar = str => str === '*';

const getNonStar = arry => isStar(arry[0]) ? arry[1] : arry[0];

// takes in a pattern array and removes non *s
const keepWildcards = R.filter(isStar);

// takes in a pattern array
const countWildcards = R.pipe(keepWildcards, R.length);

// takes an array of patterns
const patternsToWildcardsCount = R.map(countWildcards);

const minFromArray = arry => R.min(...arry);

// takes an array of patterns
const minWildcards = R.pipe(patternsToWildcardsCount, minFromArray);

const patternHasXWildcards = (x) => (patternArray) => countWildcards(patternArray) === x;

const getFewestWildcards = arrayOfPatterns => {
  const min = minWildcards(arrayOfPatterns);
  const hasMin = patternHasXWildcards(min);

  return R.filter(hasMin, arrayOfPatterns);
};

const formatMatch = R.join(',');

// takes an object with one or two patterns and returns the non wildcard if possible
const getBestPathName = obj => {
  const options = helpers.getPropsArray(obj);

  let numOptions = helpers.getLength(options);
  switch (numOptions) {
    case 1:
      return options[0];
    case 2:
      return getNonStar(options);
    default:
      return null;
  }
};

const getTrie = arry => new Trie(arry).head;

const _getBestPath = (subTrie, accumulator = []) => {
  const bestPathName = getBestPathName(subTrie);

  // base case, there are no more nodes
  if (helpers.doesNotExist(bestPathName)) return accumulator;

  return _getBestPath(subTrie[bestPathName], [...accumulator, bestPathName]);
};

const findBestMatchArray = matchingPatternsArray => {
  const patternTrie = getTrie(matchingPatternsArray);

  return _getBestPath(patternTrie);
};

const findAndFormatBestMatch = R.pipe(findBestMatchArray, formatMatch);

const _findBestMatch = module.exports = matchingPatternsArray => {
  if (helpers.isEmpty(matchingPatternsArray)) return 'NO MATCH';
  if (helpers.hasLengthOne(matchingPatternsArray)) return formatMatch(matchingPatternsArray);
  const fewestWildcardsArray = getFewestWildcards(matchingPatternsArray);

  return findAndFormatBestMatch(fewestWildcardsArray);
};

const matchingPatternsArrays = [
  [
    [
      'w',
      'x',
      '*',
      '*',
    ],
    [
      '*',
      'x',
      'y',
      'z',
    ],
  ],
  [
    [
      'a',
      '*',
      '*',
    ],
    [
      '*',
      'b',
      '*',
    ],
    [
      '*',
      '*',
      'c',
    ],
  ],
  [],
  [],
  [
    [
      'foo',
      'bar',
      'baz',
    ],
  ],
];

let solved = matchingPatternsArrays.map(_findBestMatch);
util.logFormatted(solved);
