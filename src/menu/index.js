import React from 'react'
import $ from 'jquery'

import BoundFunction from '../utils/boundFunction'
import keyCodes from '../utils/keyCodes'
import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

import MenuItem from './item'

/**
 * @param {boolean} [props.active=true] - Is keyboard navigation active.
 * @param {function(item: React.Element)} [props.onSelect]
 * @param [props.value]
 */
@mixinDecorator(StylesMixin)
class Menu extends React.Component {
	componentDidMount() { this.setActive() }
	componentDidUpdate() { this.setActive() }
	componentWillUnmount() { this.deactivate() }

	processItems() {
		return React.Children.map(this.props.children, function(elem) {
			if (elem.type === this.props.itemType && !elem.props.disabled) {
				let isHovered = this.state.hoveredItem === elem
				let isSelected = this.props.value !== undefined &&
					elem.props.value === this.props.value
				let props = {
					selected: isSelected,
					onTap: new BoundFunction(this.select, this, elem),
					state: {
						itemState: isHovered ?
							(this.state.hoveredItemActive ? 'active' : 'hovered') :
							'initial'
					},
					onChangeState: {
						itemState: new BoundFunction(this.onChangeItemState, this, elem)
					}
				}
				if (isHovered || isSelected) {
					props.ref = (ref) => {
						if (isHovered) this.hoveredItem = ref
						if (isSelected) this.selectedItem = ref
					}
				}
				return React.cloneElement(elem, props)
			} else {
				return elem
			}
		}.bind(this))
	}

	render() {
		return React.DOM.div({style: this.styles.root},
			this.processItems(this.props.children)
		)
	}

	select(item) {
		if (this.props.onSelect) this.props.onSelect(item)
	}

	onChangeItemState(item, state) {
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
		let enabledItems = []
		React.Children.forEach(this.props.children, (elem) => {
			if (!elem.props.disabled && elem.type === this.props.itemType) {
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
				this.select(this.state.hoveredItem)
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

export default Menu
export {MenuItem}
