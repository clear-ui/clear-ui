import React from 'react'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import ChildComponentsMixin from 'clear-ui-base/lib/utils/childComponentsMixin'
import BaseItem from 'clear-ui-base/lib/menu/item'
import Ripples from '../ripples'

// Item that contains inside Ripples component
@mixinDecorator(ChildComponentsMixin)
export default class RippleItem extends BaseItem {
	static defaultProps = {
		...BaseItem.defaultProps,
		ripples: true
	}

	static childComponents = {
		ripples: React.createElement(Ripples, {key: 'ripples'})
	}

	static styles = {
		root: {
			overflow: 'hidden',
			position: 'relative'
		}
	}

	renderContainer() {
		let container = super.renderContainer()

		let ripples
		if (this.props.ripples &&
			!this.props.disabled &&
			this.state.rightIconState === 'initial'
		) {
			ripples = React.cloneElement(this.getChildComponent('ripples'), {ref: 'ripples'})
		}

		return React.cloneElement(container, null, [container.props.children, ripples])
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


