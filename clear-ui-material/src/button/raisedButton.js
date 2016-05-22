import React from 'react'
import Color from 'color'

import composeChildComponents from
	'clear-ui-base/lib/utils/childComponentsMixin/composeChildComponents'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import MaterialButton from './materialButton'
import COLORS from '../styles/colors'
import SHADOWS from '../styles/shadows'

export default class RaisedButton extends MaterialButton {
	static styles = composeStyles(
		MaterialButton.styles,
		(props, state) => {
			let root = {}

			if (props.disabled) {
				root.color = state.theme.disabled
				root.background = 'rgba(0, 0, 0, 0.12)'
			} else {
				let initialColor, activeColor, textColor
				if (props.color || props.primary || props.accent) {
					let color
					if (props.color) color = Color(props.color)
					else if (props.primary) color = Color(state.theme.primary)
					else if (props.accent) color = Color(state.theme.accent)
					textColor = color.luminosity() < 0.3 ? 'white' : 'black' // TODO value
					initialColor = color
					activeColor = initialColor.clone().mix(Color('white'), 0.6)
				} else {
					textColor = state.theme.text
					initialColor = state.theme.hovered
					activeColor = state.theme.pressed
				}

				root.color = textColor
				if (state.tapState.pressed) {
					root.background = props.ripples ? initialColor : activeColor
					root.boxShadow = SHADOWS[8]
				} else if (state.tapState.hovered) {
					root.background = initialColor
					root.boxShadow = SHADOWS[8]
				} else {
					root.background = initialColor
					root.boxShadow = SHADOWS[2]
				} 
				if (state.focused) root.boxShadow = SHADOWS[8]
			}
			
			return {root}
		}
	)

	static childComponents = composeChildComponents(
		MaterialButton.childComponents,
		{
			ripples: (props, state, defaultRipples) => {
				let color, opacity
				if (props.color || props.primary || props.accent) {
					color = 'white'
					opacity = 0.4
				} else {
					color = state.theme.text
					opacity = 0.16
				}
				return React.cloneElement(defaultRipples, {color, opacity})
			}
		}
	)
}
