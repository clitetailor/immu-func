ImmuFunc
========

> Effective functions to keep data structure immutable

[![Build Status](https://travis-ci.org/clitetailor/immu-func.svg?branch=master)](https://travis-ci.org/clitetailor/immu-func)

Install
-------

```bash
npm install --save immu-func
```

Getting Started
---------------

### Node

```javascript
let immu = require('immu-func');
```

### Babel

```javascript
import { setIn } from 'immu-func';

const a = { b: [0, 1, 2, { c: 5 }] }

console.log(setIn(a, ['b', 3, 'c'], 6));
// => { b: [ 0, 1, 2, { c: 6 } ] }
```

Modify State Tree
-----------------

```javascript
import { modifyIn, assign } from 'immu-func';

const stateTree = { a: { b: { c: 5 } } };

const branch = ['a', 'b'];
const newState = { c: 6 };

const newStateTree = modifyIn(stateTree, branch, state => assign(state, newState));

console.log(newStateTree);
// => { a: { b: { c: 6 } } }
```

Polyfill
--------

```javascript
import 'immu-func/polyfill';

const obj1 = { a: { b: 5 } };
const obj2 = obj1.setIn(['a', 'b'], 6);

console.log(obj2);
// => { a: { b: 6 } }
```

```javascript
import 'immu-func/polyfill';

const obj1 = { a: { b: 5 } };
const obj2 = obj1.setIn(['a', 'b'], 6);

console.log(obj2);
// => { a: { b: 6 } }
```

API Reference
-------------

> - [clone](#clone)
> - [modify](#modify)
> - [assign](#assign)
> - [setIn](#setin)
> - [modifyIn](#modifyin)
> - [keys](#keys)
> - [deepMerge](#deepmerge)
> - [deepEqual](#deepequal)
> - [deepClone](#deepclone)
> - [setType](#settype)


### clone

```javascript
const arr1 = [1, 2, 3]
const arr2 = clone(arr);

console.log(arr2);
// => [ 1, 2, 3 ];

console.log(arr1 === arr2);
// => false;


const obj1 = { a: 5 };
const obj2 = clone(obj1);

console.log(obj2);
// => { a: 5 }

console.log(obj1 === obj2);
// => false
```

### modify

> **alias**: `update`

```javascript
const obj1 = { a: 5 }
const obj2 = update(obj1, 'a', a => a + 1);

console.log(obj2);
// => { a: 6 }
```

### setIn

```javascript
const obj1 = { a: { b: { c: 5 } } };
const obj2 = setIn(obj1, ['a', 'b', 'c'], 6);

console.log(obj2);
// => { a: { b: { c: 6 } } }
```

### modifyIn

> **alias**: `updateIn`

```javascript
const obj1 = { a: { b: { c: 5 } } };
const obj2 = modifyIn(obj1, ['a', 'b', 'c'], c => c + 1);

console.log(obj2);
// => { a: { b: { c: 6 } } }
```

### keys

```javascript
console.log(keyChain('a.2.c'));
// => [ 'a', 2, 'c' ]
```

### assign

```javascript
const obj1 = { a: 5 }
const obj2 = { b: 6 }
const obj3 = assign(obj1, obj2);

console.log(obj3);
// => { a: 5, b: 6 }


const arr1 = [0, 1, 2, 3, 4];
const arr2 = { 4: 1000 }
const arr3 = assign(arr1, arr2);

console.log(arr3);
// => [ 0, 1, 2, 3, 1000 ];
```

### deepMerge

```javascript
const obj1 = {
	a: 1,
	b: [0, 1, 2, { c: 5 }],
}
const obj2 = {
	b: {
		3: {
			c: 100,
		}
	}
}

const obj3 = deepMerge(obj1, obj2);
console.log(obj3);
// => { a: 1, b: [ 0, 1, 2, { c: 100 } ] }
```

```javascript
class Message { /*...*/ }

function isMessage(arg) { /*...*/ }

const obj1 = {
	messages: [new Message(), new Message(), /*...*/]
}
const obj2 = {
	messages: [new Message(), new Message(), /*...*/]
}

const obj3 = deepMerge(obj1, obj2, (target, source) => {
	if (isMessage(target) && isMessage(source)) {
		return target.merge(source);
	}
})
```

### deepEqual

```javascript
const obj1 = {
	a: 1,
	b: [0, 1, 2, { c: 5 }],
}
const obj2 = {
	a: 1,
	b: [0, 1, 2, { c: 5 }],
}

console.log(deepEqual(obj1, obj2));
// => true

const obj3 = setIn(obj2, ['b', 3, 'c'], 6);
console.log(deepEqual(obj2, obj3));
// => false;

deepEqual(obj1, obj2, (target, source) => {/*...*/})
```

### deepClone

```javascript
const obj1 = {/*...*/}
const obj2 = deepClone(obj1, obj => {
	if (isMessage(obj)) {
		return new Message(obj);
	}
})
```

### setType

```javascript
class Message {
	constructor() {
		this.content = "hello!";
	}

	getContent() {
		return this.content;
	}
}

let state = {
	message: new Message()
}

let newState = setIn(state, ['message', 'content'], "hello world!");
newState.message = setType(newState.message, Message);
console.log(newState.message.getContent());
// => hello world!
```

Changelog
---------

Visit [Github Releases](https://github.com/clitetailor/immu-func/releases) page for more infomation.