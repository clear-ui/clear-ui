import React from 'react'
import _ from 'underscore'

import BaseMenu from 'clear-ui-base/lib/menu'
import isSameOrInheritedType from 'clear-ui-base/lib/utils/isSameOrInheritedType'

import MenuItem from './item'
import MenuLabel from './label'
import MenuDivider from './divider'

const TRANSFERED_PROPS = ['indent', 'height', 'padding', 'multiline']

class Menu extends BaseMenu {
	static propTypes = {
		/** Height of items and labels in the menu. */
		height: React.PropTypes.oneOf(['small', 'default', 'big']),

		/** Padding of items and labels in the menu. */
		padding: React.PropTypes.oneOf(['default', 'big']),

		/** Value of the `indent` prop of items and labels in the menu. */
		indent: React.PropTypes.bool
	}

	processItems(items, level) {
		let processedItems = super.processItems(items, level)
		return React.Children.map(processedItems, (elem) => {
			if (
				isSameOrInheritedType(elem.type, MenuItem) ||
				isSameOrInheritedType(elem.type, MenuLabel)
			) {
				return React.cloneElement(elem, _.pick(this.props, TRANSFERED_PROPS))
			} else {
				return elem
			}
		})
	}

	render() { return super.render() } // for react-docgen
}

export default Menu
export {MenuItem, MenuLabel, MenuDivider}
