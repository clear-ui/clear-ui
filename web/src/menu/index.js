import React from 'react'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import COLORS from '../styles/colors'

import BaseMenu from 'clear-ui-base/lib/menu'
import transferProps from 'clear-ui-base/lib/utils/transferProps'
import MenuItem from './item'
import MenuLabel from './label'

const TRANSFERED_PROPS = ['indent', 'height', 'padding', 'multiline']

class Menu extends BaseMenu {
	static defaultProps = {
		itemType: MenuItem
	}

	render() {
		let container = super.render()

		let content = React.Children.map(container.props.children, (elem) => {
			if (elem.type === MenuLabel || elem.type === MenuItem) {
				return transferProps(this, elem, TRANSFERED_PROPS)
			} else {
				return elem
			}
		})

		return React.cloneElement(container, null, content)
	}
}

@mixinDecorator(StylesMixin)
class MenuDivider extends React.Component {
	static styles = {
		root: {
			borderTop: `1px solid ${COLORS.black4}`
		}
	}

	render() {
		return <div style={this.styles.root}/>
	}
}

export default Menu
export {MenuItem, MenuLabel, MenuDivider}
