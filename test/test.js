let { should, expect } = require('chai')
let { setIn, clone } = require('../lib')
should = should();

describe('#setIn()', function () {

	it('should return correct result', function () {
		let target = {
				a: [1, { c: 4 }, 5],
				b: 'what is this?'
			},
			keys = ['a', 1, 'c'],
			source = 1000,
			expectResult = {
				a: [1, { c: 1000 }, 5],
				b: 'what is this?'
			}

		expect(setIn(target, keys, source)).to.deep.equal(expectResult);
	})


	describe('boundary test', function () {
		it('should deeply equal [6, 2, 3, 4, 5]', function () {
			expect(setIn([1, 2, 3, 4, 5], [0], 6)).to.eql([6, 2, 3, 4, 5])
		})

		it('should deeply equal [1, 2, 3, 4, 6]', function () {
			expect(setIn([1, 2, 3, 4, 5], [4], 6)).to.eql([1, 2, 3, 4, 6])
		})

		it('should deeply equal [0, [1, 2, 3, 4, 6]]', function () {
			expect(setIn([0, [1, 2, 3, 4, 5]], [1, 4], 6)).to.eql([0, [1, 2, 3, 4, 6]])
		})
	})
})


describe('#clone()', function () {
	it('should return an object with the same value', function () {
		let obj = {
			a: 1,
			b: new Date(),
			c: [1, 2, 3, "what is this?"]
		}

		obj.should.deep.equal(clone(obj))
	})

	it('should return an array with the same value', function () {
		let arr = [2, 3, 4, new Date(), 7, 100, { a: 5 }, 32]
		arr.should.deep.equal(clone(arr))
	})
})