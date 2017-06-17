const clone = require('./clone')

function update(object, key, callback) {
	object = clone(object);
	object[key] = callback(object[key]);

	return object;
}

module.exports = update;