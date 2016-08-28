import React from 'react'
import shallowEqual from 'shallowequal'

/**
 * Components which props are bound functions can not use usual PureRenderMixin,
 * because it can not compare function props created using 'Function.bind()',
 * because it returns new function every time.
 * This class is version of function.bind() that supports correct comparing.
 */
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

function compareFunctionProp(a, b) {
	if (a instanceof BoundFunction && b instanceof BoundFunction) {
		return BoundFunction.compare(a, b)
	} else {
		return a === b
	}
}

/*
 * Components with bound functions as props can not use simple PureRenderMixin,
 * because it can not compare function props created using 'Function.bind()',
 * because it returns new function every time.
 * This function can compare function props correctly when they use class 'BoundFunction'
 * instead of 'Function.bind()', that supports comparing with method
 * 'BoundFunction.compare(a, b)'.
 *
 * @param {array.<string>} functionProps - List of props names with type
 *     function or `BoundFunction`.
 */
export function shouldComponentUpdate(
	props, state,
	nextProps, nextState,
	functionProps
) {
	return !(
		shallowEqual(props, nextProps, (a, b, key) => {
			// undefined key means comparing the objects themselves
			if (key === undefined) return undefined

			if (functionProps.indexOf(key) !== -1) return compareFunctionProp(a, b)
			else return a === b
		}) &&
		shallowEqual(state, nextState)
	)
}

