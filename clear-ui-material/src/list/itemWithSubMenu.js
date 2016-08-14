import React from 'react'

import Icon from 'clear-ui-base/lib/icon'
import MenuItemWithSubMenu from 'clear-ui-base/lib/menu/itemWithSubMenu'
import SHADOWS from '../styles/shadows'
import ListItem from './item'

export default class ListItemWithSubMenu extends MenuItemWithSubMenu {
	static defaultProps = {
		...MenuItemWithSubMenu.defaultProps,

		itemComponent: ListItem
	}

	static childComponents = {
		openerIcon: (props, state) => {
			let icon = state.showNestedItems ?
				Icon.ICONS.triangleUp : Icon.ICONS.triangleDown
			return <Icon icon={icon}/>
		}
	}

	static styles = (props) => {
		let subMenu = {}
		if (props.renderSubMenuInLayer) {
			subMenu = {
				position: 'relative',
				background: 'white',
				boxShadow: SHADOWS[2]
			}
		}

		return {subMenu}
	}
}
