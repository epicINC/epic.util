const
	fs = require('fs'),
	path = require('path'),
	debug = require('debug')('epic.util:file');

class File {

	static exists (file) {
		try {
			fs.statSync(file)
			return true;
		}
		catch (e) {
			debug('not exists: %s', file);
			return false;
		}
	}

	static require (file) {
		try {
			return require(file);
		}
		catch (e) {
			debug('load fail: %s, %s', file, e.message);
		}
	}

	static load (...args) {
		let result = [], item;
		args.forEach(e => {
			item = File.require(e);
			if (item) result.push(item);
		});

		return result;
	}

}



module.exports = File;