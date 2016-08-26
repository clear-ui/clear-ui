import React from 'react'
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

	static call(handler, ...args) {
		if (handler instanceof BoundFunction) handler.call(...args)
		else if (typeof handler === 'function') handler(...args)
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

export const funcOrBoundFuncType = React.PropTypes.oneOfType([
	React.PropTypes.func,
	React.PropTypes.instanceOf(BoundFunction)
])

