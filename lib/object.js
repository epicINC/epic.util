'use strict';

var object = 
{
	with: function(val, fn)
	{
		if (typeof(fn) !== 'function') return this.mix(val, fn);
		fn(val)
		return val;
	},
	clone: function(value, deep)
	{
		if (!deep && Array.isArray(value)) return value.slice(0);
		if (!deep && typeof(value) === 'object') return this.mix({}, value);

		return JSON.parse(JSON.stringify(value));
	},
	mix: function(target, value)
	{
		if (arguments.length === 1) return this.mix({}, target);

		if (target === null || target === undefined) return value;
		if (value === null || value === undefined) return target;

		var self = this;
		Object.keys(value).map(function(key)
		{
			if (Array.isArray(value[key])) return self.mix(target[key] = [], value[key]);
			if (typeof(value[key]) === 'object')
			{
				if (!target[key]) target[key] = {};
				return self.mix(target[key], value[key])
			};
			target[key] = value[key]
		});

		return target;
	}
};

if(module && module.exports)
	module.exports = object;