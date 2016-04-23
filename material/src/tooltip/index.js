import React from 'react'

import BaseTooltip from 'clear-ui-base/lib/tooltip'
import COLORS from '../styles/colors'

export default class Tooltip extends BaseTooltip {
	static defaultProps = {
		...BaseTooltip.defaultProps,
		animation: 'slide'
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

	getOffset() {
		return this.props.desktop ? 14 : 24
	}
}
