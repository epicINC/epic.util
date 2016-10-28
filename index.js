'use strict';

(function(window)
{

	require('./lib/es6');
	require('./lib/collection');

	const
		crypto = require('crypto');


	const utility = 
	{
		fs: require('./lib/file'),
		array: require('./lib/array'),
		number: require('./lib/number'),
		string: require('./lib/string'),
		object: require('./lib/object'),
		promise: require('./lib/promise'),
		qs: require('./lib/querystring'),
		isArray: Array.isArray,
		hash: data =>
		{
			if (typeof(data) === 'string')
				data = new Buffer(data);

		  return crypto.createHash('md5').update(data).digest('hex'); // 'hex', 'binary' or 'base64'
		},
		uuid: len => crypto.randomBytes(len / 2 || 16).toString('hex'),
		noop: () => {},
		sleep: (millis, cb) => new Promise((resolve, reject) => setTimeout(resolve, millis))
	};

	utility.copy = utility.object.copy;
	utility.clone = utility.object.clone;
	utility.mix = utility.object.mix;

	utility.with = utility.object.with;
	utility.each = utility.object.each;
	utility.map = utility.object.map;

	utility.typeof = utility.object.typeof;
	utility.isFn = utility.object.isFunction;
	utility.isGen = utility.object.isGenerator;
	utility.isObj = utility.object.isObject;
	utility.isBool = utility.object.isBool;



	if(module && module.exports)
		module.exports = utility;

})(global || window);
