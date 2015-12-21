import React from 'react'

import BaseTooltip from 'clear-ui-base/lib/tooltip'
import {FadeSlideAnimation} from 'clear-ui-base/lib/animations'
import {SlideAnimation} from 'clear-ui-base/lib/animations'
import COLORS from '../styles/colors'

export default class Tooltip extends BaseTooltip {
	static defaultProps = {
		...BaseTooltip.defaultProps,
		animation: true
	}

	static styles = (props, state) => {
		let root = {
			background: COLORS.grey700,
			color: 'white',
			position: 'relative',
			borderRadius: '2px',
			opacity: 0.9,
			lineHeight: '20px'
		}

		if (props.desktop) {
			root.padding = '3px 8px'
			root.fontSize = '12px'
		} else {
			root.padding = '6px 16px'
			root.fontSize = '14px'
		}

		return {root}
	}

	static childComponents = {
		animation: (props, state) => {
			return React.createElement(FadeSlideAnimation, {side: state.side})
		}
	}

	getOffset() {
		return this.props.desktop ? 14 : 24
	}

	//renderTooltip(progress) {
		//let tooltip = super.renderTooltip(progress)

		//let style = {
			//...tooltip.props.style,
			//opacity: (tooltip.props.style.opacity || 1) * progress
		//}
		//let translate = 10 - 10 * progress
		//switch (this.state.side) {
			//case 'top': style.marginTop = translate + 'px'; break
			//case 'bottom': style.marginTop = -translate + 'px'; break
			//case 'left': style.marginLeft = translate + 'px'; break
			//case 'right': style.marginLeft = -translate + 'px'; break
		//}

		//return React.cloneElement(tooltip, {style})
	//}
}
