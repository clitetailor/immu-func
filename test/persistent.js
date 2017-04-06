let { should, expect } = require('chai')
let { setIn, clone, assign } = require('../lib')
should = should();


describe('persistence test', function () {
	let arr = [100, 1, 2, 3, 4, 9, 8, 7, 6, "what else?", new Date(), [1, 2, 3], { a: 1, b: 2 }],
		obj = {
			a: 1,
			b: "what is this?",
			c: new Date(),
			d: [1, 2, 3],
			e: { a: 1, b: 2, c: 3 }
		},
		source = {
			a: 2
		},
		sourceArr = [2, 3, 4]

	describe('#setIn()', function () {
		it('should return a new array', function () {
			let arr = [1, 2, 3, 4, 5, 6]
			arr.should.not.equal(setIn(arr, [0], 2))
		})
	})

	describe('#clone()', function () {
		it('should return a new array', function () {
			let arr = [1, 2, 3, 4, 5, 6]
			arr.should.not.equal(clone(arr))
		})

		it('should return a new object', function () {
			let obj = {
				a: 1,
				b: 100,
				c: 1000
			}
			obj.should.not.equal(clone(obj))
		})
	})

	describe('#assign()', function () {
		it('should return a new object', function () {
			obj.should.not.equal(assign(obj, source))
		})

		it('should return a new array', function () {
			arr.should.not.equal(assign(arr, sourceArr))
		})
	})
})