'use strict';

const
	objecToString = Object.prototype.toString,
	cache = new Map();


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

	withEach: function(val, _fn)
	{
		if (!_fn) return function(cb)
		{
			if (!cb) return val;
			return Array.isArray(val) ? val.map(cb) : cb(val);
		};

		if (Array.isArray(val))
			val.forEach(e => _fn(e))
		else
			_fn(val);
		return val;
	},

	/**
	 * clone
	 *
	 * @access public
	 * @param {Object} val
	 * @param {boolean} deep
	 * @return {Object}
	 */
	clone: function(val, deep)
	{
		if (deep === true) return this.cloneDeep(val);

		switch(this.typeof(val))
		{
			case 'object':
				let result = {};
				Object.keys(val).forEach(key => result[key] = val[key]);
				return result;	
			case 'array':
				return val.slice();
			default:
				return val;
		}
	},

	/**
	 * cloneDeep
	 *
	 * @access public
	 * @param {Object} val
	 * @return {Object}
	 */
	cloneDeep: function(val)
	{

		switch(this.typeof(val))
		{
			case 'object':
				let result = {};
				Object.keys(val).forEach(key => result[key] = this.cloneDeep(val[key]));
				return result;	
			case 'array':
				return val.map(e => this.cloneDeep(e));
			default:
				return val;
		}

		//return JSON.parse(JSON.stringify(val));
	},
	
	/**
	 * mix from src to dest
	 *
	 * @access public
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {boolean} override
	 * @return {Object}
	 */
	mix: function(dest, src, override)
	{
		if (arguments.length === 1) return this.clone(dest);

		if (dest === null || dest === undefined) return src;
		if (src === null || src === undefined) return dest;
		if (override === undefined) override = true;

		Object.keys(src).forEach(key =>
		{
			switch(this.typeof(src[key]))
			{
				case 'object':
					if (override || !dest.hasOwnProperty(key)) dest[key] = {};
					return this.mix(dest[key], src[key], override);
					break;
				case 'array':
					if (override || !dest.hasOwnProperty(key)) dest[key] = [];
					return this.mix(dest[key], src[key], override);
					break;
				default:
					if (override || !dest.hasOwnProperty(key)) dest[key] = src[key];
					break;
			}
		});

		return dest;
	}
};

if(module && module.exports)
	module.exports = objectExtension;