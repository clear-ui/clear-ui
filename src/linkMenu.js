import React from 'react'

import transferProps from 'clear-ui-base/lib/utils/transferProps'
import isSameOrInheritedType from 'clear-ui-base/lib/utils/isSameOrInheritedType'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import Menu, {MenuItem, MenuLabel} from 'clear-ui-simple/lib/menu'

const TRANSFERED_PROPS = ['indent', 'height', 'padding', 'multiline', 'compact']

/**
 * Component based on Menu for navigation using react-router.
 */
class LinkMenu extends React.Component {
	static contextTypes = {
		history: React.PropTypes.object.isRequired
	}

	static defaultProps = {
		prefix: ''
	}

	render() {
		let children = React.Children.map(this.props.children, (elem) => {
			if (isSameOrInheritedType(elem.type, MenuLabel)) {
				return transferProps(this, elem, TRANSFERED_PROPS)
			}

			if (isSameOrInheritedType(elem.type, MenuItem)) {
				let elemWithProps = transferProps(this, elem, TRANSFERED_PROPS)
				let selected = elem.props.value !== undefined &&
					this.context.history.isActive(this.props.prefix + elem.props.value,
						null, elem.props.onlyIndex)
				return React.cloneElement(elemWithProps, {
					onTap: () => { this.onSelect(elem) },
					selected
				})
			}

			return elem
		})

		return React.DOM.div(null, children)
	}

	onSelect(item) {
		let value = item.props.value
		this.context.history.pushState(null, this.props.prefix + value)
	}
}

// TODO move styles only to components page
class LinkMenuItem extends MenuItem {
	static styles = composeStyles(
		MenuItem.styles,
		(props, state) => {
			let root = {}

			let label = {
				paddingLeft: '2rem',
				paddingRight: '2rem',
				paddingTop: '0.1rem',
				paddingBottom: '0.1rem'
			}

			if (state.tapState === 'hovered') root.background = '#e6e6e6'
			else if (state.tapState === 'active') root.background = '#dadada'

			if (props.selected) {
				label.fontWeight = 'normal'
				label.color = 'rgb(30, 136, 229)'			
			}

			return {root, label}
		}
	)
}

class LinkMenuLabel extends MenuLabel {
	static styles = composeStyles(
		MenuLabel.styles,
		{
			label: {
				paddingLeft: '2rem',
				paddingRight: '2rem'
			}
		}
	)
}

export default LinkMenu
export {LinkMenuItem, LinkMenuLabel}
