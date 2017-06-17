const clone = require('./clone')
const update = require('./update')
const assign = require('./assign')
const setIn = require('./set-in')
const updateIn = require('./update-in')
const deepMerge = require('./deep-merge')
const deepEqual = require('./deep-equal')
const deepClone = require('./deep-clone')
const completeAssign = require('./complete-assign')
const setType = require('./set-type')

class Immu {
	clone() {
		return clone(this);
	}

	update(...args) {
		return update(this, ...args);
	}

	assign(...args) {
		return assign(this, ...args);
	}

	setIn(...args) {
		return setIn(this, ...args);
	}

	updateIn(...args) {
		return updateIn(this, ...args);
	}

	deepMerge(...args) {
		return deepMerge(this, ...args);
	}

	deepEqual(...args) {
		return deepEqual(this, ...args);
	}

	deepClone(...args) {
		return deepClone(this, ...args);
	}

	completeAssign(...args) {
		return completeAssign(this, ...args);
	}

	setType(...args) {
		return setType(...args);
	}
};

module.exports = Immu;