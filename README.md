ImmuFunc
========

Effective functions to keep data structure immutable

Usage
-----

```js
import { setIn, ... } from 'immu-func';
```

#### setIn

```javascript
let a = {
	b: [0, 1, 2, 3, 4, {
		c: 5
	}]
}

let d = setIn(a, ['b', 5, 'c'], 1000)

console.log(a.b[5].c)
// => 5
console.log(d.b[5].c)
// => 1000
```

#### clone

```javascript
let a = [1, 2, 3, 4]

let b = clone(a)

console.log(b)
// => [1, 2, 3, 4]
console.log(a === b)
// => false
```

#### assign

```javascript
let a = [1, 2, 3, 4]

let b = assign(a, { 0: 100 })

console.log(b)
// => [100, 2, 3, 4]
```

#### assignFunc

```jsx
class App extends React.Component {
	constructor () {
		this.state = { a: 5 }
	}

	...
	let a = 6
	this.setState(assignFunc({ a }))
}
```

#### deepUpdate

```js
let a = [1, 2, 3, {
	b: 'what is this?'
}]

let b = {
	0: 4, {
		b: 'this is a cat!'
	}
}

console.log(deepUpdate(a, b))
// => [4, 2, 3, { b: 'this is a cat!' }]
```