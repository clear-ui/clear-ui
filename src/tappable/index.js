import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import mixinDecorator from '../utils/mixin/decorator'
import BindMethodsMixin from '../utils/bindMethodsMixin'

let blockMouseEvents

let STATE_INITIAL = 'initial'
let STATE_ACTIVE = 'active'
let STATE_HOVERED = 'hovered'

/**
 * Helper for handling touch and mouse events for button-like components.
 * @param {function} [props.onTap] Tap event handler.
 * @param {function} [props.onTapStart] (event: object)
 * @param {function} [props.onTapEnd] (event: object)
 * @param {function} [props.onChangeState] (state: string) Handler of state changes.
 *     State can be one of the following: 'initial', 'hovered', or 'active'.
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
		this.changeState(this.active ? STATE_ACTIVE : STATE_HOVERED)
	}

	mouseLeave() {
		if (blockMouseEvents) return
		this.changeState(this.active ? STATE_HOVERED : STATE_INITIAL)
	}

	mouseDown(event) {
		if (blockMouseEvents) {
			blockMouseEvents = false
			return
		}

		if (event.button !== 0) return

		this.active = true
		this.changeState(STATE_ACTIVE)
		$(document).one('mouseup', this.mouseUp)
		if (this.props.onTapStart) this.props.onTapStart(event)
	}

	mouseUp(event) {
		this.active = false
		// TODO check isMounted
		let isOnButton = $(event.target).closest(ReactDOM.findDOMNode(this)).length
		if (this.props.onTapEnd) this.props.onTapEnd(event)
		if (isOnButton) {
			this.changeState(STATE_HOVERED)
			this.onTap(event)
		} else {
			this.changeState(STATE_INITIAL)
		}
	}

	touchStart(event) {
		blockMouseEvents = true
		if (event.touches.length === 1) {
			this.touch = true
			this.changeState(STATE_ACTIVE)
			this.initScrollDetection()
			if (this.props.onTapStart) this.props.onTapStart(event.touches[1])
		}
	}

	touchMove() {
		if (this.detectScroll()) this.endTouch(false)
	}

	touchEnd(event) {
		if (!this.touch) return
		event.preventDefault()
		this.endTouch(true, event)
	}

	endTouch(tap, event) {
		this.touch = false
		this.changeState(STATE_INITIAL)
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

	changeState(state) {
		if (this.props.onChangeState) this.props.onChangeState(state)
	}

	onTap(e) {
		if (this.props.onTap) this.props.onTap(e)
	}
}

export default Tappable
