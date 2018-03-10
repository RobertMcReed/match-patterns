'use strict';

const R = require('ramda');

const util = require('./util.js');
const Trie = require('./trie.js');
const helpers = require('./helpers.js');

const isStar = str => str === '*';

const getNonStar = arry => isStar(arry[0]) ? arry[1] : arry[0];

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
  return findAndFormatBestMatch(matchingPatternsArray);
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
