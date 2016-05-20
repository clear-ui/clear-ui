import React from 'react'
import Color from 'color'

import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import COLORS from '../styles/colors'
import Button from './webButton.js'

import {getOuterOutlineStyle, getWhitelineStyle} from './outlineStyles'

function getStyles(props, state) {
	let root = {}
	let label = {}
	let rightIcon = {}
	let leftIcon = {}
	let innerOutline = {}
	let outerOutline = {}

	if (props.disabled) {
		Object.assign(root, {
			background: COLORS.black5,
			color: COLORS.black3,
			fill: COLORS.black3
		})
	} else {
		let colorMod = props.color || 'grey'
		if (colorMod === 'grey') {
			root.color = COLORS.black1
			root.fill = COLORS.black1
			if (state.tapState === 'initial') {
				root.background = COLORS.black4
			} else if (state.tapState === 'hovered') {
				root.background = Color(COLORS.black3).clone().mix(Color(COLORS.black4), 0.66)
			} else if (state.tapState === 'active') {
				root.background = COLORS.black3
			}
		} else {
			let color = COLORS[colorMod]
			root.color = 'white'
			root.fill = 'white'
			if (state.tapState === 'initial') {
				root.background = color
			} else if (state.tapState === 'hovered') {
				root.background = Color(color).clone().mix(Color('black'), 0.90)
			} else if (state.tapState === 'active') {
				root.background = Color(color).clone().mix(Color('black'), 0.75)
			}
			if (state.focused || props.invalid) {
				innerOutline = getWhitelineStyle()
			}
		}

		outerOutline = getOuterOutlineStyle(state.focused, props.invalid)
	}

	return {root, label, rightIcon, leftIcon, innerOutline, outerOutline}
}

export default class FlatButton extends Button {
	static styles = composeStyles(Button.styles, getStyles)
}
