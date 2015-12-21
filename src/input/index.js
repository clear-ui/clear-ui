import React from 'react'

import BaseInput from 'clear-ui-base/lib/input'
import COLORS from '../styles/colors'
import SIZES from '../styles/sizes'

const PADDINGS = {
	small: 0.5,
	default: 0.75,
	big: 1
}

const ICON_SIZE = 1.5

function getStyles(props, state) {
	const padding = PADDINGS[props.height]

	let root = {
		cursor: 'text',
		display: 'inline-block',
		position: 'relative',
		verticalAlign: 0,
		width: '10rem'
	}

	let input = {
		fontFamily: 'inherit',
		backgroundClip: 'padding-box, border-box',
		backgroundOrigin: 'padding-box, border-box',
		boxSizing: 'border-box',
		width: '100%',
		margin: 0,
		background: 'white',
		border: '1px solid rgba(0,0,0,.15)',
		borderTop: '1px solid rgba(0,0,0,.3)',
		// for ios
		WebkitAppearance: 'none',
		borderRadius: 0
		//TODO for ie
		//&::-ms-clear { display: none; }
	}

	let placeholder = {
		position: 'absolute',
		top: 0,
		padding: '0 0.5rem',
		marginLeft: '1px',
		marginTop: '1px', // I dont know why it is needed to align placeholder precisely.
		color: COLORS.black3,
		transition: 'color .25s',
		cursor: 'text',
		userSelect: 'none'
	}

	let leftIcon, rightIcon

	const sizeStyles = {
		fontSize: SIZES[props.height].fontSize + 'rem',
		height: props.multiline ? (SIZES[props.height].height + 'rem') : 'auto',
		lineHeight: SIZES[props.height].height + 'rem',
		padding: `0 ${padding + 'rem'}`
	}
	Object.assign(input, sizeStyles)
	Object.assign(placeholder, sizeStyles)

	if (props.disabled) {
		Object.assign(input, {
			background: COLORS.black5,
			color: COLORS.black2,
			boxShadow: 'none',
			border: `1px solid ${COLORS.black4}`,
			borderTop: `1px solid ${COLORS.black4}`,
			//for ios
			opacity: 1,
			WebkitTextFillColor: COLORS.black2
		})
		placeholder.cursor = 'default'
	}

	const outlineColor = props.invalid ? COLORS.red : COLORS.blue
	const borderStyle = {
		border: `1px solid ${outlineColor}`,
		borderTop: `1px solid ${outlineColor}`
	}
	if (state.focused) {
		Object.assign(input, borderStyle)
		input.outline = `${outlineColor} solid 1px`
		input.outlineOffset = 0
	} else {
		if (props.invalid) {
			Object.assign(input, borderStyle)
			input.background = '#fff0f0'
		}
	}

	if (props.leftIcon || props.rightIcon) {
		const paddingBeforeIcon = 0.8 * padding
		const paddingAfterIcon = 0.4 * padding
		const paddingWithIcon = ICON_SIZE + paddingBeforeIcon + paddingAfterIcon
		const icon = {
			position: 'absolute',
			top: '50%',
			//borderRadius: 50%;
			color: COLORS.black3,
			fill:  COLORS.black3,
			width: ICON_SIZE + 'rem',
			height: ICON_SIZE + 'rem',
			marginTop: (-1 * ICON_SIZE / 2) + 'rem'
		}

		if (props.leftIcon) {
			input.paddingLeft = paddingWithIcon + 'rem'
			placeholder.paddingLeft = paddingWithIcon + 'rem'
			leftIcon = {...icon, left: paddingBeforeIcon + 'rem'}
		}
		if (props.rightIcon) {
			input.paddingRight = paddingWithIcon + 'rem'
			placeholder.paddingRight = paddingWithIcon + 'rem'
			rightIcon = {...icon, right: paddingBeforeIcon + 'rem'}
		}
	}

	return {root, input, placeholder, leftIcon, rightIcon}
}

/**
 * @param {string} [props.height='default'] Height of the input.
 *     Possible values: 'small', 'default', and 'big'.
 * @param {} [props.placeholder] -
 * @param {} [props.leftIcon] -
 * @param {} [props.rightIcon] -
 * @param {function} [props.onRightIconClick] -
 */
export default class Input extends BaseInput {
	static defaultProps = {
		...BaseInput.defaultProps,
		height: 'default'
	}

	static styles = getStyles

	render() {
		let elem = super.render()

		let leftIcon, rightIcon

		if (this.props.leftIcon) {
			leftIcon = React.DOM.div({style: this.styles.leftIcon}, this.props.leftIcon)
		}

		if (this.props.rightIcon) {
			rightIcon = React.DOM.div({
				style: this.styles.rightIcon,
				onClick: this.props.onRightIconClick
			}, this.props.rightIcon)
		}

		let placeholder
		if (this.props.placeholder && !this.state.value) {
			placeholder = React.DOM.div({
				style: this.styles.placeholder,
				onClick: this.focus.bind(this)
			}, this.props.placeholder)
		}

		return React.cloneElement(elem, null, [
			elem.props.children,
			placeholder, leftIcon, rightIcon
		])
	}
}
