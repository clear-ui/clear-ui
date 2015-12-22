import React from 'react'
import Color from 'color'

import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import BaseItem from 'clear-ui-base/lib/menu/item'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'
import COLORS from '../styles/colors'
import SIZES from '../styles/sizes'
import getIconElementStyle from '../styles/getIconElementStyle'

const ICON_SIZE = 1.5

export default class Item extends BaseItem {
	static defaultProps = {
		...BaseItem.defaultProps,
		height: 'default',
		padding: 'default'
	}

	static styles = composeStyles(
		BaseItem.styles,
		(props, state) => {
			let {root, label, leftIcon, rightIcon} = getIconElementStyle(props)

			const itemState = state.rightIconState === 'initial' ? state.itemState : 'initial'
			const height = SIZES[props.height].height
			const transition =
				`background-color .4s ${TRANSITIONS.strongEaseOut},` +
				`color .4s ${TRANSITIONS.strongEaseOut},` +
				`fill .4s ${TRANSITIONS.strongEaseOut}`

			root = Object.assign(root, {
				cursor: 'pointer',
				outline: 'none',
				WebkitTapHighlightColor: 'rgba(0,0,0,0)',
				transition
			})

			if (props.selected) root.fontWeight = 'bold'

			if (itemState === 'hovered' || state.focused) {
				root.background = COLORS.black5
			}

			if (itemState === 'active') {
				root.background = Color(COLORS.black5).clone().mix(Color('black'), 0.95)
			}

			if (props.leftIcon) {
				leftIcon.color = COLORS.black2
				leftIcon.fill = COLORS.black2
				leftIcon.transition = transition
			} else if (props.rightIcon) {
				rightIcon.color = COLORS.black2
				rightIcon.fill = COLORS.black2
				rightIcon.transition = transition
				if (props.onRightIconClick) {
					let rightIconPadding = (height - ICON_SIZE) / 2
					rightIcon = {
						...rightIcon,
						borderRadius: '50%',
						padding: rightIconPadding + 'rem',
						marginTop: -rightIconPadding + 'rem',
						marginRight: -rightIconPadding + 'rem'
					}
					if (state.rightIconState === 'hovered') {
						rightIcon.background = COLORS.black5
					} else if (state.rightIconState === 'active') {
						rightIcon.background = COLORS.black4
					}
				}
			}

			if (props.disabled) {
				root.color = COLORS.black3
				root.cursor = 'default'
				if (props.leftIcon) {
					leftIcon.color = COLORS.black3,
					leftIcon.fill = COLORS.black3
				} else if (props.rightIcon) {
					rightIcon.color = COLORS.black3,
					rightIcon.fill = COLORS.black3
				}
			}

			return {root, label, leftIcon, rightIcon}
		}
	)
}
