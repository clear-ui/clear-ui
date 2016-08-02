import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import mixin from '../utils/mixin/decorator'
import BindMethodsMixin from '../utils/bindMethodsMixin'
import cloneElementWithHandlers from '../utils/cloneElementWithHandlers'

let blockMouseEvents

/** Helper for handling touch and mouse events for button-like components. */
@mixin(BindMethodsMixin)
export default class Tappable extends React.Component {
	static displayName = 'Tappable'

	static propTypes = {
		/**
		 * Single element.
		 * When not DOM-component is provided, it is wrapped with `div`.
		 */
		children: React.PropTypes.element.isRequired,

		/** Tap event handler. */
		onTap: React.PropTypes.func,

		/** Disables events handling. */
		disabled: React.PropTypes.bool,

		/**
		 * Handler of hovered and pressed states changes.
		 *
		 * `({hovered: boolean, pressed: boolean}) => void`
		 */
		onChangeTapState: React.PropTypes.func,

		/**
		 * `(tap: object) => void`
		 */
		onTapStart: React.PropTypes.func,

		/**
		 * `(tap: object) => void`
		 */
		onTapEnd: React.PropTypes.func,

		/** CSS `display` property of the wrapper element, that is created when
		 * child is not DOM-component. */
		display: React.PropTypes.string,

		/** Style passed down to the child element. */
		style: React.PropTypes.object
	}

	static defaultProps = {
		display: 'inline-block'
	}

	componentDidMount() {
		this.mounted = true
	}

	componentWillUnmount() {
		this.mounted = false
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
		let elem = this.props.children

		elem = React.cloneElement(elem, {
			style: {
				...this.props.children.props.style,
				...this.props.style
			}
		})

		if (!this.props.disabled) {
			if (typeof elem.type !== 'string') {
				elem = <div style={{display: this.props.display}}>{elem}</div>
			}
			elem = cloneElementWithHandlers(elem, {
				onMouseEnter: this.mouseEnter,
				onMouseLeave: this.mouseLeave,
				onMouseDown: this.mouseDown,
				onTouchStart: this.touchStart,
				onTouchMove: this.touchMove,
				onTouchEnd: this.touchEnd,
				onClick: (event) => { event.stopPropagation() }
			})
		}

		return elem
	}

	pressed = false
	hovered = false

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
		// Parent component can unmount button on tap
		if (!this.mounted) return

		this.active = false
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
		if (event.touches.length === 1) { // process only first touch
			this.touch = true
			this.initScrollDetection()
			this.hovered = true
			this.pressed = true
			this.onChangeTapState()
			if (this.props.onTapStart) this.props.onTapStart(event.touches[0])
		}
	}

	touchMove() {
		if (!this.touch) return
		if (this.detectScroll()) this.endTouch(false)
	}

	touchEnd(event) {
		if (!this.touch) return
		event.preventDefault()
		this.endTouch(true, event) // TODO when to end? only when we have only one touch?
	}

	endTouch(tap, event) {
		this.touch = false
		this.hovered = false
		this.pressed = false
		this.onChangeTapState()
		if (this.props.onTapEnd) this.props.onTapEnd(event)
		if (tap) this.onTap(event)
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
