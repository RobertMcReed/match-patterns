'use strict';

const util = require('./lib/util.js');
const readStdin = require('./lib/read-stdin.js');
const parseData = require('./lib/parse-data.js');
const findMatches = require('./lib/find-matches.js');

readStdin()
  .then(parseData)
  .then(findMatches)
  // .then(util.printSeparately)
  .then(util.logFormatted)
  // .then(util.logRaw)
  .catch(console.log);
