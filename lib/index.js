function clone(object) {
	if (Array.isArray(object)) {
		return object.slice();
	}
	return Object.assign({}, object);
}


function modify(object, key, callback) {
	object = clone(object);
	object[key] = callback(object[key]);

	return object;
}

let update = modify;


function setIn(object, keys, value) {
	if (keys.length === 0) {
		return value;
	}

	object = clone(object);
	object[keys[0]] = setIn(object[keys[0]], keys.slice(1), value);

	return object;
}


function modifyIn(object, keys, callback) {
	if (keys.length === 0) {
		return callback(object);
	}

	object = clone(object);
	object[keys[0]] = modifyIn(object[keys[0]], keys.slice(1), callback);

	return object;
}

let updateIn = modifyIn;



function keys(string) {
	return string.split('.');
}


function assign(target, source) {
	if (Array.isArray(target)) {
		return Object.assign(target.slice(), source);
	}
	return Object.assign({}, target, source);
}


function isPrimitive(value) {
	return value === null || typeof value !== 'object';
}


function isObject(arg) {
	return !!arg && arg.constructor === Object;
}


function deepMerge(target, source, callback) {
	if ((!isObject(source) && !Array.isArray(source))
		|| (!isObject(target) && !Array.isArray(target)))
	{
		if (callback) {
			return callback(target, source);
		}
		return source;
	}

	let result = clone(target);
	for (let key in source) {
		result[key] = deepMerge(target[key], source[key]);
	}

	return result;
}


function deepEqual(target, source, callback) {
	if ((!isObject(source) && !Array.isArray(source))
		|| (!isObject(target) && !Array.isArray(target)))
	{
		if (callback) {
			return callback(target, source);
		}
		return target === source;
	}

	for (let key in source) {
		if (!deepEqual(target[key], source[key])) {
			return false;
		}
	}

	return true;
}

function deepClone(object, callback) {
	if (!isObject(object) && !Array.isArray(object)) {
		if (callback) {
			return callback(object);
		}
		return object;
	}

	object = clone(object);
	for (let key in object) {
		object[key] = deepClone(object[key]);
	}

	return object;
}


// MDN: developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Copying_accessors
function completeAssign(target, ...sources) {
	sources.forEach(source => {
		let descriptors = Object.getOwnPropertyNames(source).reduce((descriptors, key) => {
			descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
			return descriptors;
		}, {});

		// by default, Object.assign copies enumerable Symbols too
		Object.getOwnPropertySymbols(source).forEach(sym => {
			let descriptor = Object.getOwnPropertyDescriptor(source, sym);
			if (descriptor.enumerable) {
				descriptors[sym] = descriptor;
			}
		});

		Object.defineProperties(target, descriptors);
	});
	return target;
}


function setType(object, type) {
	object = completeAssign(Object.create(type.prototype), object);
	return object;
}

function isIterable(object) {
	if (object === null) {
		return false;
	}
	return typeof object[Symbol.iterator] === 'function';
}

const list = [
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

function extendsType(type) {
	for (let key of list) {
		Object.defineProperty(type.prototype, key, {
			value(...args) {
				return immu[key](this, ...args);
			},
			enumerable: false
		});
	}
}


class Immu { };

for (let key of list) {
	Object.defineProperty(Immu.prototype, key, {
		value(...args) {
			return immu[key](this, ...args);
		},
		enumerable: false
	});
}


module.exports = {
	completeAssign,
	clone,
	modify,
	update,
	setIn,
	modifyIn,
	updateIn,
	keys,
	assign,
	deepMerge,
	deepEqual,
	deepClone,
	isObject,
	isPrimitive,
	isIterable,
	setType,
	extendsType,
	Immu
}