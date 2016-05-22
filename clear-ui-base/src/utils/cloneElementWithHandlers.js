import React from 'react'

export default function cloneElementWithHandlers(elem, props) {
	let newProps = {}
	for (let i in props) {
		if (typeof props[i] !== 'function') {
			newProps[i] = props[i]
		} else {
			let originalHandler = elem.props[i]
			let handler = props[i]
			if (typeof originalHandler === 'function') {
				newProps[i] = (...args) => {
					originalHandler(...args)
					handler(...args)
				}
			} else {
				newProps[i] = handler
			}
		}
	}
	return React.cloneElement(elem, newProps)
}

