import React from 'react'

import BaseMenu from 'clear-ui-base/lib/menu'
import MenuItem from './item'

export default class Menu extends BaseMenu {
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

	render() {
		let container = super.render()

		let content = React.Children.map(container.props.children, (elem) => {
			if (elem.type === MenuItem) {
				return React.cloneElement(elem, {desktop: this.props.desktop})
				//TODO transferProps
			} else {
				return elem
			}
		})

		return React.cloneElement(container, null, content)
	}
}
