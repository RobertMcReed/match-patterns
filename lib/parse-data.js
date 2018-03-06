'use strict';

const R = require('ramda');

const Trie = require('./trie.js');

// get the index of the start of the paths
const getSplitIndex = R.pipe(
  R.head,
  R.add(1)
);

const mapIndexed = R.addIndex(R.map);
const firstToTrie = (val, i) => i === 0 ? new Trie(val).head : val;
const mapFirstToTree = mapIndexed(firstToTrie);

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
  )),
  R.pipe(
    mapFirstToTree,
    R.reverse
  )
);

module.exports = parser;
