import React from 'react'
import $ from 'jquery'

import BoundFunction from '../utils/boundFunction'
import keyCodes from '../utils/keyCodes'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import isSameOrInheritedType from '../utils/isSameOrInheritedType.js'

import MenuItem from './item'

@mixin(StylesMixin)
export default class Menu extends React.Component {
	static propTypes = {
		/** Value of the currently selected item */
		value: React.PropTypes.string,

		/**
		 * Handler of the selecting item from the menu.
		 *
		 * `(item: MenuItem) => void`
		 */
		onSelect: React.PropTypes.func,

		/**
		 * When `true`, menu activates keyboard navigation and allows
		 * to use arrows to navigate and `Enter` to select items.
		 */
		active: React.PropTypes.bool
	}

	componentDidMount() { this.setActive() }
	componentDidUpdate() { this.setActive() }
	componentWillUnmount() { this.deactivate() }

	render() {
		return (
			<div style={this.styles.root}>
				{this.processItems(this.props.children)}
			</div>
		)
	}

	processItems(items, level = 0) {
		return React.Children.map(items, function(elem) {
			if (isSameOrInheritedType(elem.type, MenuItem)) {
				let props = {
					nestingLevel: level
				}

				if ('focusable' in this.props) props.focusable = this.props.focusable

				if (!elem.props.disabled) {
					let isHovered = this.state.hoveredItem === elem
					let isSelected = this.props.value !== undefined &&
						elem.props.value === this.props.value
					Object.assign(props, {
						selected: isSelected,
						onTap: new BoundFunction(this.onSelectItem, this, elem),
						tapState: isHovered ?
							(this.state.hoveredItemActive ? 'active' : 'hovered') :
							'initial',
						onChangeTapState: new BoundFunction(this.onChangeItemTapState, this, elem)
					})
					if (isHovered || isSelected) {
						props.ref = (ref) => {
							if (isHovered) this.hoveredItem = ref
							if (isSelected) this.selectedItem = ref
						}
					}
				}

				if (elem.props.nestedItems) {
					props.nestedItems = this.processItems(elem.props.nestedItems, level + 1)
				}

				return React.cloneElement(elem, props)
			} else {
				return elem
			}
		}.bind(this))
	}


	onSelectItem(item) {
		if (this.props.onSelect) this.props.onSelect(item)
	}

	onChangeItemTapState(item, state) {
		if (state === 'hovered' || state === 'active') {
			this.setState({
				hoveredItem: item,
				hoveredItemActive: state === 'active'
			})
		} else if (state === 'initial') {
			// don't remove hover when active
			if (!this.props.active) this.setState({hoveredItem: false})
		}
	}

	getEnabledItems() {
		// TODO nested items
		let enabledItems = []
		React.Children.forEach(this.props.children, (elem) => {
			if (!elem.props.disabled && isSameOrInheritedType(elem.type, MenuItem)) {
				enabledItems.push(elem)
			}
		})
		return enabledItems
	}

	moveHover(direction) {
		let enabledItems = this.getEnabledItems()

		let index = enabledItems.indexOf(this.state.hoveredItem)
		let nextIndex

		if (direction === 'up') {
			nextIndex = (index === 0) ? (enabledItems.length - 1) : (index - 1)
		} else {
			nextIndex = (index === enabledItems.length - 1) ? 0 : (index + 1)
		}

		this.setState({hoveredItem: enabledItems[nextIndex]})
	}

	setActive() {
		if (this.props.active) this.activate()
		else this.deactivate()
	}

	activate() {
		if (this.activated) return
		this.activated = true
		$(document.activeElement).blur()

		let enabledItems = this.getEnabledItems()
		let selectedItem
		if (this.props.value !== undefined) {
			selectedItem = enabledItems.find((item) => {
				return item.props.value === this.props.value
			})
		}
		this.setState({hoveredItem: selectedItem || enabledItems[0]})

		this.bindKeyboardEvents()
	}

	bindKeyboardEvents() {
		this.listener = (event) => {
			switch (event.keyCode) {
			case keyCodes.DOWN:
				this.moveHover('down')
				event.preventDefault()
				break
			case keyCodes.UP:
				this.moveHover('up')
				event.preventDefault()
				break
			case keyCodes.ENTER:
				this.onSelectItem(this.state.hoveredItem)
				event.preventDefault()
				break
			}
		}
		$(document).bind('keydown', this.listener)
	}

	deactivate() {
		if (!this.activated) return
		this.activated = false
		this.setState({hoveredItem: false})
		if (this.listener) $(document).unbind('keydown', this.listener)
	}
}

export {MenuItem}
