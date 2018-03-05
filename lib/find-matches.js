'use strict';

const R = require('ramda');

const areSameLength = (first, second) => R.equals(R.length(first), R.length(second));

const getMatchingPatterns = (patterns) => (path) => {
  const matchingPatterns = [];
  patterns.forEach(pattern => {
    if (areSameLength(path, pattern)) {
      // 
    }
  });
};
