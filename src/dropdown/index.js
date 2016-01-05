import React from 'react'

import BaseDropdown from 'clear-ui-base/lib/dropdown'
import Menu from '../menu'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import SHADOWS from '../styles/shadows'

class Dropdown extends BaseDropdown {
	static styles = composeStyles(
		BaseDropdown.styles,
		{
			list: {
				padding: '0.5rem 0',
				background: 'white',
				boxShadow: SHADOWS[2]
			}
		}
	)

	getMenu() {
		return <Menu/>
	}
}

export default Dropdown
