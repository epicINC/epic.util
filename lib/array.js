'use strict';

const
	helper = require('./helpers');


if (!Array.prototype.any)
	Object.defineProperty(Array.prototype, 'any', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: Array.prototype.some
	});

if (!Array.prototype.lastAny)
	Object.defineProperty(Array.prototype, 'lastAny', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function lastAny(callback, _thisArg) {
			if (this == null)
	      throw new TypeError('Array.prototype.lastAny called on null or undefined');

	    if (typeof(callback) !== 'function')
	    	throw new TypeError();

	    let t = Object(this);
	    let len = t.length >>> 0;
	    _thisArg = _thisArg || void 0;
	    for (let i = len; i >= 0; i--) {
	    	if (i in t && callback.call(_thisArg, t[i], i, t)) return true;
	    }

	    return false;
		}
	});


class Selector {
	static property (selector) {
		return e => e[selector];
	}
}

const Extensions = 
{
	toObject (target, selector = 'id') {
		let result = {};
		if (typeof(selector) === 'string') selector = Selector.property(selector);
		target.forEach(e => result[selector(e)] = e);
		return result;
	},
	is (target) {
		return Array.isArray(target);
	},
	join (target) {
		return [].concat(...target);
		//return Array.prototype.concat.apply([], target);
	},
	clone (target) {
		return target.some(Array.isArray) ? target.map(Extensions.clone) : target.slice();
	},
	remove (target, index) {
		target.splice(index, 1);
	},
	min (data, selector = null, comparer = null) {
		return helper.minmax.iterator('min', data, selector, comparer);
	},
	max (data, selector = null, comparer = null) {
		return helper.minmax.iterator('max', data, selector, comparer);
	},
	minus (arr1, arr2) {
		if (!arr2 || arr2.length === 0) return arr1;
		if (!arr1 || arr1.length === 0) return arr2;

		// fast set
		return arr1.filter(e => arr2.indexOf(e) === -1);
	},
	distinct (target, selector = null) {
		if (target.length < 200 || !Set) return Distinct.binary(target, selector);
		return Distinct.set(target, selector);
	}

};

class Distinct {

	static Set (target, selector = null) {
		let set = new Set(), result = [];
		
		if (selector) {
			if (typeof(selector) === 'string') selector = Selector.property(selector);
			for (let i = 0, count = target.length, item, key; i < count; i++) {
				item = target[i];
				key = selector(item);
				if (set.has(key)) continue;
				set.add(key);
				result.push(item);
				
			}
		}
		else
			for (let i = 0, count = target.length, item; i < count; i++) {
				item = target[i];
				if (set.has(key)) continue;
				set.add(item);
				result.push(item);
			}
		return result;
	}

	static binary (target, selector = null) {
		if (selector) return Distinct.binaryWithSelector(target, selector);

		let
			set = [target[0]],
			bst = {v: target[0], l: null, r: null};

		for (let i = 1, item, uv, root, count = target.length; i < count; i++) {
		  item = target[i];
			root = bst;
		  uv = true;

		  while (true) {
		    if (item > root.v) {
		      if (!root.r) {
		        root.r = {v: item, l: null, r: null};
		        break;
		      }
		      root = root.r;
		    }
		    else if (item < root.v) {
		      if (!root.l) {
		        root.l = {v: item,l: null,r: null};
		        break;
		      }
		      root = root.l;
		    } else {
		      uv = false;
		      break;
		    }
		  }
		  if (uv) set.push(item);
		}

		return set;
	}

	static binaryWithSelector (target, selector = null) {
		if (!selector) return Distinct.binary(target);
		if (typeof(selector) === 'string') selector = Selector.property(selector);

		let
			set = [target[0]],
			bst = {v: target[0], l: null, r: null};

		for (let i = 1, item, key, uv, root, count = target.length; i < count; i++) {
		  item = target[i];
		  key = selector(item);
			root = bst;
		  uv = true;

		  while (true) {
		    if (key > root.v) {
		      if (!root.r) {
		        root.r = {v: key, l: null, r: null};
		        break;
		      }
		      root = root.r;
		    }
		    else if (key < root.v) {
		      if (!root.l) {
		        root.l = {v: key,l: null,r: null};
		        break;
		      }
		      root = root.l;
		    } else {
		      uv = false;
		      break;
		    }
		  }
		  if (uv) set.push(item);
		}

		return set;
	}
};

Extensions.Distinct = Distinct;

if(module && module.exports)
	module.exports = Extensions;