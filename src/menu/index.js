import React from 'react'

import BaseMenu from 'clear-ui-base/lib/menu'
import BaseScrollMenu from 'clear-ui-base/lib/menu/scrollMenu'
import MenuItem from './item'

class Menu extends BaseScrollMenu {
	static defaultProps = {
		itemType: MenuItem
	}

	static styles = (props) => {
		return {
			root: {
				padding: props.desktop ? '16px 0' : '8px 0'
			}
		}
	}

	processItems() {
		let items = super.processItems()
		return React.Children.map(items, (elem) => {
			if (elem.type === MenuItem) {
				if (this.props.desktop) {
					return React.cloneElement(elem, {desktop: this.props.desktop})
				} else {
					return elem
				}
				//TODO transferProps
			} else {
				return elem
			}
		})
	}
}

export default Menu
export {MenuItem}
