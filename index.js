'use strict';

const util = require('./lib/util.js');
const readStdin = require('./lib/read-stdin.js');

readStdin()
  .then(util.logRaw)
  .catch(console.log);
