import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import {Motion, spring} from 'react-motion'

import FocusableTappable from 'clear-ui-base/lib/focusableTappable'
import Animation, {fade, fadeAndSlide, fadeAndScale} from '../animations'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import ManagedStateMixin from '../utils/managedStateMixin'
import Attachment from '../attachment'

import {veryFastAndHardSpring, fastAndHardSpring} from '../animation/springPresets.js'

const OPPOSITE_SIDES = {
	top: 'bottom',
	bottom: 'top',
	left: 'right',
	right: 'left'
}

@mixin(StylesMixin, ManagedStateMixin, ChildComponentsMixin)
export default class DropdownMenu extends React.Component {
	static displayName = 'DropdownMenu'

	static propTypes = {
		/** Trigger element of the dropdown */
		trigger: React.PropTypes.node,

		/** Value of the currently selected item. */
		value: React.PropTypes.string,

		/**
		 * function(item: ?) => void
		 *
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
		listOffset: 0
	}

	static styles = {
		root: {display: 'inline-block'}, // TODO why?
		list: {position: 'absolute'}
	}

	static childComponents = {
		animation: (props, state) => {
			if (props.animation === 'fade') {
				return React.createElement(Animation, {fn: fade})
			}

			if (props.animation === 'slide') {
				return React.createElement(Animation, {
					fn: fadeAndSlide,
					params: {side: state.side}
				})
			}

			if (props.animation === 'scale' || props.animation === 'scaleVert') {
				return React.createElement(Animation, {
					fn: fadeAndScale,
					params: {
						origin: `${state.vertSide} ${state.horizSide}`,
						axis: props.animation === 'scale' ? 'scale' : 'scaleY'
					}
				})
			}
		},

		menu: null
	}

	constructor() {
		super()
		this.initManagedState(['open'])
		if (!this.state) this.state = {}
		this.state.rest = true
	}

	componentWillReceiveProps(nextProps) {
		// Every time opened state is changed with props it should reset value of 'rest',
		// as in open() and close() methods.
		if ('open' in nextProps && nextProps.open !== this.state.open) {
			this.setState({rest: false})
		}
	}

	updateSides(mirror) {
		let vertSide = mirror.vert ?
			this.props.vertSide : OPPOSITE_SIDES[this.props.vertSide]
		let horizSide = mirror.horiz ?
			this.props.expandSide : OPPOSITE_SIDES[this.props.expandSide]
		if ((this.state.horizSide !== horizSide) || (this.state.vertSide !== vertSide)) {
			this.setState({horizSide, vertSide})
		}
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
			onClose: this.close.bind(this),
			layerProps: {
				onRender: this.setSizes.bind(this),
				overlay: true,
				closeOnOverlayClick: true,
				closeOnEsc: true
			},
			onChangeAttachment: (index, mirror) => { this.updateSides(mirror) },
			...this.getAttachmentConfig()
		}, trigger)

		if (this.props.animation) {
			let preset = (this.props.animation === 'fade') ?
				fastAndHardSpring : veryFastAndHardSpring
			let motion = React.createElement(Motion, {
				defaultStyle: {progress: 0},
				style: {progress: spring(this.state.open ? 1 : 0, preset)},
				onRest: () => { this.setState({rest: true}) }
			}, (value) => {
				return React.cloneElement(
					this.getChildComponent('animation'),
					{progress: value.progress},
					list
				)
			})

			return (
				<div style={this.styles.root}>
					{React.cloneElement(attachment, {
						open: this.state.open || !this.state.rest,
						element: motion
					})}
				</div>
			)
		} else {
			return <div style={this.styles.root}>{attachment}</div>
		}
	}

	getAttachmentConfig() {
		let oppositeSide = OPPOSITE_SIDES[this.props.expandSide]
		let oppositeVertSide = OPPOSITE_SIDES[this.props.vertSide]
		return {
			attachment: {
				target: `${oppositeSide} ${this.props.vertSide}`,
				element: `${oppositeSide} ${oppositeVertSide}`,
				offset: `0 ${this.props.listOffset}px`
			},
			mirrorAttachment: 'all'
		}
	}

	renderTrigger() {
		if (this.props.tappable) {
			return React.cloneElement(this.props.trigger, {
				onTap: this.open.bind(this)
			})
		} else {
			return React.createElement(FocusableTappable, {
				onTap: this.open.bind(this)
			}, React.DOM.div({style: this.styles.trigger}, this.props.trigger))
		}
	}

	open() {
		this.setManagedState({open: true, rest: false})
	}

	close() {
		this.setManagedState({open: false, rest: false})
		this.triggerRef.focus()
	}

	onItemSelect(item) {
		if (this.props.onSelect) this.props.onSelect(item.props.value, item)
		this.close()
	}

	getListWidth() {
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
		listElem.css(this.getListWidth())
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
