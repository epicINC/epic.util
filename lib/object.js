'use strict';

const
	Generator = (function*(){}).constructor,
	objecToString = Object.prototype.toString,
	cache = new Map();


// es-shims

const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
const concat = Function.bind.call(Function.call, Array.prototype.concat);
const keys = Reflect.ownKeys;

if (!Object.values) {
	Object.values = function values(O) {
		return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
	};
}

if (!Object.entries) {
	Object.entries = function entries(O) {
		return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []);
	};
}


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





// thinkserver rb450
class ObjectExtension {


	// [x, y, ...z]
	static rest (value, options) {
		let result = [];
		let exclude = [];
		let nest = {};

		options.forEach((e, i) => {
			if (e.length > 3 && e.startsWith('...')) {
				result.push(Object.assign({}, value));
				nest[e] = i;
			} else {
				result.push(value[e]);
				exclude.push(e);
			}
		});

		if (exclude.length)
			Object.values(nest).forEach(e => {
				Object.keys(exclude).forEach(ex => delete result[e][ex]);
			});

		return result;
	}


	/**
	 * typeof ex
	 * result: 'undefined', 'null', 'object', 'number', 'string', 'array', 'function', 'symbol', 'date', 'regexp', 'error'
	 *
	 * @access public
	 * @param {Object} val
	 * @return {string}
	 */
	static typeof (val) {
		let key;
		return val === null ? 'null'
			: val === undefined ? 'undefined'
			: Array.isArray(val) ? 'array'
			: cache.get(key = typeof(val))
			|| (key = typeof val) !== 'object' ? !cache.set(key, key) || key
			: cache.get(key = objecToString.call(val))
			|| this.with(key.slice(8, -1).toLowerCase(), e => cache.set(key, e) && false);
	}



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
	static with (val, _fn) {
		if (!_fn) return e => e(val);
		_fn(val);
		return val;
	}

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

	static each (val, fn) {
		Array.isArray(val) ? val.forEach(fn) : fn(val);
		return val;
	}

	static map (value, fn) {
		return Array.isArray(value) ? value.map(fn) : fn(value);
	}

	static copy (target, dest, _exclude, _override) {
		return this.mix(dest, target, _override);
	}

	/**
	 * clone
	 *
	 * @access public
	 * @param {Object} val
	 * @param {string|string[]} _exclude
	 * @param {boolean} _deep
	 * @return {Object}
	 */
	static clone (data, _exclude, _deep) {
		if (_exclude === true || _deep === true)
			 return this.cloneDeep(data, _exclude);

		if (_exclude && this.typeof(_exclude) === 'string')
			_exclude = [_exclude];

		switch(this.typeof(data)) {
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
	}

	/**
	 * cloneDeep
	 *
	 * @access public
	 * @param {Object} val
	 * @return {Object}
	 */
	static cloneDeep (data) {

		switch(this.typeof(data)) {
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
	}
	
	/**
	 * mix from src to dest
	 *
	 * @access public
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {boolean} _override
	 * @return {Object}
	 */
	static mix (dest, src, _exclude, _override) {
		if (arguments.length === 1) return this.clone(dest);

		if (dest === null || dest === undefined) return src;
		if (src === null || src === undefined) return dest;
		if (arguments.length === 3 && typeof(_exclude) === 'boolean') {
			_override = _exclude;
			_exclude = undefined;

		}

		if (_override === undefined) _override = true;

		Object.keys(src).forEach(key => {
			switch(this.typeof(src[key])) {
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


}

ObjectExtension.isFunction = fn => typeof(val) === 'function';
ObjectExtension.isGenerator = fn => fn.constructor.name === 'GeneratorFunction' || fn instanceof Generator;
ObjectExtension.isObject = data => typeof(data) === 'object';
ObjectExtension.isBool = data => typeof(data) === 'boolean';



if(module && module.exports)
	module.exports = ObjectExtension;