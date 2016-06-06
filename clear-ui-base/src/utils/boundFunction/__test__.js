import assert from 'assert'
import BoundFunction from './index.js'

describe('BoundFunction', function() {
	function testFn(firstArg, secondArg) {
		return this.contextProp + firstArg + secondArg
	}

	let context = {contextProp: 5}
	let firstArg = 6

	it('calls function with context, bound args and call args', function() {
		let boundFn = new BoundFunction(testFn, context, firstArg)
		let result = boundFn.call(7)
		assert.equal(result, 5 + 6 + 7)
	})

	it('only same functions with same contexts and args are equal', function() {
		let boundFn = new BoundFunction(testFn, context, firstArg)
		let equalBoundFn = new BoundFunction(testFn, context, firstArg)
		let differentBoundFn = new BoundFunction(() => {}, context, firstArg)
		let boundFnWithDifferentArgs = new BoundFunction(testFn, context, 8)
		let boundFnWithDifferentContext = new BoundFunction(testFn, {}, firstArg)

		assert(!BoundFunction.compare(boundFn, differentBoundFn))
		assert(!BoundFunction.compare(boundFn, boundFnWithDifferentArgs))
		assert(!BoundFunction.compare(boundFn, boundFnWithDifferentContext))
		assert(BoundFunction.compare(boundFn, equalBoundFn))
	})
})
