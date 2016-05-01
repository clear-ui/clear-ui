import React from 'react'
import _ from 'underscore'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import BaseMenu from 'clear-ui-base/lib/menu'
import isSameOrInheritedType from 'clear-ui-base/lib/utils/isSameOrInheritedType'
import COLORS from '../styles/colors'

import MenuItem from './item'
import MenuLabel from './label'

const TRANSFERED_PROPS = ['indent', 'height', 'padding', 'multiline']

class Menu extends BaseMenu {
	static defaultProps = {
		itemType: MenuItem
	}

	processItems(items, level) {
		let processedItems = super.processItems(items, level)
		return React.Children.map(processedItems, (elem) => {
			let r = React
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
}

@mixinDecorator(StylesMixin)
class MenuDivider extends React.Component {
	static styles = {
		root: {
			borderTop: `1px solid ${COLORS.black4}`
		}
	}

	render() {
		return <div style={this.styles.root}/>
	}
}

export default Menu
export {MenuItem, MenuLabel, MenuDivider}
