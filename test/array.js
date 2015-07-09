var epic = require('../index');



String.prototype.hashCode1 = function()
{
  var hash = 0;
  if (this.length == 0) return hash;

  var total = this.length -1, len = this.length, code;
  while (len--)
  {
  	code = this.charCodeAt(total - len);
  	hash = ((hash<<5)-hash)+code;
  	//hash = hash & hash;
  	hash |= 0;
  };

/*
  for (i = 0; i < this.length; i++)
  {
      char = this.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }
*/
  return hash;
};



String.prototype.hashCode2 = function()
{
  var hash = 0;
  if (this.length == 0) return hash;

  for (i = 0; i < this.length; i++)
  {
      char = this.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
};




var data1 = [41,73,98,62,85,51,28,89,20];

console.log('min:', epic.array.min(data1));
console.log('max:', epic.array.max(data1));



var data2 = [{a:41}, {a:73}, {a:98}, {a:62}, {a:85}, {a:51}, {a:28}, {a:89}, {a:20}];

console.log('min:', epic.array.min(data2, 'a'));
console.log('max:', epic.array.max(data2, 'a'));

var selector = function(item){return item.a;};
console.log('min:', epic.array.min(data2, selector));
console.log('max:', epic.array.max(data2, selector));

var data3 = [{a:'a'}, {a:'aaaaaa'}, {a:'aa'}, {a:'ddfd'}, {a:'adfadsdfasdfasd'}, {a:'afdsas'}, {a:'fadafds'}, {a:'adfasdf'}, {a:'adfad'}];


var mincomparer = function(p, v) { return p.a.length < v.a.length ? p : v };
var maxcomparer = function(p, v) { return p.a.length > v.a.length ? p : v };


console.log('min:', epic.array.min(data3, selector));
console.log('max:', epic.array.max(data3, selector));

console.log('min:', epic.array.min(data3, null, mincomparer));
console.log('max:', epic.array.max(data3, null, maxcomparer));


//var minhashcomparer = function(p, v) { return p.a.hashCode2() < v.a.hashCode2() ? p : v };
//var maxhashcomparer = function(p, v) { return p.a.hashCode2() > v.a.hashCode2() ? p : v };



var minhashcomparer = function(p, v) { return hashFnv32a(p.a) < hashFnv32a(v.a) ? p : v };
var maxhashcomparer = function(p, v) { return hashFnv32a(p.a) > hashFnv32a(v.a) ? p : v };


console.log('min:', epic.array.min(data3, null, minhashcomparer));
console.log('max:', epic.array.max(data3, null, maxhashcomparer));

function hashFnv32a(str) {
        /*jshint bitwise:false */
        var i, l,
                hval = 0x811c9dc5;
    
        for (i = 0, l = str.length; i < l; i++) {
                hval ^= str.charCodeAt(i);
                hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
        return hval >>> 0;
    }

console.log('aaaaaa'.hashCode1());
console.log('aaaaaa'.hashCode2());

console.log(hashFnv32a('aaaaaa'));