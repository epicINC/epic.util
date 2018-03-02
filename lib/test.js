'use strict';
const array = require('./array');

const isNullOrUndefined = args => args === null || args === undefined;


console.log(array.Distinct.binaryWithSelector([1,2,3,4,5,1,6], e => e));