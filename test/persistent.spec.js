const { should, expect } = require('chai')
const immu = require('../lib')
should();


suite('#persistence test', function () {
	
	suite('#clone()', function () {
		test("#1", function () {
			const obj1 = { a: { b: 5 }, c: 6, d: "test string" }
			const obj2 = immu.clone(obj1);

			obj2.should.not.equal(obj1);
			obj2.a.should.equal(obj1.a);
			obj2.a.b.should.equal(obj1.a.b);
			obj2.c.should.equal(obj1.c);
			obj2.d.should.equal(obj1.d);
		})
	})

	suite('#update()', function () {
		test("#1", function () {
			const obj1 = { a: 5, b: { c: 6 }, d: "test string" }
			const obj2 = immu.update(obj1, 'd', d => "ok!");

			obj2.should.not.equal(obj1);
			obj2.d.should.not.equal(obj1.d);
			obj2.a.should.equal(obj1.a);
			obj2.b.should.equal(obj1.b);
			obj2.b.c.should.equal(obj1.b.c);
		})
	})

	suite('#assign()', function () {
		test("#1", function () {
			const obj1 = { a: 5, b: { c: 6 }, d: "test string" }
			const obj2 = immu.assign(obj1, { a: { b: 100 } });

			obj2.should.not.equal(obj1);
			obj2.a.should.not.equal(obj1.a);
			obj2.d.should.equal(obj1.d);
			obj2.b.should.equal(obj1.b);
			obj2.b.c.should.equal(obj1.b.c);
		})
	})

	suite('#setIn()', function () {
		test("#1", function () {
			const obj1 = { a: 5, b: { c: { d: 6 } }, e: "test string" }
			const obj2 = immu.setIn(obj1, ['b', 'c', 'd'], 100);

			obj2.should.not.equal(obj1);
			obj2.a.should.equal(obj1.a);
			obj2.e.should.equal(obj1.e);
			obj2.b.should.not.equal(obj1.b);
			obj2.b.c.should.not.equal(obj1.b.c);
			obj2.b.c.d.should.equal(100);
		})
	})

	suite('#updateIn()', function () {
		test("#1", function () {
			const obj1 = { a: 5, b: { c: { d: 6 }, e: 5 }, f: "test string" }
			const obj2 = immu.updateIn(obj1, ['b', 'e'], e => e + 5);

			obj2.should.not.equal(obj1);
			obj2.a.should.equal(obj1.a);
			obj2.f.should.equal(obj1.f);
			obj2.b.c.should.equal(obj1.b.c);
			obj2.b.c.d.should.equal(obj1.b.c.d);
			obj2.b.e.should.not.equal(obj1.b.e);
			obj2.b.e.should.equal(10);
		})
	})

	suite('#deepMerge()', function () {
		test("#1", function () {
			const obj1 = { a: { b: { c: 5 }, d: 100 }, e: { f: "test string", g: "hello world!" } }
			const obj2 = { a: { b: { c: 10 } }, e: { f: "ok!"} };
			const result = immu.deepMerge(obj1, obj2);	

			result.should.not.equal(obj1);
			result.should.not.equal(obj2);

			result.a.should.not.equal(obj1.a);
			result.a.should.not.equal(obj2.a);
			
			result.a.b.should.not.equal(obj1.a.b);
			result.a.b.should.not.equal(obj2.a.b);

			result.a.b.c.should.not.equal(obj1.a.b.c);
			result.a.b.c.should.equal(obj2.a.b.c);

			result.a.d.should.equal(obj1.a.d);
			
			result.e.should.not.equal(obj1.e);
			result.e.should.not.equal(obj2.e);

			result.e.f.should.not.equal(obj1.e.f);
			result.e.f.should.equal(obj2.e.f);

			result.e.g.should.equal(obj1.e.g);
		})
	})

	suite('#deepClone()', function () {
		test("#1", function () {
			const obj1 = { a: { b: { c: 5 }, d: 100 }, e: { f: "test string", g: "hello world!" } }
			const obj2 = immu.deepClone(obj1);

			obj2.should.not.equal(obj1);
			obj2.a.should.not.equal(obj1.a);
			obj2.a.b.should.not.equal(obj1.a.b);
			obj2.a.b.c.should.equal(obj1.a.b.c);
			obj2.a.d.should.equal(obj1.a.d);
			obj2.e.should.not.equal(obj1.e);
			obj2.e.f.should.equal(obj1.e.f);
			obj2.e.g.should.equal(obj1.e.g);
		})
	})
})