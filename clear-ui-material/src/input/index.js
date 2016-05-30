import React from 'react'

import BaseInput from 'clear-ui-base/lib/input'
import ThemeMixin from '../themes/themeMixin'
import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'

function getStyles(props, state) {
	const iconSize = 24
	const lineHeight = 24
	const paddingWithIcon = 36
	const fontSize = props.dense ? 13 : 16
	const vertPadding = props.dense ? 12 : 16
	const labelHeight = 16
	const labelBottomMargin = props.dense ? 4 : 8
	const heightAboveInput = (
		props.label && (props.labelType === 'auto' || props.labelType === 'floating')
	) ? (vertPadding + labelHeight + labelBottomMargin) : vertPadding
	const inputHeight = props.multiline ? (lineHeight * state.rows) : lineHeight
	const height = heightAboveInput + inputHeight + vertPadding - 8

	let root = {
		height,
		position: 'relative',
		width: 256,
		WebkitTapHighlightColor: 'rgba(0,0,0,0)' // mobile
	}

	let input = {
		position: 'absolute',
		top: heightAboveInput - 4,
		width: '100%',
		height: inputHeight,
		lineHeight: lineHeight + 'px',
		padding: 0,
		border: 'none',
		outline: 'none',
		backgroundColor: 'transparent',
		color: props.disabled ? state.theme.disabled : state.theme.text,
		fontFamily: 'inherit',
		fontSize,
		resize: 'none'
	}

	let label = {
		fontSize,
		height: inputHeight,
		lineHeight: lineHeight + 'px',
		marginTop: -4,
		color: state.theme.disabled,
		position: 'absolute',
		opacity: 1,
		zIndex: 1,
		transition:
			`all .4s ${TRANSITIONS.easeInStrongEaseOut},` +
			`opacity .4s ${TRANSITIONS.strongEaseOut}`
	}

	if (props.labelType === 'floating' || props.labelType === 'auto') {
		if (props.labelType === 'floating' || state.focused || state.value) {
			Object.assign(label, {
				top: vertPadding,
				fontSize: 12,
				color: state.focused ? state.theme.primary : state.theme.secondary,
				cursor: 'default'
			})
		} else {
			Object.assign(label, {
				top: heightAboveInput,
				cursor: 'text'
			})
		}
	} else {
		Object.assign(label, {
			top: heightAboveInput,
			cursor: 'text'
		})
		if (state.value) label.opacity = 0
	}

	let underline = {
		position: 'absolute',
		bottom: vertPadding - 8,
		left: 0,
		right: 0,
		transition: `all .4s ${TRANSITIONS.strongEaseOut}`
	}

	if (props.disabled) {
		underline.borderBottom = `2px dotted ${state.theme.dividers}`
	} else {
		underline.borderBottom = `1px solid ${state.theme.dividers}`
	}

	let underlineFill = {
		...underline,
		transform: 'scaleX(0)',
		transition: 'transform 0.25s',
		borderBottom: `2px solid ${state.theme.primary}`
	}
	if (state.focused) {
		underlineFill.transform = 'scaleX(1)'
	}

	let icon
	if (props.icon) {
		input.left = paddingWithIcon
		label.left = paddingWithIcon
		underline.left = paddingWithIcon
		underlineFill.left = paddingWithIcon

		icon = {
			position: 'absolute',
			top: '50%',
			marginTop: -iconSize / 2,
			width: iconSize,
			height: iconSize,
			transition: 'fill 0.25s, color 0.25s'
		}

		let iconColor
		if (props.disabled) iconColor = state.theme.disabled
		else if (state.focused) iconColor = state.theme.primary
		else iconColor = state.theme.secondary

		icon.color = iconColor
		icon.fill = iconColor
	}

	return {root, input, label, icon, underline, underlineFill}
}

@mixin(ThemeMixin)
export default class Input extends BaseInput {
	static propTypes = {
		...BaseInput.propTypes,

		/** Smaller size of the input. */
		dense: React.PropTypes.bool,

		/** Label of the input. */
		label: React.PropTypes.node,

		/**
		 * Type of the label.
		 * - `floating` - The label always floats above the input.
		 * - `inline` - The label is displayed in the place of the input's value.
		 * - `auto` - Type of the label is chosen automatically.
		 *     When the input is empty, label is inline, and
		 *     when input is focused or has value, label becomes floating.
		 */
		labelType: React.PropTypes.oneOf(['floating', 'inline', 'auto']),

		/** Icon on the left side of the input. */
		icon: React.PropTypes.node,

		/** TODO */
		error: React.PropTypes.node,

		/** TODO */
		underlineAnimation: React.PropTypes.bool
	}

	static defaultProps = {
		...BaseInput.defaultProps,
		labelType: 'auto'
	}

	static styles = getStyles

	render() {
		let elem = super.render()
		let icon = this.props.icon &&
			React.DOM.div({style: this.styles.icon}, this.props.icon)
		let label = this.props.label && React.DOM.div({
			style: this.styles.label,
			onClick: this.focus.bind(this)
		}, this.props.label)
		return React.cloneElement(elem, null, [
			elem.props.children,
			icon,
			label,
			React.DOM.div({style: this.styles.underline}),
			React.DOM.div({style: this.styles.underlineFill})
		])
	}
}
