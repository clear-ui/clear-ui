import React from 'react'

import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import BaseItem from 'clear-ui-base/lib/menu/item'
import Ripples from '../ripples'

// Item that contains inside Ripples component
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

	renderItem() {
		let item = super.renderItem()

		let ripples
		if (this.props.ripples &&
			!this.props.disabled &&
			!this.state.rightIconTapState.hovered
		) {
			ripples = React.cloneElement(this.getChildComponent('ripples'), {ref: 'ripples'})
		}

		return React.cloneElement(item, null, [item.props.children, ripples])
	}

	renderTappable() {
		let tappable = super.renderTappable()
		if (this.props.ripples) {
			return React.cloneElement(tappable, {
				onTapStart: (e) => { if (this.refs.ripples) this.refs.ripples.start(e) },
				onTapEnd: (e) => { if (this.refs.ripples) this.refs.ripples.end(e) }
			})
		} else {
			return tappable
		}
	}
}
