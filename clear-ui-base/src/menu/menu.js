import React from 'react'
import $ from 'jquery'

import BoundFunction from '../utils/boundFunction'
import keyCodes from '../utils/keyCodes'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import isSameOrInheritedType from '../utils/isSameOrInheritedType.js'

import MenuItem from './item'
import MenuItemWithSubMenu from './itemWithSubMenu'

const INITIAL_TAP_STATE = {hovered: false, pressed: false}

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

		/** Makes items in the menu focusable. */
		focusable: React.PropTypes.bool,

		/**
		 * When `true`, menu activates keyboard navigation and allows
		 * to use arrows to navigate and `Enter` to select items.
		 */
		active: React.PropTypes.bool,

		/** TODO
		 * used internally for nested menus */
		nestingLevel: React.PropTypes.number
	}

	static defaultProps = {
		nestingLevel: 0
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

	processItems(items) {
		return React.Children.map(items, function(elem) {
			if (isSameOrInheritedType(elem.type, MenuItem)) {
				return this.processItem(elem)
			} else if (isSameOrInheritedType(elem.type, MenuItemWithSubMenu)) {
				return this.processItemWithSubMenu(elem)
			} else {
				return elem
			}
		}.bind(this))
	}

	processItem(item) {
		let props = {
			nestingLevel: this.props.nestingLevel
		}

		if ('focusable' in this.props) props.focusable = this.props.focusable

		if (!item.props.disabled) {
			let isHovered = this.state.hoveredItem === item
			let isSelected = this.props.value !== undefined &&
				item.props.value === this.props.value
			Object.assign(props, {
				selected: isSelected,
				onTap: new BoundFunction(this.onSelectItem, this, item),
				tapState: isHovered ?
					{hovered: isHovered, pressed: this.state.hoveredItemPressed} :
					INITIAL_TAP_STATE,
				onChangeTapState: new BoundFunction(this.onChangeItemTapState, this, item),
			})
			if (isHovered || isSelected) {
				props.ref = (ref) => {
					if (isHovered) this.hoveredItem = ref
					if (isSelected) this.selectedItem = ref
				}
			}
		}

		return React.cloneElement(item, props)
	}

	processItemWithSubMenu(item) {
		item = this.processItem(item)

		if (item.props.subMenu) {
			let props = {
				renderSubMenuInLayer: this.props.renderSubMenuInLayer,
				menuComponent: this.constructor,
				onHoverSubMenuItem: new BoundFunction(this.onHoverNestedItem, this),
				onSelectSubMenuItem: new BoundFunction(this.onSelectItem, this)
			}
			return React.cloneElement(item, props)
		} else {
			return item
		}
	}

	onSelectItem(item) {
		if (this.props.onSelect) this.props.onSelect(item)
	}

	onChangeItemTapState(item, state) {
		if (state.hovered || state.pressed) {
			this.setState({
				hoveredItem: item,
				hoveredItemPressed: state.pressed,
				hoveredNestedItem: false
			})
		} else {
			// don't remove hover when active
			if (!this.props.active) this.setState({hoveredItem: false})
		}
	}

	onHoverNestedItem(item) {
		this.setState({
			hoveredItem: item,
			hoveredNestedItem: true
		})
	}

	getEnabledItems() {
		let enabledItems = []
		React.Children.forEach(this.props.children, (elem) => {
			if (
				!elem.props.disabled &&
				(
					isSameOrInheritedType(elem.type, MenuItem) ||
					isSameOrInheritedType(elem.type, MenuItemWithSubMenu)
				)
			) {
				enabledItems.push(elem)
			}
		})
		return enabledItems
	}

	moveHover(direction, moveOverEdges = true /* TODO */) {
		let enabledItems = this.getEnabledItems()

		let index = enabledItems.indexOf(this.state.hoveredItem)
		let nextIndex

		// TODO
		// if currently hovered item (get by ref) has props.nestedItems and is open
		// increase state.hoveredNestedItemIndex, until reach last, then set in to null
		//
		// MenuItem should call onHover(nestedItemIndex) when
		// some of its nested items hovered with mouse
		//
		// when nestedItem is hovered and item closes submenu
		// it should call onHover for self

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

		// When menu is opened as result of keypress event it shouldn't listen this event.
		setTimeout(this.bindKeyboardEvents.bind(this))
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
			case keyCodes.LEFT:
			case keyCodes.RIGHT:
				// TODO right open/left closes
				// hover first item of nestedMenu
				let item = this.hoveredItem
				if (item && item.props.nestedItems && item.props.nestedItems.length)
					item.toggleNestedItems()
				break;
			}
			// TODO
			// add right/left arrow
			// when item has nestedItems is opens/closes subMenu
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
