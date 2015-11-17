'use strict';

const
	o = require('./object');

if (Promise && !Promise.map)
	Promise.map = (data, fn) => Promise.all(data.map(e => fn(e)));


const pormise =
{
	make: function()
	{
		let
			args = Array.prototype.slice.call(arguments),
			action = args[0];

		args = args.slice(1);


	  return new Promise((resolve, reject) =>
	  	{
				args.push((err, result) => err ? reject(err) : resolve(result));
	  		action.apply(null, args);
	  	});
	},
	makeDate: function(data /* type:array */, selector)
	{
		let result = [], item;

		data[selector].map(e =>
		{
			item = o.clone(data);
			item[selector] = e;
			result.push(item);
		});
		return result;
	},
	parallel: function(data /* type:array */, make, _fn)
	{
		Promise.map(data, make)
			.then(result => _fn && _fn(null, result))
			.catch(err => _fn && _fn(err));
	}
};


module.exports = pormise;