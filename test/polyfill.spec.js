const { should, expect } = require('chai')
const { all } = require('../polyfill')
should();

all();

suite('#polyfill test', function () {

	suite('#clone()', function () {
		test("#1", function () {
			const obj = { a: 5 }

			obj.clone().should.deep.equal({ a: 5 })
		})
	})

	suite('#modify()', function () {
		test("#1", function () {
			const obj = { a: 5 }

			obj.modify('a', a => a + 1).should.deep.equal({ a: 6 })
		})
	})

	suite('#update()', function () {
		test("#1", function () {
			const obj = { a: 5 }

			obj.update('a', a => a + 1).should.deep.equal({ a: 6 })
		})
	})

	suite('#assign()', function () {
		test("#1", function () {
			const obj = { a: 1, b: "test string", c: [1, 2, 3] };

			obj.assign({ a: 5, c: [2, 3] })
				.should
				.deep
				.equal({ a: 5, b: "test string", c: [2, 3] })
		})
	})

	suite('#setIn()', function () {
		test("#1", function () {
			const obj = { a: { b: { c: 10 } } }

			obj.setIn(['a', 'b', 'c'], 100)
				.should
				.deep
				.equal({ a: { b: { c: 100 } } })
		})
	})

	suite('#modifyIn()', function () {
		test("#1", function () {
			const obj = { a: { b: { c: 10 } } }

			obj.modifyIn(['a', 'b', 'c'], c => c + 90)
				.should
				.deep
				.equal({ a: { b: { c: 100 } } });
		})
	})

	suite('#updateIn()', function () {
		test("#1", function () {
			const obj = { a: { b: { c: 10 } } }

			obj.updateIn(['a', 'b', 'c'], c => c + 90)
				.should
				.deep
				.equal({ a: { b: { c: 100 } } });
		})
	})

	suite('#deepMerge()', function () {
		test("#1", function () {
			const obj1 = {
				a: 123,
				b: [1, 2, 3, {
					c: "test string"
				}],
				d: "abcxyz"
			}
			const obj2 = {
				a: 234,
				b: {
					1: 'x',
					3: {
						c: "ok!"
					}
				}
			}

			obj1.deepMerge(obj2)
				.should
				.deep
				.equal({
					a: 234, b: [1, 'x', 3, {
						c: "ok!"
					}],
					d: "abcxyz"
				});
		})
	})

	suite('#deepUpdate()', function () {
		test("#1", function () {
			const obj1 = {
				a: 123,
				b: [1, 2, 3, {
					c: "test string"
				}],
				d: "abcxyz"
			}
			const obj2 = {
				a: 234,
				b: {
					1: 'x',
					3: {
						c: "ok!"
					}
				}
			}

			obj1.deepUpdate(obj2)
				.should
				.deep
				.equal({
					a: 234, b: [1, 'x', 3, {
						c: "ok!"
					}],
					d: "abcxyz"
				});
		})
	})

	suite('#deepEqual()', function () {
		test("#1", function () {
			const obj1 = {
				a: 123,
				b: [1, 2, 3, {
					c: "test string"
				}],
				d: "abcxyz"
			}
			const obj2 = {
				a: 234,
				b: {
					1: 'x',
					4: {
						c: "ok!"
					}
				}
			}

			obj1.deepEqual(obj2).should.equal(false);
		})
	})

	suite('#deepClone()', function () {
		test("#1", function () {
			const obj = {
				a: 123,
				b: [1, 2, 3, {
					c: "test string"
				}],
				d: "abcxyz"
			}

			obj.deepClone().should.deep.equal({
				a: 123,
				b: [1, 2, 3, {
					c: "test string"
				}],
				d: "abcxyz"
			});
		})
	})

	suite('#setType()', function () {

		class Message {
			constructor(content) {
				this.content = "chocolatey"
			}

			getContent() {
				return this.content;
			}
		}

		test("#1", function () {
			const obj = {}
			
			obj.setType(Message).constructor.should.equal(Message);
		})

		test("#2", function () {
			const obj = { content: "ok!" }
			
			obj.setType(Message).getContent()
				.should
				.equal("ok!")
		})
	})
})