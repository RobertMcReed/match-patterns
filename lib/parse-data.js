'use strict';

const R = require('ramda');

// get the index of the start of the paths
const getSplitIndex = R.pipe(
  R.head,
  R.add(1)
);

const isNotDemarcation = data => ![',', '/', ''].includes(data);

// take in the raw string, clean it, and split it up so it is [[matchers], [paths]]
// each matcher is an array of parts, and each path is an array of parts
const parser = R.pipe(
  R.trim,
  R.split('\n'),
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
