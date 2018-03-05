'use strict';

const R = require('ramda');

const util = module.exports = {};

const formatStringify = data => JSON.stringify(data, null, 2);

util.logRaw = R.pipe(
  JSON.stringify,
  console.log
);

util.logFormatted = R.pipe(
  formatStringify,
  console.log
);
