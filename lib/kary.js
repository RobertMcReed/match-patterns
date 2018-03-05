'use strict';

const R = require('ramda');

class Node {
  constructor(value) {
    this[value] = {};
  }
}

class Kary {
  constructor(patterns) {
    this.head = null;
    if (patterns) this.buildTree(patterns);
  }

  buildTree(patterns) {
    patterns.forEach(pattern => this.addPattern(pattern));
  }

  addPattern(patternArray) {
    const patternArrayCopy = patternArray.slice();
    if (!this.head) this._addFirstPattern(patternArrayCopy);
    else this._addPatternRecursively(patternArrayCopy, this.head);
  }

  _addFirstPattern(patternArrayCopy) {
    const currentValue = patternArrayCopy.shift();
    this.head = new Node(currentValue);

    this._addPatternRecursively(patternArrayCopy, this.head[currentValue]);
  }

  _addPatternRecursively(patternArrayCopy, childrenMap) {
    if (!R.length(patternArrayCopy)) return;

    const currentValue = patternArrayCopy.shift();
    const foundCurrentValue = childrenMap[currentValue];
    if (foundCurrentValue) this._addPatternRecursively(patternArrayCopy, foundCurrentValue);
    else {
      let nextMap = {};
      childrenMap[currentValue] = nextMap;
      this._addPatternRecursively(patternArrayCopy, nextMap);
    }
  }
}

module.exports = Kary;

const patterns = [
  ['*', 'b', '*'],
  ['a', '*', '*'],
  ['*', '*', 'c'],
  ['foo', 'bar', 'baz'],
  ['w', 'x', '*', '*'],
  ['*', 'x', 'y', 'z'],
  ['*', 'x', 'y', 'b'],
];

const example = [
  ['r', 'o', 'b'],
  ['r', 'o', 'o', 't'],
  ['r', 'o', 'l', 'l'],
  ['r', 'e', 'd'],
];

const kerry = new Kary(example);

const util = require('./util.js');

util.logFormatted(kerry);
