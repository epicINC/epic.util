


(function(Global)
{
	if (Global.Queue) return;

	var
		symbol = Symbol();
		slice = Array.prototype.slice;

	var Queue = Global.Queue = function(data)
	{
	  if (!(this instanceof Queue))
	    return new Queue(data);

	  if (data)
	  	this[symbol] = Array.isArray(data) ? slice.call(data) : new Array(data);
	  else
	  	this[symbol] = [];
	};

	Queue.prototype.de = Queue.prototype.dequeue = function()
	{
		return this[symbol].shift();
	};

	Queue.prototype.en = Queue.prototype.enqueue = function(data)
	{
		return this[symbol].push(data);
	};

	Queue.prototype.peek = function(data)
	{
		return this[symbol][0];
	};
	Queue.prototype.clone = function()
	{
		return new Queue(this[symbol]);
	};

	Queue.prototype.toArray = function()
	{
		return slice.call(this[symbol]);
	};

	Queue.prototype.clear = function()
	{
		this[symbol].length = 0;
	};


	Object.defineProperty(Queue.prototype, 'count', 
	{ 
		get: function() { return this[symbol].length; }
	});

})(window || global);

