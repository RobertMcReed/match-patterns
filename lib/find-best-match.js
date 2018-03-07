'use strict';

const util = require('./util.js');
const { isEmptyOrOne } = require('./helpers.js');

const helpFindBestMatch = matchingPatternsArrays => {
  const options = [...matchingPatternsArrays];
  return matchingPatternsArrays;
};

const findBestMatch = module.exports = matchingPatternsArray => 
  isEmptyOrOne(matchingPatternsArray) ? 
    matchingPatternsArray : 
    helpFindBestMatch(matchingPatternsArray);

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
