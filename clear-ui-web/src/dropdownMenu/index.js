import React from 'react'

import BaseDropdownMenu from 'clear-ui-base/lib/dropdownMenu'
import {Menu} from '../menu'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import SHADOWS from '../styles/shadows'

export default class DropdownMenu extends BaseDropdownMenu {
	static styles = composeStyles(
		BaseDropdownMenu.styles,
		{
			list: {
				padding: '0.5rem 0',
				background: 'white',
				boxShadow: SHADOWS[2]
			}
		}
	)

	static childComponents = {
		...BaseDropdownMenu.childComponents,
		menu: <Menu/>
	}
}
