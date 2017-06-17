const clone = require('./clone')
const isObject = require('./utils/is-object')

function deepMerge(target, source, callback) {
	if ((!isObject(source) && !Array.isArray(source))
		|| (!isObject(target) && !Array.isArray(target)))
	{
		if (callback) {
			return callback(target, source);
		}
		return source;
	}

	let result = clone(target);
	for (let key in source) {
		result[key] = deepMerge(target[key], source[key]);
	}

	return result;
}

module.exports = deepMerge;