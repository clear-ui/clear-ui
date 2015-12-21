import React from 'react'

import composeChildComponents from
	'clear-ui-base/lib/utils/childComponentsMixin/composeChildComponents'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import mixin from 'clear-ui-base/lib/utils/mixin'
import ThemeMixin from '../themeMixin'
import COLORS from '../styles/colors'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'
import RippleItem from './rippleItem'

const ICON_SIZE = 24

function getStyles(props, state) {
	let itemState = state.rightIconState === 'initial' ? state.itemState : 'initial'

	let transition = `all .4s ${TRANSITIONS.strongEaseOut}`

	let root = {
		cursor: 'pointer',
		transition: 'background 0.25s',
		WebkitTapHighlightColor: 'rgba(0,0,0,0)',
		position: 'relative',
		outline: 'none',
		transition
	}

	let label = {
		color: state.theme.text,
		overflowX: 'hidden',
		transition
	}

	let padding, iconPadding
	if (props.desktop) {
		padding = 24
		iconPadding = 64
		label.fontSize = '15px'
		label.lineHeight = '32px'
	} else {
		padding = 16
		iconPadding = 72
		label.fontSize = '16px'
		label.lineHeight = '48px'
	}

	label.paddingLeft = props.leftIcon ? iconPadding : padding
	label.paddingRight = props.righttIcon ? iconPadding : padding

	if (itemState === 'hovered' || itemState === 'active' || state.focused) {
		root.background = state.theme.hovered
	}

	if (props.disabled) {
		root.cursor = 'default'
		label.color = state.theme.disabled
	} else if (props.selected) {
		label.color = state.theme.accent
	}

	let leftIcon, rightIcon
	if (props.leftIcon || props.rightIcon) {
		let icon = {
			position: 'absolute',
			lineHeight: '1rem',
			color: state.theme.secondary,
			fill: state.theme.secondary,
			transition: 'all 0.15s',
			top: '50%',
			transform: 'translateY(-50%)',
			width: ICON_SIZE,
			height: ICON_SIZE,
			transition
		}

		if (props.disabled) {
			icon.color = state.theme.disabled
			icon.fill = state.theme.disabled
		} else if (props.selected) {
			let color = state.theme.primary
			icon.color = color
			icon.fill = color
		}
		if (props.leftIcon) leftIcon = {...icon, left: padding}
		if (props.rightIcon) rightIcon = {...icon, right: padding}
	}

	return {root, label, leftIcon, rightIcon}
}

class MenuItem extends RippleItem {
	static contextTypes = {
		clearUiMaterialTheme: React.PropTypes.object
	}

	static styles = composeStyles(RippleItem.styles, getStyles)

	static childComponents = composeChildComponents(
		RippleItem.childComponents,
		{
			ripples: (props, state, defaultRipples) => {
				return React.cloneElement(defaultRipples, {color: state.theme.text})
			}
		}
	)
}

export default mixin(MenuItem, ThemeMixin)
