import React from 'react'

import BaseRadioButton from 'clear-ui-base/lib/radioButtons/radioButton'
import Icon from 'clear-ui-base/lib/icon'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'
import MaterialSwitch from '../switch/materialSwitch'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'

import outlineIcon from './outline.icon.svg'
import dotIcon from './dot.icon.svg'

function getRadioSwitchStyles(props, state) {
	let transition = `all .4s ${TRANSITIONS.strongEaseOut}`

	let color = props.disabled ?
		state.theme.disabled :
		(props.isSwitched ? state.theme.primary : state.theme.text)

	let icon = {
		position: 'absolute',
		width: '100%',
		height: '100%',
		fill: color,
		transition
	}

	let outline = {...icon}
	let dot = {
		...icon,
		opacity: 1
	}
	if (!props.isSwitched) {
		dot.transform = 'scale(0)'
		dot.opacity = 0
	}

	return {outline, dot}
}

class RadioSwitch extends MaterialSwitch {
	static styles = composeStyles(MaterialSwitch.styles, getRadioSwitchStyles)

	renderSwitchElement() {
		return [
			React.DOM.div({style: this.styles.outline},
				React.createElement(Icon, {icon: outlineIcon})),
			React.DOM.div({style: this.styles.dot},
				React.createElement(Icon, {icon: dotIcon})
			)
		]
	}
}

class RadioButton extends BaseRadioButton {
	static childComponents = {
		'switch': <RadioSwitch/>
	}
}

export default RadioButton
