'use strict';


const helper =
{
	defaultmin: function(p, v)
	{
		return p < v ? p : v; 
	},
	defaultmax: function(p, v)
	{
		return p > v ? p : v; 
	},
	numbermin: function(data)
	{
		return this.minLoop(data, Infinity);
	},
	numbermax: function(data)
	{
		return this.maxLoop(data, -Infinity);
	},
	stringmin: function(data)
	{
		return this.minLoop(data, String.fromCharCode(65535));
	},
	stringmax: function(data)
	{
		return this.maxLoop(data, String.fromCharCode(0));
	},
	minLoop: function (data, defaultVal)
  {
		let len = data.length, min = defaultVal;
    while (len--)
    {
      if (data[len] < min) min = data[len];
    }
    return min;
  },
  maxLoop: function (data, defaultVal)
  {
    let len = data.length, max = defaultVal;
    while (len--)
    {
      if (data[len] > max) max = data[len];
    }
    return max;
  },
	calc: function(action, data, _fn)
	{
		if (!_fn)
		{
			let type = typeof(data[0]);
			if (type === 'string' || type === 'number') return this[type + action](data);
		}
		return data.reduce(_fn || this['default'+ action]);
	},
	iterator: function(action, data, _selector, _comparer)
	{
		let result, val;

		switch(typeof(_selector))
		{
			case 'string':
				let field = _selector;
				_selector = e => e[field];
				result = data.map(_selector);
				break;
			case 'function':
				result = data.map(_selector);
				break;
			default:
				result = data;
		}

		val = this.calc(action, result, _comparer);

		return !_selector ? val : data.find(e => _selector(e) === val);
	}
};


if(module && module.exports)
	module.exports = helper;