import React from 'react'

import {Menu, MenuItem} from 'clear-ui-web/lib/menu'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import isSameOrInheritedType from 'clear-ui-base/lib/utils/isSameOrInheritedType'

class NavMenu extends Menu {
	static contextTypes = {
		history: React.PropTypes.object.isRequired
	}

	static defaultProps = {
		padding: 'big',
		height: 'small',
		prefix: ''
	}

	processItems(items, level) {
		let processedItems = super.processItems(items, level)
		return React.Children.map(processedItems, (elem) => {
			if (isSameOrInheritedType(elem.type, MenuItem)) {
				let selected = elem.props.value !== undefined &&
					this.context.history.isActive(this.props.prefix + elem.props.value,
						null, elem.props.onlyIndex)
				return React.cloneElement(elem, {selected})
			} else {
				return item
			}
		})
	}

	onSelectItem(item) {
		this.context.history.pushState(null, this.props.prefix + item.props.value)
	}
}

class NavMenuItem extends MenuItem {
	static displayName = 'NavMenuItem'

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

class NavMenuHeader extends NavMenuItem {
	static displayName = 'NavMenuHeader'

	static defaultProps = {
		...NavMenuItem.defaultProps,
		tapTogglesNestedItems: true
	}

	static styles = composeStyles(
		NavMenuItem.styles,
		{
			label: {fontWeight: '500'}
		}
	)
}

export default NavMenu
export {NavMenuItem, NavMenuHeader}
