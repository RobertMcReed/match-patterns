'use strict';

class TrieNode {
  constructor(end = false) {
    this.end = end;
    this.next = {};
  }

  addChild(value, end = false) {
    const valueNode = this.next[value];
    if (valueNode) {
      if (end && !valueNode.end) valueNode.end = true;
    } else {
      this.next[value] = new TrieNode(end);
    }
  }

  setEnd() {
    this.end = true;
  }
}

class Trie {
  constructor(patterns) {
    this.head = {};
    if (patterns) this.buildTree(patterns);
  }

  buildTree(patterns) {
    patterns.forEach(pattern => this.addPattern(pattern));
  }

  addPattern(patternArray) {
    if (!patternArray.length) return;

    const patternArrayCopy = patternArray.slice();
    const firstPatternPart = patternArrayCopy.shift();
    let nodeToStart = this.head[firstPatternPart];
    const end = !patternArrayCopy.length;

    // ensure that what we pass to the recursive call is a TrieNode
    if (!nodeToStart) {
      nodeToStart = new TrieNode();
      this.head[firstPatternPart] = nodeToStart;
    }

    if (end) nodeToStart.setEnd();
    else this._addPatternRecursively(patternArrayCopy, nodeToStart);
  }

  _addPatternRecursively(patternArrayCopy, lastNode) {
    if (!patternArrayCopy.length) return;

    const currentValue = patternArrayCopy.shift();
    const end = !patternArrayCopy.length;
    
    lastNode.addChild(currentValue, end);
    const currentNode = lastNode.next[currentValue];
    this._addPatternRecursively(patternArrayCopy, currentNode);
  }
}

module.exports = Trie;
