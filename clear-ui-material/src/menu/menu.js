import React from 'react'

import BaseScrollMenu from 'clear-ui-base/lib/menu/scrollMenu'
import isSameOrInheritedType from 'clear-ui-base/lib/utils/isSameOrInheritedType'

import MenuItem from './item'

export default class Menu extends BaseScrollMenu {
	static propTypes = {
		...BaseScrollMenu.propTypes,

		desktop: React.PropTypes.bool
	}

	static styles = (props) => {
		return {
			root: {
				padding: props.desktop ? '16px 0' : '8px 0'
			}
		}
	}

	processItems(items, level) {
		let processedItems = super.processItems(items, level)
		return React.Children.map(processedItems, (elem) => {
			if (
				isSameOrInheritedType(elem.type, MenuItem) &&
				'desktop' in this.props
			) {
				return React.cloneElement(elem, {desktop: this.props.desktop})
			} else {
				return elem
			}
		})
	}

	render() { return super.render() } // for react-docgen
}
