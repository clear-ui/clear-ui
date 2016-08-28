import React from 'react'

import Icon from 'clear-ui-base/lib/icon'
import BaseMenuItemWithSubMenu from 'clear-ui-base/lib/menu/itemWithSubMenu'

import SHADOWS from '../styles/shadows'
import MenuItem from './item'

export default class MenuItemWithSubMenu extends BaseMenuItemWithSubMenu {
	static defaultProps = {
		...BaseMenuItemWithSubMenu.defaultProps,

		itemComponent: MenuItem
	}

	static childComponents = {
		openerIcon: (props, state) => {
			let icon = state.showNestedItems ?
				Icon.ICONS.triangleUp : Icon.ICONS.triangleDown

			let style
			if (props.renderSubMenuInLayer) {
				style = {transform: 'rotate(-90deg)'}
			}

			return <Icon icon={icon} style={style} />
		}
	}

	static styles = (props) => {
		let subMenu = {}
		if (props.renderSubMenuInLayer) {
			subMenu = {
				position: 'relative',
				background: 'white',
				boxShadow: SHADOWS[1]
			}
		}

		return {subMenu}
	}
}
