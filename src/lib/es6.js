'use strict';
// Array
if (![].includes) 
{
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) 
  {
    let O = Object(this);
    let len = parseInt(O.length) || 0;
    if (len === 0) return false;
    let n = parseInt(arguments[1]) || 0;
    let k;
    if (n >= 0) 
      k = n;
    else
    {
      k = len + n;
      if (k < 0) k = 0;
    }
    let currentElement;
    while (k < len) 
    {
      currentElement = O[k];
      if (searchElement === currentElement || (searchElement !== searchElement && currentElement !== currentElement)) 
        return true;
      k++;
    }
    return false;
  };
 };


if (!Array.from) 
{
  Array.from = (function () 
  {
    let toStr = Object.prototype.toString;
    let isCallable = function (fn) 
    {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    let toInteger = function (value) 
    {
      let number = Number(value);
      if (isNaN(number)) return 0;
      if (number === 0 || !isFinite(number)) return number;
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    let maxSafeInteger = Math.pow(2, 53) - 1;
    let toLength = e => Math.min(Math.max(toInteger(e), 0), maxSafeInteger);

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) 
    {
      // 1. Let C be the this value.
      let C = this;

      // 2. Let items be ToObject(arrayLike).
      let items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) 
        throw new TypeError("Array.from requires an array-like object - not null or undefined");

      // 4. If mapfn is undefined, then let mapping be false.
      let mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      let T;
      if (typeof mapFn !== 'undefined') 
      {
        // 5. else      
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) 
          throw new TypeError('Array.from: when provided, the second argument must be a function');

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) 
          T = arguments[2];
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      let len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      let A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      let k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      let kValue;
      while (k < len) 
      {
        kValue = items[k];
        if (mapFn) 
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        else 
          A[k] = kValue;
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}


if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    let list = Object(this);
    let length = list.length >>> 0;
    let thisArg = arguments[1];
    let value;

    for (let i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

if (!String.prototype.startsWith)
{
  String.prototype.startsWith = function(searchString, position)
  {
    position = position || 0;
    return this.lastIndexOf(searchString, position) === position;
  };
}

if (!String.prototype.endsWith)
{
  String.prototype.endsWith = function(searchString, position)
  {
      let subjectString = this.toString();
      if (position === undefined || position > subjectString.length)
        position = subjectString.length;
      
      position -= searchString.length;
      let lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}


if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null)
      throw new TypeError('Array.prototype.find called on null or undefined');

    if (typeof predicate !== 'function')
      throw new TypeError('predicate must be a function');

    let list = Object(this);
    let length = list.length >>> 0;
    let thisArg = arguments[1];
    let value;

    for (let i = 0; i < length; i++)
    {
      value = list[i];
      if (predicate.call(thisArg, value, i, list))
        return value;
    }
    return undefined;
  };
}
