var
	epic = require('../index');



var data = [ { group: { id: 'bf4806054033481c8f593a0fde2f3b3f' },
    ts: 1434032290220,
    limit: 10,
    skip: 0 },
  { group: { id: '88c6f4e7e42c40cfa327d5eb75251527' },
    ts: 1434032290220,
    limit: 10,
    skip: 0 },
  { group: { id: '022a01f233ca43bdaeb4b1a7ed4d7ab9' },
    ts: 1434032290220,
    limit: 10,
    skip: 0 },
  { group: { id: '34e9103ac0b14863b1a25609fa9e4aaa' },
    ts: 1434032290220,
    limit: 10,
    skip: 0 } ]


var cloneChecker = new Set();
cloneChecker.add();

function extend(from, to)
{
    if (from == null || typeof from != "object") return from;
    if (from.constructor != Object && from.constructor != Array) return from;
    if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function || from.constructor == String || from.constructor == Number || from.constructor == Boolean)
        return new from.constructor(from);

    to = to || new from.constructor();

    for (var name in from)
        to[name] = typeof to[name] == "undefined" ? extend(from[name], null) : to[name];

    return to;
}
console.log(extend(data));
console.log(extend(data[0]));