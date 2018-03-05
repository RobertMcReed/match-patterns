'use strict';

const util = require('./lib/util.js');
const readStdin = require('./lib/read-stdin.js');
const parseData = require('./lib/parse-data.js');

readStdin()
  .then(parseData)
  .then(util.logFormatted)
  .catch(console.log);
