'use strict';

const R = require('ramda');

const util = require('./util.js');
const Trie = require('./trie.js');
const helpers = require('./helpers.js');

const isStar = str => str === '*';

const getNonStar = arry => isStar(arry[0]) ? arry[1] : arry[0];

// takes in a pattern array and removes non *s
const keepWildcards = R.filter(isStar);

// takes in a pattern array and counts the wildcards
const countWildcards = R.pipe(keepWildcards, R.length);

// takes an array of patterns and totals the wildcards
const patternsToWildcardsCount = R.map(countWildcards);

// takes an array of patterns and identifies the fewest wildcards
const minWildcards = R.pipe(patternsToWildcardsCount, helpers.getArrayMin);

const patternHasXWildcards = (x) => (patternArray) => countWildcards(patternArray) === x;

// filters out all matches except those with the fewest wildcards
const getFewestWildcards = arrayOfPatterns => {
  const min = minWildcards(arrayOfPatterns);
  const hasMin = patternHasXWildcards(min);

  return R.filter(hasMin, arrayOfPatterns);
};

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

// recurse and choose non wildcard if possible
const _getBestPath = (subTrie, accumulator = []) => {
  const bestPathName = getBestPathName(subTrie.next);

  // base case, there are no more nodes
  if (helpers.doesNotExist(bestPathName)) return accumulator;

  return _getBestPath(subTrie.next[bestPathName], [...accumulator, bestPathName]);
};

// make a trie of the choices then choose the best path
const findBestMatchArray = matchingPatternsArray => {
  const patternTrie = getTrie(matchingPatternsArray);

  return _getBestPath({ next: patternTrie });
};

const findAndFormatBestMatch = R.pipe(findBestMatchArray, helpers.joinWithCommas);

const findBestMatch = matchingPatternsArray => {
  if (helpers.isEmpty(matchingPatternsArray)) return 'NO MATCH';
  if (helpers.hasLengthOne(matchingPatternsArray)) 
    return helpers.joinWithCommas(matchingPatternsArray);

  const fewestWildcardsArray = getFewestWildcards(matchingPatternsArray);

  return findAndFormatBestMatch(fewestWildcardsArray);
};

// take in the array of matches and return the best for each
module.exports = R.map(findBestMatch);
