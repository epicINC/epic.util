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
		isFn: function(val)
		{
		  return typeof(val) === 'function';
		},
		isGenFn: function(fn)
		{
			return fn instanceof Generator;
		},
		isObj: function(val)
		{
			return typeof(val) === 'object'
		},
		isBool: function(val)
		{
			return typeof(val) === 'boolean';
		},
		isArray: function(val)
		{
			return this.array.is(val);
		},
		hash: function(data)
		{
			if (typeof(data) === 'string')
				data = new Buffer(data);

		  return crypto.createHash('md5').update(data).digest('hex'); // 'hex', 'binary' or 'base64'
		},
		noop: function(){}
	};

	utility.clone = utility.object.clone;
	utility.mix = utility.object.mix;
	utility.with = utility.object.with;


	if(module && module.exports)
		module.exports = utility;

})(global || window);
