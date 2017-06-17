const clone = require('./clone')
const isObject = require('./utils/is-object')

function deepClone(object, callback) {
	if (!isObject(object) && !Array.isArray(object)) {
		if (callback) {
			return callback(object);
		}
		return object;
	}

	object = clone(object);
	for (let key in object) {
		object[key] = deepClone(object[key]);
	}

	return object;
}

module.exports = deepClone;