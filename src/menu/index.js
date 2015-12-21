import React from 'react'

import BaseMenu from 'clear-ui-base/lib/menu'
import Item from '../item'
import Label from './label'

const TRANSFERED_PROPS = ['indent', 'height', 'padding', 'multiline']

/**
 * It sets element's props that does not have values
 * to values from another element.
 */
export default function transferProps(from, to, propNames) {
	let props = {}
	for (let propName of propNames) {
		if (to.props[propName] === undefined) {
			props[propName] = from.props[propName]
		}
	}
	return React.cloneElement(to, props)
}

export default class Menu extends BaseMenu {
	static defaultProps = {
		itemType: Item
	}

	render() {
		let container = super.container()

		let content = React.Children.Map(container.props.children, (elem) => {
			if (elem.type === Label || elem.type === Item) {
				return transferProps(this, elem, TRANSFERED_PROPS)
			} else {
				return elem
			}
		})

		return React.cloneElement(container, null, content)
	}
}
