const clone = require('./clone')
const update = require('./update')
const assign = require('./assign')
const setIn = require('./set-in')
const updateIn = require('./update-in')
const deepMerge = require('./deep-merge')
const deepEqual = require('./deep-equal')
const deepClone = require('./deep-clone')
const keys = require('./keys')
const completeAssign = require('./complete-assign')
const setType = require('./set-type')
const Immu = require('./immu.type')

module.exports = {
	clone,
	assign,
	update,
	setIn,
	updateIn,
	keys,
	deepMerge,
	deepEqual,
	deepClone,
	completeAssign,
	setType,
	Immu
}