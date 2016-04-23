import React from 'react'

import {Notification as BaseNotification} from 'clear-ui-base/lib/notification'

import COLORS from '../styles/colors'
import SHADOWS from '../styles/shadows'
import SIZES from '../styles/sizes'

const PADDINGS = {
	small: {horiz: 0.5, vert: 0.375},
	default: {horiz: 0.75, vert: 0.5},
	big: {horiz: 1, vert: 0.75}
}

const MARGIN = '1rem'

export default class Notification extends BaseNotification {
	static propTypes = {
		...BaseNotification.propTypes,

		/** Size of the notification. */
		size: React.PropTypes.oneOf(['small', 'default', 'big']),

		/** Dark style of the notification. */
		dark: React.PropTypes.bool,

		/** TODO */
		actions: React.PropTypes.node,

		/** TODO */
		showCloseButton: React.PropTypes.bool
	}

	static defaultProps = {
		...BaseNotification.defaultProps,
		size: 'default'
	}

	static styles = (props) => {
		let vertPadding = PADDINGS[props.size].vert
		let horizPadding = PADDINGS[props.size].horiz

		let fontSize
		if (props.size === 'big') fontSize = SIZES.default.fontSize + 'rem'
		else if (props.size === 'default') fontSize = SIZES.small.fontSize + 'rem'
		else if (props.size === 'small') fontSize = '0.85rem'

		let root = {
			background: 'white',
			boxShadow: SHADOWS[2],
			padding: `${vertPadding}rem ${horizPadding}rem`,
			borderRadius: 2,
			fontSize
		}

		if (props.containerHorizPos === 'left') root.marginLeft = MARGIN
		else root.marginRight = MARGIN

		if (props.containerVertPos === 'top') root.marginTop = MARGIN
		else root.marginBottom = MARGIN

		if (props.dark) {
			root.background = COLORS.black1
			root.color = 'white'
		}

		return {root}
	}

	render() { return super.render() } // for react-docgen
}
