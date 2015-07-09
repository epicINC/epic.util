'use strict';

var
	epic = require('../index');




var update = function(data, _fn)
{

	_fn(null, data);
};

epic.promise.parallel(update, [1, 2, 3, 4], function(err, result)
{
	console.log(err);
	console.log(result);
});