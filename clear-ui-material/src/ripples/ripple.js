import React from 'react'
import ReactDOM from 'react-dom'

import mixin from 'clear-ui-base/lib/utils/mixin'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'

class Ripple extends React.Component {
	static defaultProps = {
		color: 'black',
		opacity: 0.16
	}

	static styles = (props) => {
		return {
			ripple: {
				position: 'absolute',
				top: 0,
				left: 0,
				height: '100%',
				width: '100%',
				borderRadius: '50%',
				backgroundColor: props.color,
				userSelect: 'none'
			}
		}
	}

	componentDidMount() {
		this._isMounted = true
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	componentWillAppear(callback) {
		this.prepareAnimation(callback)
	}

	componentWillEnter(callback) {
		this.prepareAnimation(callback)
	}

	componentDidAppear() {
		this.startAnimation()
	}

	componentDidEnter() {
		this.startAnimation()
	}

	prepareAnimation(callback) {
		let style = ReactDOM.findDOMNode(this).style
		// TODO autoprefix
		style.transform = 'scale(0)'
		style.opacity = this.props.opacity
		// TODO polyfill
		window.requestAnimationFrame(() => { if (this._isMounted) callback() })
	}

	startAnimation() {
		let style = ReactDOM.findDOMNode(this).style
		// TODO autoprefix
		style.transition =
			`transform 1s cubic-bezier(0.23, 1, 0.32, 1),` +
			//`transform 1s ${TRANSITIONS.strongEaseOut},` +
			`opacity 2s ${TRANSITIONS.strongEaseOut}`
		style.transform = 'scale(1)'
	}

	componentWillLeave(callback) {
		ReactDOM.findDOMNode(this).style.opacity = 0
		setTimeout(() => { if (this._isMounted) callback() }, 2000)
	}

	render() {
		return <div style={this.styles.ripple}/>
	}
}

export default mixin(Ripple, StylesMixin)
