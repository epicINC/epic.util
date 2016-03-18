'use strict';

const isNullOrUndefined = args => args === null || args === undefined;


let a = 'dfadf';


a = e => console.log(a);

a();

return;

const epic =
{
	with: (data, _fn) =>
	{
		if (_fn)
		{
			_fn(data);
			return data;
		}

		let fn = e => e && e(data) || new SingleRunner(data);
		Object.defineProperty(fn, 'empty', {
		  get: () => new SingleRunner(data).empty,
		  enumerable: false,
		  configurable: false
		});

		fn.filter = e => new SingleRunner(data).filter(e);
		fn.each = e => new SingleRunner(data).each(e);
		fn.map = e => new SingleRunner(data).map(e);

		return fn;

	},

	each: (data, _fn) =>
	{
		if (!Array.isArray(data))
			return epic.with(data, _fn);

		let result = new MultiRunner(data);
		if (_fn)
		{
			result.each(_fn);
			return data;
		}

		let fn = e => e && result.map(data) || result;
		Object.defineProperty(fn, 'empty', {
		  get: () => result.empty,
		  enumerable: false,
		  configurable: false
		});

		fn.filter = e => result.filter(e);
		fn.each = e => result.each(e);
		fn.map = e => result.map(e);

		return fn;
	}


};




class SingleRunner
{
	constructor(data)
	{
		this.terminate;
		this.context = data;
	}

	filter(fn)
	{
		if (!fn || this.terminate) return this;

		this.terminate = !fn(this.context);
		return this;
	}

	each(fn)
	{
		if (!fn || this.terminate) return this;

		fn(this.context);
		return this;
	}

	map(fn)
	{
		if (!fn || this.terminate) return this;

		return fn(this.context);
	}

	get empty()
	{
		this.filter(e => !isNullOrUndefined(e))
		return this;
	}
}


class MultiRunner
{
	constructor(data, single)
	{
		this.terminate;
		this.context = data;
	}

	filter(fn)
	{
		if (!fn || this.terminate) return this;

		this.context = this.context.filter(fn);
		return this;
	}

	each(fn)
	{
		if (!fn || this.terminate) return this;

		this.context.forEach(fn);
		return this;
	}

	map(fn)
	{
		if (!fn || this.terminate) return this;

		return this.context.map(fn);
	}

	get empty()
	{
		this.filter(e => !isNullOrUndefined(e))
		return this;
	}
}


let d = {b:1};


epic.each(d).empty.each(e =>
{
	console.log('each', e);
});
