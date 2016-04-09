import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import {Motion, spring} from 'react-motion'

import FocusableTappable from 'clear-ui-base/lib/focusableTappable'
import Animation, {fadeAndSlide, fadeAndScale, fade} from '../animations'
import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import ManagedStateMixin from '../utils/managedStateMixin'
import Attachment from '../attachment'

@mixinDecorator(StylesMixin, ManagedStateMixin, ChildComponentsMixin)
class DropdownMenu extends React.Component {
	static propTypes = {
		/** Trigger element of the dropdown */
		trigger: React.PropTypes.node,

		/** Value of the currently selected item. */
		value: React.PropTypes.string,

		/**
		 * function(item: ?) => void
		 * <br/>
		 * Handler of the selecting item from the dropdown menu.
		 */
		onSelect: React.PropTypes.func,

		/** Width of the dropdown list, in px or % of trigger's width. */
		width: React.PropTypes.string,

		/** Horizontal side where the list expands when it is wider than the trigger element. */
		expandSide: React.PropTypes.oneOf(['left', 'right']),

		/** Vertical side where the list shows if there is enough space. */
		vertSide: React.PropTypes.oneOf(['top', 'bottom']),

		/** TODO */
		animation: React.PropTypes.oneOf(['slide', 'fade']),

		/** Maximum height of the list. */
		maxHeight: React.PropTypes.number,

		/** Distance between the trigger element and the list. */
		listOffset: React.PropTypes.number
	}

	static defaultProps = {
		expandSide: 'right',
		vertSide: 'bottom',
		animation: 'fade',
		maxHeight: Infinity,
		listOffset: 10
	}

	static styles = {
		root: {display: 'inline-block'}, // TODO why?
		list: {position: 'absolute'}
	}

	static childComponents = {
		animation: (props) => {
			if (props.animation === 'fade') {
				return React.createElement(Animation, {fn: fade})
			}
		},

		menu: null
	}

	render() {
		let trigger = React.cloneElement(this.renderTrigger(), {
			ref: (ref) => { this.triggerRef = ref }
		})

		let menu = React.cloneElement(this.getChildComponent('menu'), {
			active: true,
			value: this.props.value,
			onSelect: this.onItemSelect.bind(this),
			styles: {
				root: {
					overflow: 'auto'
				}
			},
			ref: (ref) => { this.menuRef = ref }
		}, this.props.children)

		let list = React.DOM.div({
			style: this.styles.list,
			ref: (ref) => { this.listRef = ref }
		}, menu)

		let attachment = React.createElement(Attachment, {
			element: list,
			open: this.state.open,
			onClose: () => { this.setManagedState({open: false}) },
			layerProps: {
				onRender: this.setSizes.bind(this),
				overlay: true,
				closeOnOverlayClick: true,
				closeOnEsc: true
			},
			...this.getAttachmentConfig()
		}, trigger)

		if (this.props.animation) {
			let attachmentAnimation = React.createElement(Motion, {
				defaultStyle: {progress: 0},
				style: {progress: spring(this.state.open ? 1 : 0, [320, 30])}
			}, (value) => {
				let listAnimation = React.cloneElement(
					this.getChildComponent('animation'),
					{progress: value.progress},
					list
				)
				return React.cloneElement(attachment, {
					open: this.state.open || value.progress !== 0,
					element: listAnimation
				})
			})
			return React.DOM.div({style: this.styles.root}, attachmentAnimation)
		} else {
			return React.DOM.div({style: this.styles.root}, attachment)
		}
	}

	getAttachmentConfig() {
		let oppositeSide = (this.props.expandSide === 'left') ? 'right' : 'left'
		let oppositeVertSide = (this.props.vertSide === 'bottom') ? 'top' : 'bottom'

		return {
			attachment: {
				target: `${oppositeSide} ${this.props.vertSide}`,
				element: `${oppositeSide} ${oppositeVertSide}`
				// offset: '0 -1px' // TODO offset
			},
			mirrorAttachment: true
		}
	}

	renderTrigger() {
		if (this.props.tappable) {
			return React.cloneElement(this.props.trigger, {
				onTap: () => { this.setManagedState({open: true}) }
			})
		} else {
			return React.createElement(FocusableTappable, {
				onTap: () => { this.setManagedState({open: true}) }
			}, React.DOM.div({style: this.styles.trigger}, this.props.trigger))
		}
	}

	onItemSelect(item) {
		if (this.props.onSelect) this.props.onSelect(item.props.value, item)
		this.setManagedState({open: false})
	}

	calcListWidth() {
		let triggerElem = $(ReactDOM.findDOMNode(this.triggerRef))
		let listElem = $(ReactDOM.findDOMNode(this.listRef))

		let widthDiff = listElem.outerWidth() - listElem.width()

		let triggerWidth = triggerElem.outerWidth()
		// TODO add scrollbar width if list has scroll
		let minWidth = triggerWidth - widthDiff
		let width
		if (this.props.width) {
			let num = parseInt(this.props.width, 10)
			let unit = String(this.props.width).slice(String(num).length)
			width = (unit === '%') ? (triggerWidth * num / 100) : num
			width -= widthDiff
		}
		return {minWidth, width}
	}

	setListWidth() {
		let listElem = $(ReactDOM.findDOMNode(this.listRef))
		listElem.css(this.calcListWidth())
	}

	setMenuHeight() {
		let menuElem = $(ReactDOM.findDOMNode(this.menuRef))
		let heightDiff = menuElem.outerHeight() - menuElem.height()
		let maxHeight = Math.min(
			$(window).height() - 2 * this.props.listOffset,
			this.props.maxHeight
		) - heightDiff
		menuElem.css({maxHeight})
	}

	setSizes() {
		this.setListWidth()
		this.setMenuHeight()
	}
}

export default DropdownMenu
