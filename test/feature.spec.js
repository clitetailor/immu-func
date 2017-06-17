const { should, expect } = require('chai')
const immu = require('../lib')
should();


suite("main features' test", function () {
	suite("#clone()", function () {
		test("#1", function () {
			const obj = { a: 5 }

			immu.clone(obj).should.deep.equal({ a: 5 })
		})
	})

	suite("#update()", function () {
		test("#1", function () {
			const obj = { a: 5 }

			immu.update(obj, 'a', a => a + 1).should.deep.equal({ a: 6 })
		})
	})

	suite("#setIn()", function () {
		test("#1", function () {
			const obj = { a: { b: { c: 10 } } }

			immu.setIn(obj, ['a', 'b', 'c'], 100)
				.should
				.deep
				.equal({ a: { b: { c: 100 } } })
		})
	})

	suite("#updateIn()", function () {
		test("#1", function () {
			const obj = { a: { b: { c: 10 } } }

			immu.updateIn(obj, ['a', 'b', 'c'], c => c + 90)
				.should
				.deep
				.equal({ a: { b: { c: 100 } } });
		})
	})

	suite("#keys()", function () {
		test("#1", function () {
			const _keys = '1.2.3.4';

			immu.keys(_keys).should.deep.equal(['1', '2', '3', '4']);
		})

		test("#2", function () {
			const _keys = 'a.1.b.2';

			immu.keys(_keys).should.deep.equal(['a', '1', 'b', '2']);
		})
	})

	suite("#assign()", function () {
		test("#1", function () {
			const obj = { a: 1, b: "test string", c: [1, 2, 3] };

			immu.assign(obj, { a: 5, c: [2, 3] })
				.should
				.deep
				.equal({ a: 5, b: "test string", c: [2, 3] })
		})
	})

	suite("#deepMerge()", function () {
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

			immu.deepMerge(obj1, obj2)
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

	suite("#deepEqual()", function () {
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

			immu.deepEqual(obj1, obj2).should.equal(false);
		})

		test("#2", function () {
			const obj1 = {
				a: 123,
				b: [1, 2, 3, {
					c: "test string"
				}],
				d: "abcxyz"
			}
			const obj2 = {
				a: 123,
				b: [1, 2, 3, {
					c: "test string"
				}],
				d: "abcxyz"
			}

			immu.deepEqual(obj1, obj2).should.equal(true);
		})
	})

	suite("#deepClone()", function () {
		test("#1", function () {
			const obj = {
				a: 123,
				b: [1, 2, 3, {
					c: "test string"
				}],
				d: "abcxyz"
			}

			immu.deepClone(obj).should.deep.equal({
				a: 123,
				b: [1, 2, 3, {
					c: "test string"
				}],
				d: "abcxyz"
			});
		})
	})

	suite("#setType()", function () {

		class Message {
			constructor(content) {
				this.content = "chocolatey"
			}

			getContent() {
				return this.content;
			}
		}
		
		test("#1", function () {
			immu.setType({}, Message).constructor.should.equal(Message);
		})

		test("#2", function () {
			immu.setType({ content: "ok!" }, Message).getContent()
				.should
				.equal("ok!")
		})
	})
})