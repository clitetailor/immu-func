function assign(target, source) {
	if (Array.isArray(target)) {
		return Object.assign(target.slice(), source);
	}
	return Object.assign({}, target, source);
}

module.exports = assign;