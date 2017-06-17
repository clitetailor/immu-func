let immu = require('../lib');

let list = [
	'clone',
	'update',
	'assign',
	'setIn',
	'updateIn',
	'deepMerge',
	'deepEqual',
	'deepClone',
	'completeAssign',
	'setType'
]

for (let key of list) {
	Object.defineProperty(Object.prototype, key, {
		value(...args) {
			return immu[key](this, ...args);
		},
		enumerable: false
	});
}