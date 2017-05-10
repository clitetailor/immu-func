let immu = require('../lib');

let list = [
	'modify',
	'update',
	'clone',
	'assign',
	'setIn',
	'modifyIn',
	'updateIn',
	'deepMerge',
	'deepEqual',
	'deepClone',
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