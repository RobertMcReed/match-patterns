'use strict';

const util = require('./lib/util.js');
const helpers = require('./lib/helpers.js');
const readStdin = require('./lib/read-stdin.js');
const parseData = require('./lib/parse-data.js');
const findMatches = require('./lib/find-matches.js');
const findBestMatches = require('./lib/find-best-matches.js');

readStdin()
  .then(parseData)
  .then(findMatches)
  .then(findBestMatches)
  .then(helpers.joinAsLines)
  .then(console.log)
  .catch(console.log);
