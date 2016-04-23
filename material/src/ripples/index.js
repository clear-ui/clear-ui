import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactTransitionGroup from 'react-addons-transition-group'

import mixin from 'clear-ui-base/lib/utils/mixin'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import Tappable from 'clear-ui-base/lib/tappable'
import Ripple from './ripple'

// Component that shows circular ripple on click
class Ripples extends React.Component {
	static propTypes = {
		color: React.PropTypes.string,
		opacity: React.PropTypes.number
	}

	static defaultProps = {
		color: 'black',
		opacity: 0.16
	}

	static styles = {
		root: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			overflow: 'hidden'
		}
	}

	constructor(props) {
		super(props)
		this.nextKey = 0
		this.state = {ripples: []}
	}

	getNextKey() {
		this.nextKey += 1
		return this.nextKey
	}

	render() {
		//FIXME it breaks touchend event
		//if (this.state.render) {
			return React.createElement(ReactTransitionGroup, {
				component: 'div',
				style: this.styles.root
			}, this.state.ripples)
		//} else {
			//return React.DOM.div({style: this.styles.root})
		//}
	}

	start(e) {
		const {color, opacity} = this.props
		const ripple = React.createElement(Ripple, {
			key: this.getNextKey(),
			styles: {ripple: this.getRippleStyle(e)},
			color,
			opacity
		})
		this.setState({
			render: true,
			ripples: [...this.state.ripples, ripple]
		})
	}

	end() {
		this.setState({ripples: []})
	}

	getRippleStyle(e) {
		const elem = $(ReactDOM.findDOMNode(this))
		const elemHeight = elem.height()
		const elemWidth = elem.width()
		const offset = elem.offset()

		let x, y
		if (e) {
			x = e.pageX - offset.left
			y = e.pageY - offset.top
		} else {
			x = elemWidth / 2
			y = elemHeight / 2
		}

		const topLeftDiag = this.calcDiag(x, y)
		const topRightDiag = this.calcDiag(elemWidth - x, y)
		const botRightDiag = this.calcDiag(elemWidth - x, elemHeight - y)
		const botLeftDiag = this.calcDiag(x, elemHeight - y)
		const rippleRadius = Math.max(
			topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
		)
		const rippleSize = rippleRadius * 2
		const left = x - rippleRadius
		const top = y - rippleRadius

		return {
			height: rippleSize + 'px',
			width: rippleSize + 'px',
			top: top + 'px',
			left: left + 'px'
		}
	}

	calcDiag(a, b) {
		return Math.sqrt(a * a + b * b)
	}
}

export default mixin(Ripples, StylesMixin)
