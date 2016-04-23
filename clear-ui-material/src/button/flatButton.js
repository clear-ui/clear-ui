import React from 'react'
import Color from 'color'

import composeChildComponents from
	'clear-ui-base/lib/utils/childComponentsMixin/composeChildComponents'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import MaterialButton from './materialButton'
import COLORS from '../styles/colors'

export default class FlatButton extends MaterialButton {
	static styles = composeStyles(
		MaterialButton.styles,
		(props, state) => {
			let root = {}

			if (props.disabled) {
				root.color = state.theme.disabled
			} else {
				let textColor, hoveredColor, activeColor
				if (props.color || props.primary || props.accent) {
					let color
					if (props.primary) color = state.theme.primary
					else if (props.accent) color = state.theme.accent
					else color = props.color

					textColor = color
					hoveredColor = new Color(color).clone().alpha(0.2)
					activeColor = new Color(color).clone().alpha(0.3)
				} else {
					textColor = state.theme.text
					hoveredColor = state.theme.hovered
					activeColor = state.theme.pressed
				}

				root.color = textColor
				if (state.tapState === 'hovered' || state.focused) {
					root.background = hoveredColor
				} if (state.tapState === 'active') {
					root.background = props.ripples ? hoveredColor : activeColor
				}
			}

			return {root}
		}
	)

	static childComponents = composeChildComponents(
		MaterialButton.childComponents,
		{
			ripples: (props, state, defaultRipples) => {
				let color
				if (props.color) color = COLORS[props.color]
				else if (props.primary) color = state.theme.primary
				else if (props.accent) color = state.theme.accent
				else color = state.theme.text
				return React.cloneElement(defaultRipples, {color})
			}
		}
	)
}
