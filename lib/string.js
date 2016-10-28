

const reg =
{
	format: /{(\d+)}/g
}


const StringExtsion = 
{
	format: function(format)
	{
		if (!format) return format;
		let args = Array.prototype.slice.call(arguments, 1);
		return format.replace(reg.format, (match, number) => args[number] !== undefined ? args[number] : match);

		let i = 0
		return format.replace(/%([a-z]{1})/g, (match, type) =>
		{
			let result;
			switch(type)
			{
				case 's':
					result = args[i];
			}

			i++;
			return result !== undefined ? result : match
		}); 
	}
};

if (!String.prototype.padStart)
	Object.defineProperty(String.prototype, 'padStart', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function padStart (targetLength, padString = ' ') {
			return padString.repeat(Math.max(0, targetLength - this.length)) + this;
		}
	});

if (!String.prototype.padEnd)
	Object.defineProperty(String.prototype, 'padEnd', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function padEnd (targetLength, padString = ' ') {
			return this + padString.repeat(Math.max(0, targetLength - this.length));
		}
	});



if(module && module.exports)
	module.exports = StringExtsion;