'use strict';

(function(window)
{

	require('./lib/es6');
	require('./lib/collection');

	const
		crypto = require('crypto'),
		Generator = (function*(){}).constructor;


	const utility = 
	{
		array: require('./lib/array'),
		number: require('./lib/number'),
		object: require('./lib/object'),
		promise: require('./lib/promise'),
		isFunction: fn => typeof(val) === 'function',
		isGenerator: fn => fn.constructor.name === 'GeneratorFunction' || fn instanceof Generator,
		isObject: data => typeof(data) === 'object',
		isBool: data => typeof(data) === 'boolean',
		isArray: Array.isArray,
		hash: data =>
		{
			if (typeof(data) === 'string')
				data = new Buffer(data);

		  return crypto.createHash('md5').update(data).digest('hex'); // 'hex', 'binary' or 'base64'
		},
		uuid: len => crypto.randomBytes(len / 2 || 16).toString('hex'),
		noop: () => {}
	};

	utility.clone = utility.object.clone;
	utility.mix = utility.object.mix;

	utility.with = utility.object.with;
	utility.each = utility.object.each;

	utility.typeof = utility.object.typeof;

	utility.isFn = utility.isFunction;
	utility.isGen = utility.isGenerator;
	utility.isObj = utility.isObject;

	if(module && module.exports)
		module.exports = utility;

})(global || window);
