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
		isGen: function(fn)
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
		uuid: () => crypto.randomBytes(16).toString('hex'),
		noop: () => {}
	};

	utility.clone = utility.object.clone;
	utility.mix = utility.object.mix;

	utility.with = utility.object.with;
	utility.withEach = utility.object.withEach;

	utility.typeof = utility.object.typeof;


	if(module && module.exports)
		module.exports = utility;

})(global || window);
