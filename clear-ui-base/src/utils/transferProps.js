import React from 'react'

/** Fills element's props that are not defined with values from another element. */
export default function transferProps(from, to, propNames) {
	let props = {}
	for (let propName of propNames) {
		if (propName in from.props && !(propName in to.props)) {
			props[propName] = from.props[propName]
		}
	}
	return React.cloneElement(to, props)
}
