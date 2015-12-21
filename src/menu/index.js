import React from 'react'
import $ from 'jquery'

import keyCodes from '../utils/keyCodes'
import mixin from '../utils/mixin'
import StylesMixin from '../utils/stylesMixin'

/**
 * @param {boolean} [props.active=true] - Is keyboard navigation active.
 * @param {function(item: React.Element)} [props.onSelect]
 * @param [props.value]
 */
class Menu extends React.Component {
	componentDidMount() { this.setActive() }
	componentDidUpdate() { this.setActive() }
	componentWillUnmount() { this.deactivate() }

	render() {
		let content = React.Children.map(this.props.children, function(elem) {
			if (elem.type === this.props.itemType && !elem.props.disabled) {
				return React.cloneElement(elem, {
					state: (this.state.hoveredItem === elem) ?
						(this.state.hoveredItemActive ? 'active' : 'hovered') :
						'initial',
					selected: this.props.value !== undefined &&
						elem.props.value === this.props.value,
					onTap: this.select.bind(this, elem),
					onChangeState: {
						state: (state) => { this.onChangeItemState(elem, state) }
					}
				})
			} else {
				return elem
			}
		}.bind(this))

		return React.DOM.div({style: this.styles.root}, content)
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
		this.setState({
			hoveredItem: this.getEnabledItems()[0] // TODO hover selected item
		})
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

export default mixin(Menu, StylesMixin)
