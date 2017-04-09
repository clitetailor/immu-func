let immu = require('../lib');

let list = [
	'clone',
	'assign',
	'setIn',
	'modifyIn',
	'updateIn',
	'deepMerge',
	'deepUpdate',
	'deepEqual',
	'setType'
]

let o = {};

for (let key of list) {
	o[key] = function () {
		Object.prototype[key] = function (...args) {
			return immu[key](this, ...args);
		}
		Array.prototype[key] = function (...args) {
			return immu[key](this, ...args);
		}
	}
}

function all() {
	for (let key of list) {
		o[key]();
	}
}

o.all = all;

module.exports = o;