import React from 'react'

import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import BaseIconButton from 'clear-ui-base/lib/button/iconButton'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'
import SIZES from '../styles/sizes'

let ICON_SIZE = 1.5
let PADDING = 1

function getStyles(props, state) {
	let root = {
		position: 'relative',
		display: 'inline-block',
		cursor: 'default',
		userSelect: 'none',
		fontFamily: 'inherit',
		backgroundClip: 'padding-box',
		border: 'none',
		boxSizing: 'border-box',
		padding: `0 ${PADDING}rem`,
		borderRadius: 2,
		outline: 'none',
		boxSizing: 'border-box',
		transition:
			`background-color .4s ${TRANSITIONS.strongEaseOut},` +
			`color .4s ${TRANSITIONS.strongEaseOut}`,
		webkitTapHighlightColor: 'rgba(0,0,0,0)' // mobile
	}

	let label = {
		verticalAlign: 'top',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: 'inline-block',
		height: '100%'
	}

	let leftIcon, rightIcon
	if (props.leftIcon || props.rightIcon) {
		let icon = {
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
			lineHeight: '1rem',
			width: ICON_SIZE + 'rem',
			height: ICON_SIZE + 'rem'
		}

		let paddingBefore = PADDING * 0.6
		let paddingAfter = PADDING * 0.3
		let paddingWithIcon = paddingBefore + ICON_SIZE + paddingAfter

		if (props.leftIcon) {
			root.paddingLeft = paddingWithIcon + 'rem'
			leftIcon = {
				...icon,
				left: paddingBefore + 'rem'
			}
		}

		if (props.rightIcon) {
			root.paddingRight = paddingWithIcon + 'rem'
			rightIcon = {
				...icon,
				right: paddingBefore + 'rem'
			}
		}
	}

	let innerOutline = {}
	let outerOutline = {}

	let size = SIZES[props.height]
	Object.assign(root, {
		fontSize: size.fontSize + 'rem',
		minHeight: size.height + 'rem',
		lineHeight: size.height + 'rem'
	})

	if (props.elastic) {
		root.width = '100%'
		Object.assign(label, {
			display: 'block',
			textAlign: 'center'
		})
	}

	return {root, label, rightIcon, leftIcon, innerOutline, outerOutline}
}

let propTypes = React.PropTypes

export default class Button extends BaseIconButton {
	static defaultProps = {
		...BaseIconButton.defaultProps,
		height: 'default',
		padding: 'default'
	}

	static propTypes = {
		...BaseIconButton.defaultProps,
		height: propTypes.oneOf(Object.keys(SIZES)),
		elastic: propTypes.bool
	}

	static styles = composeStyles(BaseIconButton.styles, getStyles)

	renderContainer() {
		let container = super.renderContainer()
		return React.cloneElement(container, null, [
			container.props.children,
			React.DOM.div({key: 'innerOutline', style: this.styles.innerOutline}),
			React.DOM.div({key: 'outerOutline', style: this.styles.outerOutline})
		])
	}
}
