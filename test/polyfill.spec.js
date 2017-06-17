const { should, expect } = require('chai')
require('../polyfill')
should();

suite('#polyfill test', function () {

	suite('#clone()', function () {
		test("#1", function () {
			const obj = { a: 5 }

			obj.clone().should.deep.equal({ a: 5 })
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

		test("#1", function () {
			class Message {
				constructor(content) {
					this.content = "chocolatey"
				}

				getContent() {
					return this.content;
				}
			}

			const obj = {}
			
			obj.setType(Message).constructor.should.equal(Message);
		})

		test("#2", function () {
			class Message {
				constructor(content) {
					this.content = "chocolatey"
				}

				getContent() {
					return this.content;
				}
			}
			
			const obj = { content: "ok!" }
			
			obj.setType(Message).getContent()
				.should
				.equal("ok!")
		})

		test('#3', function () {
			class MArray extends Array {
				replace(matcher, replacer) {
					return this.reduce((acc, next, i, arr) => {
						if (matcher(next, i, arr)) {
							return acc.concat(replacer(next, i, arr));
						}
						else {
							return acc.concat([next]);
						}
					}, []).setType(MArray);
				}
			}

			const arr = [1, "string", 4, 5, 6, "string"];
			arr.setType(MArray)
				.replace(item => item === "string",
					(value, i, arr) => [2, 3])
				.should.deep.equal([1, 2, 3, 4, 5, 6, 2, 3].setType(MArray))
		})
	})
})