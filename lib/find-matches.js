'use strict';

const R = require('ramda');

const numProps = obj => Object.keys(obj).length;
const arrayIsEmpty = R.pipe(R.length, R.not);
const objIsEmpty = R.pipe(numProps, R.not);

const mapHasPath = (path, map) => Boolean(map[path]);
const mapHasWildcard = map => mapHasPath('*', map);

const _determineIfMatchRecursively = (
  remainingPathArray, 
  currentMap, 
  matchingPatterns, 
  currentPattern = []
) => {
  const endOfPath = arrayIsEmpty(remainingPathArray);
  const endOfPattern = objIsEmpty(currentMap);
  
  // found a matching pattern, add and stop searching
  if (endOfPath && endOfPattern) {
    matchingPatterns.push(currentPattern);
    return;
  }

  // path and pattern not the same length, stop searching
  if (endOfPath || endOfPattern) return;

  // keep searching
  const currentPath = remainingPathArray.shift();
  const foundPath = mapHasPath(currentPath, currentMap);
  const foundWildcard = mapHasWildcard(currentMap);

  if (foundPath) {
    _determineIfMatchRecursively(
      [...remainingPathArray], 
      currentMap[currentPath], 
      matchingPatterns, 
      [...currentPattern, currentPath]
    );
  }

  if (foundWildcard) {
    _determineIfMatchRecursively(
      [...remainingPathArray], 
      currentMap['*'], 
      matchingPatterns, 
      [...currentPattern, '*']
    );
  }
};

const findMatchingPatterns = (patternsMap) => (fullPath) => {
  const matchingPatterns = [];
  _determineIfMatchRecursively(fullPath, patternsMap, matchingPatterns);

  return matchingPatterns;
};

// data comes in as [patterns, paths]
module.exports = pathsAndPatterns =>
  R.map(findMatchingPatterns(pathsAndPatterns[0]), pathsAndPatterns[1]);
