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


function modifyFunc(key, callback) {
	return function (object) {
		return modify(object, key, callback);
	}
}

let updateFunc = modifyFunc;


function setIn(object, keys, value) {
	if (keys.length === 0) {
		return value;
	}

	object = clone(object);
	object[keys[0]] = setIn(object[keys[0]], keys.slice(1), value);

	return object;
}


function setInFunc(keys, value) {
	return function (object) {
		return setIn(object, keys, value);
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
		return modifyIn(object, keys, callback);
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

let deepUpdate = deepMerge;


function deepMergeFunc(source, callback) {
	return function (target) {
		return deepMerge(target, source, callback);
	}
}

let deepUpdateFunc = deepMergeFunc;


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


function setType(object, type) {
	object = Object.assign(Object.create(type.prototype), object);
	return object;
}

function isIterable(object) {
	if (object === null) {
		return false;
	}
	return typeof object[Symbol.iterator] === 'function';
}


module.exports = {
	clone,
	modify,
	modifyFunc,
	update,
	updateFunc,
	setIn,
	setInFunc,
	modifyIn,
	modifyInFunc,
	updateIn,
	updateInFunc,
	keys,
	keyChain,
	assign,
	assignFunc,
	deepMerge,
	deepMergeFunc,
	deepUpdate,
	deepUpdateFunc,
	deepEqual,
	deepClone,
	isObject,
	isPrimitive,
	isIterable,
	setType
}