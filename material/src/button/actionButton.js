import React from 'react'
import Color from 'color'

import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import RaisedButton from './raisedButton'

export default class ActionButton extends RaisedButton {
	static styles = composeStyles(
		RaisedButton.styles,
		(props) => {
			let size = props.dense ? 40 : 56
			let root = {
				height: size,
				lineHeight: size + 'px',
				width: size,
				minWidth: undefined,
				padding: 0,
				borderRadius: '50%'
			}
			return {root}
		}
	)
}
