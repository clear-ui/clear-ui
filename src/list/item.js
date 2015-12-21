import React from 'react'
import Color from 'color'

import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import composeChildComponents from 
	'clear-ui-base/lib/utils/childComponentsMixin/composeChildComponents'
import RippleItem from '../menu/rippleItem'
import COLORS from '../styles/colors'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'
import theme from '../styles/lightTheme'

const ICON_SIZE = 24
const AVATAR_SIZE = 38

function getStyles(props, state) {
	let itemState = state.rightIconState === 'initial' ? state.itemState : 'initial'

	let paddingLeft = (props.leftIcon || props.leftAvatar || props.indent) ? 72 : 16
	let paddingRight = (props.rightIcon || props.rightAvatar)  ? 72 : 16

	let linesNumber = props.secondaryText ?
		(props.secondaryTextLines === 2 ? 3 : 2) :
		1
	
	let paddingTop, paddingBottom
	if (linesNumber === 1) {
		if (props.leftAvatar || props.rightAvatar) {
			paddingTop = 20
			paddingBottom = 20
		} else {
			paddingTop = 16
			paddingBottom = 16
		}
	} else if (linesNumber === 2) {
		paddingTop = 20 
		paddingBottom = 16
	} else if (linesNumber === 3) {
		paddingTop = 16 
		paddingBottom = 16
	}

	let transition = `all .4s ${TRANSITIONS.strongEaseOut}`

	let root = {
		cursor: 'pointer',
		WebkitTapHighlightColor: 'rgba(0,0,0,0)',
		position: 'relative',
		fontSize: '16px',
		outline: 'none',
		transition
	}

	if (itemState === 'hovered' || itemState === 'active' || state.focused) {
		root.background = theme.hovered
	}

	let label = {
		color: theme.text,
		overflowX: 'hidden',
		lineHeight: '16px',
		paddingLeft: paddingLeft,
		paddingRight: paddingRight,
		paddingTop,
		paddingBottom,
		transition
	}

	let secondaryText = {
		fontSize: '14px',
		lineHeight: '18px',
		marginTop: 4,
		color: theme.secondary
	}

	if (props.disabled) {
		label.cursor = 'default'
		label.color = theme.disabled
		secondaryText.color = theme.disabled
	} else if (props.selected) {
		label.color = theme.primary
	}

	let iconOrAvatar = {
		position: 'absolute',
		lineHeight: '1rem',
		color: theme.secondary,
		fill: theme.secondary,
		transition
	}

	if (linesNumber === 3) {
		iconOrAvatar.top = paddingTop
	} else {
		iconOrAvatar.top = '50%'
		iconOrAvatar.transform= 'translateY(-50%)'
	}

	let leftIcon, rightIcon
	if (props.leftIcon || props.rightIcon) {
		let icon = {
			...iconOrAvatar,
			width: ICON_SIZE,
			height: ICON_SIZE
		}

		if (props.disabled) {
			icon.color = theme.disabled
			icon.fill = theme.disabled
		} else if (props.selected) {
			let color = COLORS.blue500
			icon.color = color
			icon.fill = color
		}

		if (props.leftIcon) leftIcon = {...icon, left: 16}

		if (props.rightIcon) {
			rightIcon = {...icon, right: 16}

			if (props.onRightIconClick) {
				Object.assign(rightIcon, {
					padding: 12,
					marginRight: -12,
					borderRadius: '50%',
					zIndex: 1
				})
				if (linesNumber === 3) rightIcon.marginTop = -12
				if (state.rightIconState === 'hovered') {
					rightIcon.background = theme.hovered
				} else if (state.rightIconState === 'active') {
					rightIcon.background = theme.pressed
				}
			}
		}
	}

	let leftAvatar, rightAvatar
	if (props.leftAvatar || props.rightAvatar) {
		let avatar = {
			...iconOrAvatar,
			width: AVATAR_SIZE,
			height: AVATAR_SIZE
		}

		if (props.leftAvatar) leftAvatar = {...avatar, left: 16}
		if (props.rightAvatar) rightAvatar = {...avatar, right: 16}
	}

	return {root, label, secondaryText, leftIcon, rightIcon, leftAvatar, rightAvatar}
}

export default class ListItem extends RippleItem {
	static styles = composeStyles(RippleItem.styles, getStyles)

	renderLabel() {
		let label = super.renderLabel()
		return React.cloneElement(label, null, [
			label.props.children,
			this.props.secondaryText &&
				React.DOM.div({
					key: 'secondaryText',
					style: this.styles.secondaryText
				}, this.props.secondaryText)
		])
	}

	renderContainer() {
		let container = super.renderContainer()

		let rightAvatar
		if (this.props.rightAvatar) {
			rightAvatar = React.DOM.div({
				key: 'rightAvatar',
				style: this.styles.rightAvatar
			}, this.props.rightAvatar)
		}

		let leftAvatar
		if (this.props.leftAvatar) {
			leftAvatar = React.DOM.div({
				key: 'leftAvatar',
				style: this.styles.leftAvatar
			}, this.props.leftAvatar)
		}

		return React.cloneElement(container, null, [
			leftAvatar, rightAvatar, container.props.children
		])
	}
}
