import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import mixinDecorator from '../utils/mixin/decorator'
import BindMethodsMixin from '../utils/bindMethodsMixin'

let blockMouseEvents

/**
 * Helper for handling touch and mouse events for button-like components.
 * @param {function} [props.onTap] Tap event handler.
 * @param {function(event: object)} [props.onTapStart]
 * @param {function(event: object)} [props.onTapEnd]
 * @param {function} [props.onHoverStart] TODO
 * @param {function} [props.onHoverEnd] TODO
 * @param {function} [props.onChangeTapState] ({hovered: boolean, pressed: boolean)
 *     Handler of hovered and pressed states changes.
 */
@mixinDecorator(BindMethodsMixin)
class Tappable extends React.Component {
	static propTypes = {
		onChangeState: React.PropTypes.func,
		onTap: React.PropTypes.func,
		children: React.PropTypes.element.isRequired
	}

	constructor(props) {
		super(props)
		this.bindMethods(
			'mouseEnter',
			'mouseLeave',
			'mouseDown',
			'mouseUp',
			'touchStart',
			'touchMove',
			'touchEnd'
		)
	}

	render() {
		return React.cloneElement(this.props.children, {
			onMouseEnter: this.mouseEnter,
			onMouseLeave: this.mouseLeave,
			onMouseDown: this.mouseDown,
			onTouchStart: this.touchStart,
			onTouchMove: this.touchMove,
			onTouchEnd: this.touchEnd,
			onClick: (event) => { event.stopPropagation() }
		})
	}

	mouseEnter() {
		if (blockMouseEvents) return
		this.hovered = true
		this.onChangeTapState()
	}

	mouseLeave() {
		if (blockMouseEvents) return
		this.hovered = false
		this.onChangeTapState()
	}

	mouseDown(event) {
		if (blockMouseEvents) {
			blockMouseEvents = false
			return
		}

		if (event.button !== 0) return

		$(document).one('mouseup', this.mouseUp)
		this.pressed = true
		this.onChangeTapState()
		if (this.props.onTapStart) this.props.onTapStart(event)
	}

	mouseUp(event) {
		this.active = false
		// TODO check isMounted
		let isOnButton = $(event.target).closest(ReactDOM.findDOMNode(this)).length
		if (this.props.onTapEnd) this.props.onTapEnd(event)
		if (isOnButton) {
			this.onTap(event)
		} else {
			this.hovered = false
		}
		this.pressed = false
		this.onChangeTapState()
	}

	touchStart(event) {
		blockMouseEvents = true
		if (event.touches.length === 1) {
			this.touch = true // flag that we already handle the touch and ignore all new
			this.initScrollDetection()
			this.hovered = true
			this.pressed = true
			this.onChangeTapState()
			if (this.props.onTapStart) this.props.onTapStart(event.touches[1])
		}
	}

	touchMove() {
		if (this.detectScroll()) this.endTouch(false)
	}

	touchEnd(event) {
		if (!this.touch) return // when this happens? never?
		event.preventDefault()
		this.endTouch(true, event) // when to end? only when we have only one touch?
	}

	endTouch(tap, event) {
		this.touch = false
		this.hovered = true
		this.pressed = true
		this.onChangeTapState()
		if (this.props.onTapEnd) this.props.onTapEnd(event)
		if (tap) this.props.onTap(event)
	}

	initScrollDetection() {
		this.scrollPos = {top: 0, left: 0}
		this.scrollParents = []
		let node = ReactDOM.findDOMNode(this)
		while (node) {
			if (node.scrollHeight > node.offsetHeight || node.scrollWidth > node.offsetWidth) {
				this.scrollParents.push(node)
				this.scrollPos.top += node.scrollTop
				this.scrollPos.left += node.scrollLeft
			}
			node = node.parentNode
		}
	}

	detectScroll() {
		let currentScrollPos = {top: 0, left: 0}
		for (let i in this.scrollParents) {
			currentScrollPos.top += this.scrollParents[i].scrollTop
			currentScrollPos.left += this.scrollParents[i].scrollLeft
		}
		return currentScrollPos.top !== this.scrollPos.top ||
			currentScrollPos.left !== this.scrollPos.left
	}

	onChangeTapState() {
		if (this.props.onChangeTapState) {
			this.props.onChangeTapState({pressed: this.pressed, hovered: this.hovered})
		}
	}

	onTap(e) {
		if (this.props.onTap) this.props.onTap(e)
	}
}

export default Tappable
