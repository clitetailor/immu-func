let immu = require('../lib');

let list = [
	'set',
	'modify',
	'update',
	'clone',
	'assign',
	'setIn',
	'modifyIn',
	'updateIn',
	'deepMerge',
	'deepUpdate',
	'deepEqual',
	'deepClone',
	'setType'
]

let o = {};

for (let key of list) {
	o[key] = function () {
		Object.defineProperty(Object.prototype, key, {
			value(...args) {
				return immu[key](this, ...args);
			},
			enumerable: false
		});
		Object.defineProperty(Array.prototype, key, {
			value(...args) {
				return immu[key](this, ...args);
			},
			enumerable: false
		});
	}
}

function all() {
	for (let key of list) {
		o[key]();
	}
}

o.all = all;

module.exports = o;