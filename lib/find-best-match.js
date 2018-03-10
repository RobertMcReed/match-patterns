'use strict';

const R = require('ramda');

const util = require('./util.js');
const Trie = require('./trie.js');
const helpers = require('./helpers.js');

const isStar = str => str === '*';

const getNonStar = arry => isStar(arry[0]) ? arry[1] : arry[0];

// takes an object with one or two patterns and returns the non wildcard if possible
const getBestPathName = obj => {
  const options = helpers.getPropsArray(obj);

  return helpers.hasLengthOne(options) ? options[0] : getNonStar(options);
};

const buildStarMap = arry => new Trie(arry).head;

const helpFindBestMatch = matchingPatternsArrays => {
  const options = [...matchingPatternsArrays];

  return matchingPatternsArrays;
};

const findBestMatch = module.exports = matchingPatternsArray => {
  if (helpers.isEmpty(matchingPatternsArray)) return 'NO MATCH';
  if (helpers.hasLengthOne(matchingPatternsArray)) return R.join(',', matchingPatternsArray);
  return helpFindBestMatch(matchingPatternsArray);
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

let solved = matchingPatternsArrays.map(findBestMatch);
util.logFormatted(solved);
