import React from 'react'

import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import composeChildComponents from
	'clear-ui-base/lib/utils/childComponentsMixin/composeChildComponents'
import TreeMenu, {TreeMenuItem, TreeMenuHeader, TreeMenuGroup, TreeMenuSubMenu}
	from 'clear-ui-simple/lib/treeMenu'

class NavMenu extends TreeMenu {
	static contextTypes = {
		history: React.PropTypes.object.isRequired
	}

	static defaultProps = {
		padding: 'big',
		height: 'small',
		prefix: ''
	}

	processItem(item, level = 0) {
		let [isSelected, itemWithProps] = super.processItem(item, level)
		isSelected = item.props.value !== undefined &&
			this.context.history.isActive(this.props.prefix + item.props.value,
				null, item.props.onlyIndex)
		return [isSelected, React.cloneElement(itemWithProps, {selected: isSelected})]
	}

	onSelect(item) {
		this.context.history.pushState(null, this.props.prefix + item.props.value)
	}
}

function getItemStyles(props, state) {
	let root = {}
	let label = {}

	if (state.tapState === 'hovered') root.background = '#e6e6e6'
	else if (state.tapState === 'active') root.background = '#dadada'

	if (props.selected) {
		label.fontWeight = 'normal'
		label.color = 'rgb(30, 136, 229)'
	}
	return {root, label}
}

class NavMenuItem extends TreeMenuItem {
	static childComponents = composeChildComponents(
		TreeMenuItem.childComponents,
		{
			menuItem: (props, state, defaultItem) => {
				return React.cloneElement(defaultItem, {styles: getItemStyles})
			}
		}
	)
}

class NavMenuHeader extends TreeMenuHeader {
	static childComponents = composeChildComponents(
		TreeMenuHeader.childComponents,
		{
			menuItem: (props, state, defaultItem) => {
				return React.cloneElement(defaultItem, {styles: getItemStyles})
			}
		}
	)
}

export {
	NavMenuItem,
	NavMenuHeader,
	TreeMenuGroup as NavMenuGroup,
	TreeMenuSubMenu as NavMenuSubMenu
}

export default NavMenu
