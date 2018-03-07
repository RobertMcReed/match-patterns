'use strict';

const util = require('./util.js');

const findBestMatch = module.exports = matchingPatternsArray => {
  return matchingPatternsArray.length ? matchingPatternsArray : 'no match found';
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
