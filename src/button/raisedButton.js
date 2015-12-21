import React from 'react'
import Color from 'color'

import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import COLORS from '../styles/colors'
import SIZES from '../styles/sizes'
import Button from '../button'

import {getOuterOutlineStyle, getWhitelineStyle} from './outlineStyles'

function getStyles(props, state) {
	let root = {
		border: '1px solid',
		borderColor: 'rgba(0,0,0,.15)',
		borderTopColor: 'rgba(0,0,0,.15)',
		borderBottomColor: 'rgba(0,0,0,.30)',
		lineHeight: `calc(${SIZES[props.height].height}rem - 2px)`
	}

	let label = {}
	let rightIcon = {}
	let leftIcon = {}
	let innerOutline = {}
	let outerOutline = {}

	let stateMod = state.state || 'initial'

	if (props.disabled) {
		Object.assign(root, {
			background: COLORS.black5,
			color: COLORS.black3,
			fill: COLORS.black3,
			borderColor: 'rgba(0,0,0,.15)',
			borderTopColor: 'rgba(0,0,0,.15)',
			borderBottomColor: 'rgba(0,0,0,.15)'
		})
	} else {
		if (stateMod === 'active') {
			Object.assign(root, {
				boxShadow: 'inset 0 3px 5px rgba(0,0,0,.125)',
				borderColor: 'rgba(0,0,0,.15)',
				borderTopColor: 'rgba(0,0,0,.30)',
				borderBottomColor: 'rgba(0,0,0,.15)'
			})
			Object.assign(label, {
				marginTop: 1,
				marginBottom: -1
			})
			leftIcon.marginTop = 1
			rightIcon.marginTop = 1
		}

		let colorMod = props.color || 'grey'
		if (colorMod === 'grey') {
			root.color = COLORS.black1
			root.fill = COLORS.black1
			if (stateMod === 'initial') {
				root.background = COLORS.black5
			} else if (stateMod === 'hovered') {
				root.background = Color(COLORS.black4).clone().mix(Color(COLORS.black5), 0.66)
			} else if (stateMod === 'active') {
				root.background = COLORS.black4
			}
		} else {
			let color = COLORS[colorMod]
			root.color = 'white'
			root.fill = 'white'
			if (stateMod === 'initial') {
				root.background = color
			} else if (stateMod === 'hovered') {
				root.background = Color(color).clone().mix(Color('black'), 0.90)
			} else if (stateMod === 'active') {
				root.background = Color(color).clone().mix(Color('black'), 0.85)
			}
			if (state.focused || props.invalid) {
				innerOutline = getWhitelineStyle()
			}
		}

		outerOutline = getOuterOutlineStyle(state.focused, props.invalid, 1)
	}

	// increase size by border width
	let cs = ['top', 'bottom', 'left', 'right']
	for (let i in cs) {
		let c = cs[i]
		if (innerOutline[c]) innerOutline[c]--
		if (outerOutline[c]) outerOutline[c]--
	}

	return {root, label, rightIcon, leftIcon, innerOutline, outerOutline}
}

export default class RaisedButton extends Button {
	static defaultProps = {
		...Button.defaultProps,
		color: 'grey'
	}

	static propTypes = {
		...Button.propTypes,
		color: React.PropTypes.oneOf(['grey', 'red', 'green', 'blue'])
	}

	static styles = composeStyles(Button.styles, getStyles)
}
