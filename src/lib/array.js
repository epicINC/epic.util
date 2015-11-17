'use strict';

const
	helper = require('./helpers');

const array = 
{
	is: function(val)
	{
		return Array.isArray(val);
	},
	join: function(val)
	{
		return Array.prototype.concat.apply([], val);
	},
	clone: function(val)
	{
		if (!Array.isArray(val)) return val;
		if (!val.some(e => Array.isArray(e))) return val.slice();

		return val.map(e => this.clone(item));
	},
	min: function(data, _selector, _comparer)
	{
		return helper.minmax.iterator('min', data, _selector, _comparer);
	},
	max: function(data, _selector, _comparer)
	{
		return helper.minmax.iterator('max', data, _selector, _comparer);
	},
	minus: function(arr1, arr2)
	{
		if (!arr2 || arr2.length === 0) return arr1;
		if (!arr1 || arr1.length === 0) return arr2;

		// fast set
		return arr1.filter(e => arr2.indexOf(e) === -1);
	},
	distinct: function(val)
	{
		if (val.length < 200 || !Set) return array.distinctBinary(val);
		return array.distinctSet(val);
	},

	distinctSet: function (val)
	{
		let set = new Set(), result = [];
		for (let i = 0, count = val.length, item; i < val.length; i++)
		{
			item = val[i];
			if (!set.has(item))
			{
				set.add(item);
				result.push(item);
			}
		}
		return result;
	},

	distinctBinary: function (arr)
	{
		let
			set = [arr[0]],
			bst = {v: arr[0], l: null, r: null};

		for (let i = 1, value, uv, root, len = arr.length; i < len; i++)
		{
		  value = arr[i];
			root = bst;
		  uv = true;

		  while (true)
		  {
		    if (value > root.v)
		    {
		      if (!root.r)
		      {
		        root.r = {v: value, l: null, r: null};
		        break;
		      }
		      root = root.r;
		    }
		    else if (value < root.v)
		    {
		      if (!root.l)
		      {
		        root.l = {v: value,l: null,r: null};
		        break;
		      }
		      root = root.l;
		    }
		    else
		    {
		      uv = false;
		      break;
		    }
		  }
		  if (uv)
		    set.push(value);
		}
		return set;
	}
};


if(module && module.exports)
	module.exports = array;