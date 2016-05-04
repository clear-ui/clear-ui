import React from 'react'

import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import ChildComponentsMixin from 'clear-ui-base/lib/utils/childComponentsMixin'
import BaseButton from 'clear-ui-base/lib/button'
import Ripples from '../ripples'

// Button that shows ripples effect on press.
@mixin(ChildComponentsMixin)
export default class RippleButton extends BaseButton {
	static propTypes = {
		...BaseButton.propTypes,

		/**
		 * If true, ripple effect appears on press, otherwise
		 * button just changes background color.
		 */
		ripples: React.PropTypes.bool
	}

	static defaultProps = {
		...BaseButton.defaultProps,
		ripples: true
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

	renderRoot() {
		let root = super.renderRoot()

		if (this.props.disabled) {
			return root
		} else {
			let ripples
			if (this.props.ripples && !this.props.disabled) {
				ripples = React.cloneElement(this.getChildComponent('ripples'), {
					key: 'ripples',
					ref: 'ripples'
				})
			}

			return React.cloneElement(root, null, [this.props.children, ripples])
		}
	}

	render() {
		let tappable = super.render()
		if (this.props.ripples) {
			return React.cloneElement(tappable, {
				onTapStart: (e) => { this.refs.ripples.start(e) },
				onTapEnd: (e) => { this.refs.ripples.end(e) }
			})
		} else {
			return tappable
		}
	}
}
