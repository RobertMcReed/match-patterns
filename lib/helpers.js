'use strict';

const R = require('ramda');

const helpers = module.exports = {};

helpers.isObject = data => (data instanceof Object && !Array.isArray(data));

helpers.getPropsArray = obj => Object.keys(obj);

helpers.getObjLength = obj => R.length(helpers.getPropsArray(obj));

helpers.getLength = data => helpers.isObject(data) ? helpers.getObjLength(data) : R.length(data);

helpers.hasLength = length => R.pipe(helpers.getLength, R.equals(length));

helpers.hasLengthZero = helpers.hasLength(0);

helpers.hasLengthOne = helpers.hasLength(1);

helpers.isEmpty = helpers.hasLengthZero;

helpers.isEmptyOrOne = R.either(helpers.isEmpty, helpers.hasLengthOne);

helpers.exists = data => data !== null && data !== undefined;

helpers.doesNotExist = R.pipe(helpers.exists, R.not);

helpers.getArrayMin = arry => R.min(...arry);

helpers.joinWithCommas = R.join(',');

helpers.joinAsLines = R.join('\n');
