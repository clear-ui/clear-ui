import React from 'react'

/**
 * It sets element's props that does not have values
 * to values from another element.
 */
export default function transferProps(from, to, propNames) {
	let props = {}
	for (let propName of propNames) {
		if (propName in from.props && !(propName in to.props)) {
			props[propName] = from.props[propName]
		}
	}
	return React.cloneElement(to, props)
}

