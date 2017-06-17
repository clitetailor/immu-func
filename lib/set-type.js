const completeAssign = require('./complete-assign')

function setType(object, type) {
	object = completeAssign(Object.create(type.prototype), object);
	return object;
}

module.exports = setType;