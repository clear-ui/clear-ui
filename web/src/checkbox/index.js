import React from 'react'

import BaseCheckbox from 'clear-ui-base/lib/checkbox'
import Icon from 'clear-ui-base/lib/icon'
import COLORS from '../styles/colors'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'
import Switch from '../switch'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'

import checkmarkIcon from './checkmark.icon.svg'

function getCheckboxSwitchStyles(props, state) {
	let outline = {
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
		Object.assign(outline, {
			borderColor: COLORS.black4,
			borderTopColor: COLORS.black4,
			background: COLORS.black5
		})
	}

	if (state.focused) {
		Object.assign(outline, {
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
		opacity: props.isSwitched ? 1 : 0,
		transition: `opacity 0.25s ${TRANSITIONS.strongEaseOut}`
	}

	return {outline, checkmark}
}

class CheckboxSwitch extends Switch {
	static styles = composeStyles(Switch.styles, getCheckboxSwitchStyles)

	renderSwitchElement() {
		return [
			React.DOM.div({style: this.styles.outline}),
			React.DOM.div({style: this.styles.checkmark},
				React.createElement(Icon, {icon: checkmarkIcon})
			)
		]
	}
}

export default class Checkbox extends BaseCheckbox {
	static propTypes = {
		...BaseCheckbox.propTypes,

		height: React.PropTypes.oneOf(['small', 'default', 'big']),

		padding: React.PropTypes.oneOf(['small', 'default', 'big'])
	}

	static defaultProps = {
		height: 'default',
		padding: 'default'
	}

	static childComponents = {
		'switch': <CheckboxSwitch/>
	}
}
