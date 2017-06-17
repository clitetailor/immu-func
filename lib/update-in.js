const clone = require('./clone')

function updateIn(object, keys, callback) {
	if (keys.length === 0) {
		return callback(object);
	}

	object = clone(object);
	object[keys[0]] = updateIn(object[keys[0]], keys.slice(1), callback);

	return object;
}

module.exports = updateIn;
