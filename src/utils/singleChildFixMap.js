import React from 'react'

// Version of React.Children.map that does not break components that require single child.
export default function mapSingleChild(children, callback) {
	let result = React.Children.map(children, callback)
	if (result && result.length === 1) result = result[0]
	return result
}
