'use strict';

var
	o = require('./object');

if (Promise && !Promise.map)
{
	Promise.map = function(data, fn)
	{
		return Promise.all(data.map(function(item)
		{
			return fn(item);
		}));
	}
};


var pormise =
{
	make: function()
	{
		var
			args = Array.prototype.slice.call(arguments),
			action = args[0],
			args = args.slice(1);


	  return new Promise(function(resolve, reject)
	  	{
				args.push(function(err, result)
				  {
				      if (err) return reject(err);
				      resolve(result);
				  });

	  		action.apply(null, args);
	  	});
	},
	makeDate: function(data /* type:array */, selector)
	{
		var result = [], item;

		data[selector].map(function(val)
		{
			item = o.clone(data);
			item[selector] = val;
			result.push(item);
		});
		return result;
	},
	parallel: function(data /* type:array */, make, _fn)
	{
		Promise.map(data, make)
			.then(function(result)
			{
				_fn && _fn(null, result);
			})
			.catch(function(err)
			{
				_fn && _fn(err);
			});
	}
};


module.exports = pormise;