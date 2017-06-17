const clone = require('./clone')
const isObject = require('./utils/is-object')

function deepEqual(target, source, callback) {
	if ((!isObject(source) && !Array.isArray(source))
		|| (!isObject(target) && !Array.isArray(target)))
	{
		if (callback) {
			return callback(target, source);
		}
		return target === source;
	}

	for (let key in source) {
		if (!deepEqual(target[key], source[key])) {
			return false;
		}
	}

	return true;
}

module.exports = deepEqual;