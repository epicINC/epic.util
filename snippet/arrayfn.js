'use strict';


function test(arr, _selector)
{
	let field = _selector;
	_selector = e => e[field];
	return arr.map(_selector);
}


let data = [{a:1}, {a:2}];


console.log(test(data, 'a'));