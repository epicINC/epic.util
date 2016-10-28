const qs = require('querystring');


class QueryString {


	static encode (value) {
		return qs.escape(JSON.stringify(value));
	}


	static decode (value) {
		if (!value) return {};
		return JSON.parse(qs.unescape(value));
	}

};
module.exports = QueryString;