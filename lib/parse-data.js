'use strict';

const R = require('ramda');

const Trie = require('./trie.js');
const helpers = require('./helpers.js');

// get the index of the start of the paths
const getSplitIndex = R.pipe(
  R.head,
  R.add(1)
);

const mapIndexed = R.addIndex(R.map);

// use as callback to map a different function to head and tail
const headAndTail = (fnHead, fnTail) => (val, i) => i === 0 ? fnHead(val) : fnTail(val);

const toTrie = arry => new Trie(arry).head;

const parsePatterns = R.pipe(
  R.tail, // remove num rows
  R.map(R.pipe(
    R.split(',')
  )),
  toTrie
);

const parsePaths = R.pipe(
  R.tail, // remove num rows
  R.map(R.pipe(
    helpers.trimWhacks,
    R.split('/')
  ))
);

const parsePatternsAndPaths = mapIndexed(headAndTail(parsePatterns, parsePaths));

// take in the raw string, clean it, and split it up so it is [[patterns], [paths]],
// then convert the patterns into a Trie. Each path is an array of parts
module.exports = R.pipe(
  R.trim,
  R.split('\n'),
  R.converge(R.splitAt, [getSplitIndex, R.identity]),
  parsePatternsAndPaths
);
