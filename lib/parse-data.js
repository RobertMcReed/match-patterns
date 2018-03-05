'use strict';

const R = require('ramda');

const util = require('./util.js');

const isNum = R.pipe(
  parseInt,
  isNaN,
  R.not
);

const getSplitIndex = R.pipe(
  R.map(isNum),
  R.lastIndexOf(true)
);


const parser = R.pipe(
  R.trim,
  R.split('\n'),
  R.converge(R.splitAt, [getSplitIndex, R.identity]),
  util.logFormatted
);

const data = '6\n*,b,*\na,*,*\n*,*,c\nfoo,bar,baz\nw,x,*,*\n*,x,y,z\n5\n/w/x/y/z/\na/b/c\nfoo/\nfoo/bar/\nfoo/bar/baz/\n';

parser(data);
