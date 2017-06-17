const clone = require('./clone')

function setIn(object, keys, value) {
	if (keys.length === 0) {
		return value;
	}

	object = clone(object);
	object[keys[0]] = setIn(object[keys[0]], keys.slice(1), value);

	return object;
}

module.exports = setIn;