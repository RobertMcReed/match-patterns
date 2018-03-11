'use strict';

const R = require('ramda');

const Trie = require('./trie.js');

// get the index of the start of the paths
const getSplitIndex = R.pipe(
  R.head,
  R.add(1)
);

const mapIndexed = R.addIndex(R.map);
// const firstToTrie = (val, i) => i === 0 ? new Trie(val).head : val;
// const mapFirstToTrie = mapIndexed(firstToTrie);

// use as callback to map a different function to head and tail
const headAndTail = (fnHead, fnTail) => (val, i) => i === 0 ? fnHead(val) : fnTail(val);

const toTrie = arry => new Trie(arry).head;

const firstToTrie = headAndTail(toTrie, R.identity);

const mapFirstToTrie = mapIndexed(firstToTrie);

// const splitSeparately = mapIndexed(mapFirstAndSecond);

const isNotDemarcation = data => ![',', '/', ''].includes(data);

// take in the raw string, clean it, and split it up so it is [[patterns], [paths]],
// then convert the patterns into a Trie. Each path is an array of parts
module.exports = R.pipe(
  R.trim,
  R.split('\n'),
  R.converge(R.splitAt, [getSplitIndex, R.identity]),
  R.map(R.pipe( // map over [patterns, paths]
    R.tail,
    R.map(R.pipe(
      R.split(/(,|\/)/)
      // TODO: cannot split the same way for each,
      // must split only commas on first, and only whacks on second
      // R.filter(isNotDemarcation)
    ))
  ))
  // mapFirstToTrie
);
