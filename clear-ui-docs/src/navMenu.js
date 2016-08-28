import React from 'react'

import {Menu, MenuItem} from 'clear-ui-web/lib/menu'
import MenuItemWithSubMenu from 'clear-ui-web/lib/menu/itemWithSubMenu'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import isSameOrInheritedType from 'clear-ui-base/lib/utils/isSameOrInheritedType'

class NavMenu extends Menu {
	static contextTypes = {
		history: React.PropTypes.object.isRequired
	}

	static defaultProps = {
		...Menu.defaultProps,
		padding: 'big',
		height: 'small',
		prefix: ''
	}

	processItems(items) {
		let processedItems = super.processItems(items)
		return React.Children.map(processedItems, (elem) => {
			if (
				isSameOrInheritedType(elem.type, MenuItem) ||
				isSameOrInheritedType(elem.type, MenuItemWithSubMenu)
			) {
				let selected = elem.props.value !== undefined &&
					this.context.history.isActive(this.props.prefix + elem.props.value,
						null, elem.props.onlyIndex)
				return React.cloneElement(elem, {selected})
			} else {
				return elem
			}
		})
	}

	onSelectItem(item) {
		this.context.history.pushState(null, this.props.prefix + item.props.value)
	}
}

class NavMenuInnerItem extends MenuItem {
	static styles = composeStyles(
		MenuItem.styles,
		(props, state) => {
			let root = {}
			let label = {}

			if (state.tapState.pressed) root.background = '#dadada'
			else if (state.tapState.hovered) root.background = '#e6e6e6'

			if (props.selected) {
				label.fontWeight = 'normal'
				label.color = 'rgb(30, 136, 229)'
			}

			return {root, label}
		}
	)
}

class NavMenuInnerHeaderItem extends NavMenuInnerItem {
	static styles = composeStyles(
		NavMenuInnerItem.styles,
		{
			label: {fontWeight: '500'}
		}
	)
}

class NavMenuItem extends MenuItemWithSubMenu {
	static displayName = 'NavMenuItem'

	static defaultProps = {
		...MenuItemWithSubMenu.defaultProps,
		itemComponent: NavMenuInnerItem
	}
}


class NavMenuHeader extends MenuItemWithSubMenu {
	static displayName = 'NavMenuHeader'

	static defaultProps = {
		...MenuItemWithSubMenu.defaultProps,
		itemComponent: NavMenuInnerHeaderItem,
		subMenuTrigger: 'tap'
	}
}

export default NavMenu
export {NavMenuItem, NavMenuHeader}
