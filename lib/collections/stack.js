
(function(Global)
{
	if (Global.Stack) return;

	var
		symbol = Symbol();
		slice = Array.prototype.slice;

	var Stack = Global.Stack = function(data)
	{
	  if (!(this instanceof Stack))
	    return new Stack(data);

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

})(window || global);