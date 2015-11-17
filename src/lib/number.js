'use strict';


const radixAlgorithm =
{
	chars: '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ',
	charsMap: null,
	init: function()
	{
		radixAlgorithm.charsMap = {};
		for (let i = 0; i < radixAlgorithm.chars.length; i++)
			radixAlgorithm.charsMap[radixAlgorithm.chars[i]] = i;
	},
	to: function(number, radix)
	{
		if (!radixAlgorithm.charsMap) radixAlgorithm.init();

		let qutient = +number, result = [], mod;
	 	do
	 	{
	    mod = qutient % radix;
	    qutient = (qutient - mod) / radix;
	    result.unshift(radixAlgorithm.chars[mod]);
	  } while (qutient);

	  return result.join('');
	},

	from: function(numString, radix)
	{
		if (!radixAlgorithm.charsMap) radixAlgorithm.init();

		let code = String(numString), count = code.length, i = 0, result = 0;
		while (i < count)
		  result += Math.pow(radix, i++) * (radixAlgorithm.charsMap[code.charAt(count - i)] || 0);
		return result;
	}
};



const number =
{
	toString: function(number, radix)
	{
		if (radix >= 2 && radix <= 36)
			return number.toString(radix)
		return radixAlgorithm.to(number, radix);
	},
	parse: function(numString, radix)
	{
		if (radix >= 2 && radix <= 36)
			return parseInt(numString, radix);
		return radixAlgorithm.from(numString, radix);
	}
};


if(module && module.exports)
	module.exports = number;