import React from 'react'

import BaseCheckbox from 'clear-ui-base/lib/checkbox'
import Icon from 'clear-ui-base/lib/icon'
import getIconElementStyle from '../styles/getIconElementStyle'
import COLORS from '../styles/colors'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'
import checkmarkIcon from './checkmark.icon.svg'

export default class Checkbox extends BaseCheckbox {
	static defaultProps = {
		...BaseCheckbox.defaultProps,
		height: 'default',
		padding: 'default'
	}

	static styles = (props, state) => {
		let {height, padding, multiline} = props
		let styles = getIconElementStyle({
			height, padding, multiline,
			leftIcon: true
		})

		let root = {
			...styles.root,
			outline: 'none',
			cursor: 'default'
		}

		let icon = styles.leftIcon

		let label = styles.label

		let box = {
			position: 'absolute',
			width: '75%',
			height: '75%',
			top: '12.5%',
			left: '12.5%',
			boxSizing: 'border-box',
			background: 'white',
			border: '1px solid',
			borderColor: 'rgba(0,0,0,.15)',
			borderTopColor: 'rgba(0,0,0,.3)'
		}

		if (props.disabled) {
			Object.assign(box, {
				borderColor: COLORS.black4,
				borderTopColor: COLORS.black4,
				background: COLORS.black5
			})
		}

		if (state.focused) {
			Object.assign(box, {
				borderColor: COLORS.blue,
				borderTopColor: COLORS.blue,
				boxShadow: `0 0 0 1px ${COLORS.blue}`
			})
		}

		let checkmark = {
			position: 'absolute',
			width: '100%',
			height: '100%',
			fill: COLORS.black1,
			opacity: props.value ? 1 : 0,
			transition: `opacity 0.25s ${TRANSITIONS.strongEaseOut}`
			//transition: `opacity 0.25s ${TRANSITIONS.easeInStrongEaseOut}`
		}

		return {root, icon, box, checkmark, label}
	}

	renderContainer() {
		let icon = React.DOM.div({style: this.styles.icon}, [
			React.DOM.div({style: this.styles.box}),
			React.DOM.div({style: this.styles.checkmark},
				React.createElement(Icon, {icon: checkmarkIcon})
			)
		])

		let label
		if (this.props.children) {
			label = React.DOM.div({style: this.styles.label}, this.props.children)
		}

		return React.DOM.div({style: this.styles.root}, [icon, label])
	}
}
