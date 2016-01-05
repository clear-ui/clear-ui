import React from 'react'

import BaseButton from 'clear-ui-base/lib/button'
import Ripples from '../ripples'

// Button that shows ripples effect on press.
export default class RippleButton extends BaseButton {
	static defaultProps = {
		...BaseButton.defaultProps,
		ripples: true
	}

	static propTypes = {
		ripples: React.PropTypes.bool
	}

	static styles = {
		root: {
			position: 'relative',
			overflow: 'hidden',
			// This is needed so that ripples do not bleed past border radius.
			// See: http://stackoverflow.com/questions/17298739
			transform: 'translate3d(0, 0, 0)'
		}
	}

	static childComponents = {
		ripples: React.createElement(Ripples, {key: 'ripples'})
	}

	renderContainer() {
		let container = super.renderContainer()

		if (this.props.disabled) {
			return container
		} else {
			let ripples
			if (this.props.ripples && !this.props.disabled) {
				ripples = React.cloneElement(this.getChildComponent('ripples'), {ref: 'ripples'})
			}

			return React.cloneElement(container, null, [this.props.children, ripples])
		}
	}

	render() {
		let tappable = super.render()
		if (this.props.ripples) {
			return React.cloneElement(tappable, {
				onTapStart: (e) => { this.refs.ripples.start(e) },
				onTapEnd: (e) => { this.refs.ripples.end(e) },
			})
		} else {
			return tappable
		}
	}
}


