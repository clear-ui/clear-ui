import React from 'react'

import BaseCheckbox from 'clear-ui-base/lib/checkbox'
import Icon from 'clear-ui-base/lib/icon'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'
import MaterialSwitch from '../switch/materialSwitch'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'

import checkboxIcon from './checkbox.icon.svg'
import checkboxOutlineIcon from './checkboxOutline.icon.svg'

function getCheckboxSwitchStyles(props, state) {
	let icon = {
		width: 24,
		height: 24,
		position: 'absolute',
		left: 0,
		right: 0,
		opacity: 1,
		transition: `all .4s ${TRANSITIONS.strongEaseOut}`
	}

	let outline = {...icon}
	let checkmark = {...icon}

	if (!props.isSwitched) {
		checkmark.opacity = 0
		checkmark.transform = 'scale(0)'
	}

	if (props.disabled && props.isSwitched) outline.display = 'none'

	let fill = props.disabled ?
		state.theme.disabled :
		(props.isSwitched ? state.theme.primary : state.theme.text)

	outline.fill = fill
	checkmark.fill = fill

	return {outline, checkmark}
}

class CheckboxSwitch extends MaterialSwitch {
	static styles = composeStyles(MaterialSwitch.styles, getCheckboxSwitchStyles)

	renderSwitchElement() {
		return [
			<div style={this.styles.outline}>
				<Icon icon={checkboxOutlineIcon}/>
			</div>,
			<div style={this.styles.checkmark}>
				<Icon icon={checkboxIcon}/>
			</div>
		]
	}
}

class Checkbox extends BaseCheckbox {
	static childComponents = {
		'switch': <CheckboxSwitch/>
	}
}

export default Checkbox
