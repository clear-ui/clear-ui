import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import _ from 'underscore'

import cloneReferencedElement from '../utils/cloneReferencedElement'
import ZContext from '../zContext'

/**
 * @param {number} [props.offset]
 * @param {'top'|'bottom'} [props.side='top']
 * @param {object} [props.container] -
 *     Container element that restricts position of sticky element.
 *     It can be DOM-element or React element or deferred that resolves to
 *     one of it.
 */
export default class Sticky extends React.Component {
	static propTypes = {
		offset: React.PropTypes.number,
		side: React.PropTypes.oneOf(['top', 'bottom']),
		container: React.PropTypes.object
	}

	static defaultProps = {
		offset: 0,
		side: 'top'
	}

	constructor(props) {
		super(props)
		this.state = {position: {}}
	}

	componentDidMount() {
		this.update()
		this.bindEvents()
	}

	componentDidUpdate() { this.update() }

	componentWillUnmount() { this.unbindEvents() }

	render() {
		let elem = React.DOM.div({ref: (ref) => {
			if (ref !== null) this.elemRef = ref // FIXME
		}}, this.props.children)

		if (this.state.position.fixed) {
			let placeholder = React.DOM.div({ref: 'placeholder', key: 'placeholder'})

			let style = {
				position: 'fixed',
				zIndex: 1,
				...this.state.position.position,
				...this.elemStyles
			}
			let container = React.DOM.div({style}, elem)
			let content = React.createElement(ZContext.Layer, {
				open: true,
				type: 'fixed',
				key: 'layer'
			}, container)

			return React.DOM.div(null, [placeholder, content])
		} else {
			return elem
		}
	}

	update() {
		if (this.props.container && typeof this.props.container.then === 'function') {
			this.props.container.then(this.updatePosition.bind(this))
		} else {
			this.updatePosition(this.props.container)
		}
	}

	updatePosition(container) {
		let $container = container && $(ReactDOM.findDOMNode(container))
		let position = this.getPosition($container)
		if (!_.isEqual(this.state.position, position)) {
			if (!this.state.position.fixed && position.fixed) { // transition to fixed
				this.saveElemStyles()
			}
			this.setState({position})
		}
		if (this.state.position.fixed) this.setPlaceholderSize()
	}

	getPosition(container) {
		let elem = $(this.state.position.fixed ? this.refs.placeholder : this.elemRef)

		let scrollTop = $(window).scrollTop()
		let windowHeight = $(window).height()

		let elemHeight = elem.outerHeight()
		let elemPos = elem.offset().top
		let scrollPos = scrollTop

		if (this.props.side === 'bottom') {
			let pageHeight = $(html).height()
			elemPos = pageHeight - elemPos - elemHeight
			scrollPos = pageHeight - scrolled - windowHeight()
		}

		let fixed = scrollPos > elemPos - this.props.offset

		let position = {[this.props.side]: this.props.offset}
		if (fixed && container) {
			// Distance from top edge of window to bottom edge of container and to fixed elem
			let containerBottom = container.offset().top + container.outerHeight() - scrollTop
			let fixedElemBottom =  (this.props.side === 'top') ?
				(this.props.offset + elemHeight) :
				(windowHeight - this.props.offset)
			// Container's bottom edge should push element
			if (fixedElemBottom > containerBottom) {
				position = {top: containerBottom - elemHeight}
			}
		}

		return {fixed, position}
	}

	/*
	saveScrollDirection() {
		let scrollDelta = scrollTop - this.prevScrollTop
		this.prevScrollTop = scrollTop
		this.prevScrollDirection = this.scrollDirection
		this.scrollDirection = (scrollDelta > 0) ? 'up' : 'down'
	}
   */

	/*
	makeOversizedPosition() {
		let prevPosition = this.state.style.position
		if (prevPosition === 'fixed') {
			if (this.scrollDirection !== this.prevScrollDirection) {
				return makeAbsolutePosition()
			}
		} else if (prevPosition === 'absolute') {
			// if we scrolled to end we return fixed position
		}
	}

	isOversized() {
		return elemHeight > windowHeight
	}

	makeAbsolutePosition() {
		let style = this.state.style
		return style.top ?
			(scrollTop + style.top) :
			(scrollTop + windowHeight - style.bottom)
	}
	*/

	setPlaceholderSize() {
		let elem = $(this.elemRef)
		let placeholder = $(this.refs.placeholder)
		let height = elem.outerHeight(true)
		let width = elem.outerWidth(true)
		placeholder.css({height, width})
	}

	saveElemStyles() {
		let elem = $(this.elemRef)
		this.elemStyles = {
			width: elem.width(),
			left: elem.offset().left
		}
	}

	bindEvents() {
		this.listener = this.update.bind(this)
		$(window).bind('scroll resize', this.listener)
	}

	unbindEvents() {
		$(window).unbind('scroll resize', this.listener)
	}
}
