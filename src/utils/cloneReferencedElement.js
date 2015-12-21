import React from 'react'

export default function cloneReferencedElement(element, props, ...children) {
	let cloneRef = props.ref
	let originalRef = element.ref

	if (!originalRef || !cloneRef) {
		return React.cloneElement(element, props, ...children)
	}

	if (typeof originalRef !== 'function') {
		if (DEBUG) {
			console.warn(
				'Cloning an element with a ref that will be overwritten because it ' +
				'is not a function. Use a composable callback-style ref instead. ' +
				'Ignoring ref: ' + originalRef,
			)
		}
		return React.cloneElement(element, props, ...children)
	}

	return React.cloneElement(element, {
		...props,
		ref(component) {
			cloneRef(component)
			originalRef(component)
		},
	}, ...children)
}
