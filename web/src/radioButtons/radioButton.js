import React from 'react'

import BaseRadioButton from 'clear-ui-base/lib/radioButtons/radioButton'
import Icon from 'clear-ui-base/lib/icon'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import COLORS from '../styles/colors'
import Switch from '../switch'

import dotIcon from './dot.icon.svg'

function getRadioSwitchStyles(props, state) {
	let circle = {
		position: 'absolute',
		width: '75%',
		height: '75%',
		top: '12.5%',
		left: '12.5%',
		boxSizing: 'border-box',
		background: 'white',
		border: '1px solid',
		borderColor: 'rgba(0,0,0,.15)',
		borderRadius: '50%'
	}

	if (props.disabled) {
		Object.assign(circle, {
			borderColor: COLORS.black4,
			background: COLORS.black5
		})
	}

	if (state.focused) {
		Object.assign(circle, {
			borderColor: COLORS.blue,
			boxShadow: `0 0 0 1px ${COLORS.blue}`
		})
	}

	let dot = {
		position: 'absolute',
		width: '100%',
		height: '100%',
		fill: COLORS.black1,
		transform: `scale(${props.selected ? 1 : 0})`,
		transition: `transform 0.4s ${TRANSITIONS.strongEaseOut}`
	}

	return {circle, dot}
}

class RadioSwitch extends Switch {
	static styles = composeStyles(Switch.styles, getRadioSwitchStyles)

	renderSwitchElement() {
		return [
			React.DOM.div({style: this.styles.circle}),
			React.DOM.div({style: this.styles.dot},
				React.createElement(Icon, {icon: dotIcon})
			)
		]
	}
}

class RadioButton extends BaseRadioButton {
	static defaultProps = {
		...BaseRadioButton.defaultProps,
		height: 'default',
		padding: 'default'
	}

	static childComponents = {
		'switch': <RadioSwitch/>
	}
}

export default RadioButton
