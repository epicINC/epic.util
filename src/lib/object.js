'use strict';

const
	Generator = (function*(){}).constructor,
	objecToString = Object.prototype.toString,
	cache = new Map();

const co = require('co');


/*
cache.set(undefined, 'undefined');
cache.set(null, 'null');

//cache.set('object', 'object');
cache.set('boolean', 'boolean');
cache.set('number', 'number');
cache.set('string', 'string');
cache.set('function', 'function');
cache.set('symbol', 'symbol');

cache.set('[object Boolean]', 'boolean');
cache.set('[object Number]', 'number');
cache.set('[object String]', 'string');
cache.set('[object Array]', 'array');
cache.set('[object Function]', 'function');
cache.set('[object Date]', 'date');
cache.set('[object Error]', 'error');
cache.set('[object RegExp]', 'regexp');
cache.set('[object Symbol]', 'symbol');
*/
const eachGenerator = function*(val, fn)
{
	if (!Array.isArray(val)) return yield fn(val);

	for (var i = 0; i < val.length; i++)
		yield* fn(val[i]);

}


const objectExtension = 
{

	/**
	 * typeof ex
	 * result: 'undefined', 'null', 'object', 'number', 'string', 'array', 'function', 'symbol', 'date', 'regexp', 'error'
	 *
	 * @access public
	 * @param {Object} val
	 * @return {string}
	 */
	typeof: function(val)
	{
		let key;
		return val === null ? 'null'
			: val === undefined ? 'undefined'
			: Array.isArray(val) ? 'array'
			: cache.get(key = typeof(val))
			|| (key = typeof val) !== 'object' ? !cache.set(key, key) || key
			: cache.get(key = objecToString.call(val))
			|| this.with(key.slice(8, -1).toLowerCase(), e => cache.set(key, e) && false);
	},
	isFunction: fn => typeof(val) === 'function',
	isGenerator: fn => fn.constructor.name === 'GeneratorFunction' || fn instanceof Generator,
	isObject: data => typeof(data) === 'object',
	isBool: data => typeof(data) === 'boolean',

	/**
	 * with & with result
	 * 1 with(val, fn) return val
	 * 2 with(val)(fn) return fn(val)
	 *
	 * @access public
	 * @param {Object} val
	 * @param {Function} val
	 * @return {Object|Function}
	 */
	with: function(val, _fn)
	{
		if (!_fn) return e => e(val);
		_fn(val);
		return val;
	},

	/**
	 * with & with result
	 * 1 with(val, fn) return val
	 * 2 with(val)(fn) return fn(val)
	 *
	 * @access public
	 * @param {Object} val
	 * @param {Function} val
	 * @return {Object|Function}
	 */

	each: function(val, _fn)
	{
		if (!_fn) return fn =>
		{
			if (objectExtension.isGenerator(fn))
			{
				return function(done)
				{
					co(function*()
					{
						done(yield eachGenerator(val, _fn));
					})
					.catch(e => console.log(e.stack));
				};
			}
			return Array.isArray(val) ? val.map(fn) : fn(val);
		};

		if (objectExtension.isGenerator(_fn))
		{
			return function(done)
			{
				co(function*()
				{
					yield eachGenerator(val, _fn);
					done(val);
				})
				.catch(e => console.log(e.stack));
			};
		}


		if (Array.isArray(val))
			val.forEach(_fn);
		else
			_fn(val);
		return val;
	},


	copy: function(target, dest, _exclude, _override)
	{
		return this.mix(dest, target, _override);
	},

	/**
	 * clone
	 *
	 * @access public
	 * @param {Object} val
	 * @param {string|string[]} _exclude
	 * @param {boolean} _deep
	 * @return {Object}
	 */
	clone: function(data, _exclude, _deep)
	{
		if (_exclude === true || _deep === true)
			 return this.cloneDeep(data, _exclude);

		if (_exclude && this.typeof(_exclude) === 'string')
			_exclude = [_exclude];

		switch(this.typeof(data))
		{
			case 'object':
				let result = {};
				Object.keys(data).forEach(key =>
				{
					if (_exclude && _exclude.indexOf(key) !== -1) return;
					result[key] = data[key];
				});
				return result;	
			case 'array':
				return data.slice();
			default:
				return data;
		}
	},

	/**
	 * cloneDeep
	 *
	 * @access public
	 * @param {Object} val
	 * @return {Object}
	 */
	cloneDeep: function(data)
	{

		switch(this.typeof(data))
		{
			case 'object':
				let result = {};
				Object.keys(data).forEach(key => result[key] = this.cloneDeep(data[key]));
				return result;	
			case 'array':
				return data.map(e => this.cloneDeep(e));
			default:
				return data;
		}

		//return JSON.parse(JSON.stringify(val));
	},
	
	/**
	 * mix from src to dest
	 *
	 * @access public
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {boolean} _override
	 * @return {Object}
	 */
	mix: function(dest, src, _exclude, _override)
	{
		if (arguments.length === 1) return this.clone(dest);

		if (dest === null || dest === undefined) return src;
		if (src === null || src === undefined) return dest;
		if (arguments.length === 3 && typeof(_exclude) === 'boolean')
		{
			_override = _exclude;
			_exclude = undefined;

		}

		if (_override === undefined) _override = true;

		Object.keys(src).forEach(key =>
		{
			switch(this.typeof(src[key]))
			{
				case 'object':
					if (_override || !dest.hasOwnProperty(key)) dest[key] = {};
					return this.mix(dest[key], src[key], _override);
					break;
				case 'array':
					if (_override || !dest.hasOwnProperty(key)) dest[key] = [];
					return this.mix(dest[key], src[key], _override);
					break;
				default:
					if (_override || !dest.hasOwnProperty(key)) dest[key] = src[key];
					break;
			}
		});

		return dest;
	}
};

if(module && module.exports)
	module.exports = objectExtension;