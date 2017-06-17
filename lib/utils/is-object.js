function isObject(arg) {
	return !!arg && arg.constructor === Object;
}

module.exports = isObject;