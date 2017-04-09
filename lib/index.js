function isIterable(object) {
	if (object === null) {
		return false;
	}
	return typeof object[Symbol.iterator] === 'function';
}


function clone(object) {
	if (Array.isArray(object)) {
		return object.slice();
	}
	return Object.assign({}, object);
}

function setIn(object, keys, value) {
	if (keys.length === 0) {
		return value;
	}

	object = clone(object);
	object[keys[0]] = setIn(object[keys[0]], keys.slice(1), value);

	return object;
}


function setInFunc(key, value) {
	return function (object) {
		setIn(object, keys, value);
	}
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


function modifyInFunc(keys, callback) {
	return function (object) {
		modifyIn(object, keys, callback);
	}
}

let updateInFunc = modifyInFunc;


function keyChain(string) {
	return string.split('.');
}

let keys = keyChain;


function assign(target, source) {
	if (Array.isArray(target)) {
		return Object.assign(target.slice(), source);
	}
	return Object.assign({}, target, source);
}


function assignFunc(source) {
	return function (target) {
		return assign(target, source);
	}
}


function isPrimitive(value) {
	return value === null || typeof value !== 'object';
}


function isObject(arg) {
	return !!arg && arg.constructor === Object;
}


function deepMerge(target, source, callback) {
	if (!isObject(source) && !Array.isArray(source)) {
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

let deepUpdate = deepMerge;


function deepEqual(target, source, callback) {
	if (!isObject(source) && !Array.isArray(source)) {
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

function setType(object, type) {
	return Object.assign(Object.create(type.prototype), object);
}


module.exports = {
	clone,
	setIn,
	setInFunc,
	modifyIn,
	modifyInFunc,
	updateIn,
	updateInFunc,
	keyChain,
	keys,
	assign,
	assignFunc,
	deepMerge,
	deepUpdate,
	deepEqual,
	isObject,
	isPrimitive,
	isIterable,
	setType
}