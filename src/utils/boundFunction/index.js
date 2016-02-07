import shallowEqual from 'shallowequal'

/** Version of function.bind() that supports comparing. */
export default class BoundFunction {
	static compare(a, b) {
		return (
			a.fn === b.fn &&
			a.context === b.context &&
			shallowEqual(a.boundArgs, b.boundArgs)
		)
	}

	constructor(fn, context, ...boundArgs) {
		this.fn = fn
		this.context = context
		this.boundArgs = boundArgs
	}

	call(...args) {
		return this.fn.call(this.context, ...this.boundArgs, ...args)
	}
}
