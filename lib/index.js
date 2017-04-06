/**
 * Check whether object is iterable.
 * @param {any} obj
 * @return {Boolean}
 */
function isIterable(obj) {
	if (obj === null) {
		return false;
	}
	return typeof obj[Symbol.iterator] === 'function';
}

/**
 * Deeply set object key value.
 * @param {Object|Array<any>} obj 
 * @param {(String|Number)[]} keys 
 * @param newValue 
 */
function setIn(obj, keys, newValue) {
	let result = Array.isArray(obj) ? [...obj] : Object.assign({}, obj),
		ref = result;

	let head = keys.slice(0, keys.length - 1);
	for (let key of head) {
		if (Array.isArray(ref[key])) {
			ref[key] = [...ref[key]]
		} else {
			ref[key] = Object.assign({}, ref[key]);
		}
		ref = ref[key];
	}

	ref[keys[keys.length - 1]] = newValue;
	return result;
}


/**
 * Short hand of `Object.assign({}, obj)`
 * @param {Object|Array<any>} obj 
 */
function clone(obj) {
	if (obj instanceof Array) {
		return [...obj]
	}
	return Object.assign({}, obj);
}


/**
 * Short hand of `Object.assign({}, target, source)
 * @param {Object|Array[]} target
 * @param {Object|Array[]} source
 */
function assign(target, source) {
	if (target === undefined || target === null) {
		return source;
	}

	switch (target.constructor) {
		case Object: {
			if (source.constructor !== Object) {
				return source;
			}

			return Object.assign({}, target, source);
		}

		case Array: {
			if (source.constructor === Array || source.constructor === Object) {
				let newObj = [...target];

				for (let key in source) {
					target[key] = source[key]
				}
			}

			return source;
		}

		default: {
			return source;
		}
	}

	return Object.assign({}, target, source);
}


/**
 * Return a function that clones the target value and assigns it with the source value.
 * @param {Object|Array[]} source
 */
function assignFunc(source) {
	return function (target) {
		return assign(target, source);
	}
}


/**
 * Deeply assign source to target object
 * @param {any} target 
 * @param {any} source 
 */
function deepUpdate(target, source) {
	if (target === undefined || target === null) {
		return source;
	}

	switch (target.constructor) {
		case Object: {

			if (source.constructor !== Object) {
				return source;
			}

			let result = Object.assign({}, target);
			for (let key in source) {
				result[key] = deepUpdate(target[key], source[key]);
			}

			return result;
		}

		case Array: {
			if (source.constructor !== Object && source.constructor !== Array) {
				return source;
			}

			let result = [...target]

			for (let key in source) {
				result[key] = deepUpdate(target[key], source[key]);
			}

			return result;
		}

		default: {
			return source;
		}
	}
}




/**
 * Check whether two objects are deeply equal.
 * @param {any} a 
 * @param {any} b 
 */
function deepEqual(a, b) {
	if (isIterable(a) && isIterable(b)) {
		let aKeys = Object.keys(a),
			bKeys = Object.keys(b);
		
		if (a.length !== b.length) {
			return false;
		}

		for (let key of aKeys) {
			if (bKeys.indexOf(key) === -1) {
				return false;
			}
		}

		for (let key of aKeys) {
			if (!deepEqual(a[key], b[key])) {
				return false;
			}
		}

		return true;
	} else if (!isIterable(b) && !isIterable(b) && a === b) {
		return true;
	} else {
		return false;
	}
}

module.exports = { setIn, deepUpdate, clone, assign, assignFunc, deepEqual, isIterable }