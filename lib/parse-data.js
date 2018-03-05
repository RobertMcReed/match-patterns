'use strict';

const R = require('ramda');

// returns true if the input is a number
const isNum = R.pipe(
  parseInt,
  isNaN,
  R.not
);

// gets the index of the second number in an array
const getSplitIndex = R.pipe(
  R.map(isNum),
  R.lastIndexOf(true)
);

const removeFirstSlash = data => 
  data.startsWith('/') ? data.slice(1) : data;

const removeLastSlash = data => 
  data.endsWith('/') ? data.slice(0, R.length(data) - 1) : data;

const removeExtraSlashes = R.pipe(
  removeFirstSlash,
  removeLastSlash
);

const isNotDemarcation = data => ![',', '/'].includes(data);

// take in the raw string, clean it, and split it up so it is [[matchers], [paths]]
// each matcher is an array of parts, and each path is an array of parts
const parser = R.pipe(
  R.trim,
  R.split('\n'),
  R.map(removeExtraSlashes),
  R.converge(R.splitAt, [getSplitIndex, R.identity]),
  R.map(R.pipe(
    R.tail,
    R.map(R.pipe(
      R.split(/(,|\/)/),
      R.filter(isNotDemarcation)
    ))
  ))
);

module.exports = parser;
