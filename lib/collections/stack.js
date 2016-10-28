'use strict';

(function(Global)
{
	if (Global.Stack) return;

	const
		symbol = Symbol('Stack'),
		slice = Array.prototype.slice;

	let Stack = Global.Stack = function(data)
	{
	  if (!new.target) return new Stack(data);

	  if (data)
	  	this[symbol] = Array.isArray(data) ? slice.call(data) : new Array(data);
	  else
	  	this[symbol] = [];
	};

	Stack.prototype.pop = function()
	{
		return this[symbol].pop();
	};

	Stack.prototype.push = function(data)
	{
		return this[symbol].push(data);
	};

	Stack.prototype.peek = function(data)
	{
		if (this[symbol].length === 0) return null;
		return this[symbol][this[symbol].length - 1];
	};
	Stack.prototype.clone = function()
	{
		return new Stack(this[symbol]);
	};

	Stack.prototype.toArray = function()
	{
		return slice.call(this[symbol]);
	};

	Stack.prototype.clear = function()
	{
		this[symbol].length = 0;
	};


	Object.defineProperty(Stack.prototype, 'count', 
	{ 
		get: function() { return this[symbol].length; }
	});

})(global || window);