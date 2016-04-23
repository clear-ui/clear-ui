import React from 'react'

import BaseTooltip from 'clear-ui-base/lib/tooltip'
import getArrowStyle from 'clear-ui-base/lib/tooltip/getArrowStyle'
import COLORS from '../styles/colors'
import SIZES from '../styles/sizes'
import SHADOWS from '../styles/shadows'
import Icon from 'clear-ui-base/lib/icon'

import arrowIcon from './arrow.icon.svg'

const PADDINGS = {
	small: {horiz: 0.5, vert: 0.375},
	default: {horiz: 0.75, vert: 0.5},
	big: {horiz: 1, vert: 0.75}
}

const ARROW_WIDTH = 1
const ARROW_HEIGHT = 0.5
const ARROW_MARGINS = {
	small: 0.375,
	default: 0.5,
	big: 0.75
}

export default class Tooltip extends BaseTooltip {
	static propTypes = {
		/** Size of the tooltip. */
		size: React.PropTypes.oneOf(['small', 'default', 'big']),

		/** Dark style of the tooltip. */
		dark: React.PropTypes.bool,

		arrow: React.PropTypes.bool,
		offset: React.PropTypes.bool,
		animation: React.PropTypes.bool
	}

	static defaultProps = {
		...BaseTooltip.defaultProps,
		size: 'default',
		arrow: true,
		animation: 'fade',
		offset: 15
	}

	static styles = (props, state) => {
		let vertPadding = PADDINGS[props.size].vert
		let horizPadding = PADDINGS[props.size].horiz
		let fontSize
		if (props.size === 'big') fontSize = SIZES.default.fontSize + 'rem'
		else if (props.size === 'default') fontSize = SIZES.small.fontSize + 'rem'
		else if (props.size === 'small') fontSize = '0.85rem'

		let root = {
			background: 'white',
			position: 'relative',
			boxShadow: SHADOWS[2],
			fontSize,
			padding: `${vertPadding}rem ${horizPadding}rem`
		}

		let arrow
		if (props.arrow) {
			arrow = {
				position: 'absolute',
				overflow: 'hidden',
				...getArrowStyle({
					side: state.side,
					align: props.align,
					height: ARROW_HEIGHT,
					width: ARROW_WIDTH,
					margin: ARROW_MARGINS[props.size],
					unit: 'rem'
				})
			}
		}

		if (props.dark) {
			root.background = COLORS.black1
			root.color = 'white'
		}

		return {root, arrow}
	}

	renderArrow() {
		let arrow = super.renderArrow()

		let iconStyle = {
			position: 'absolute',
			width: ARROW_WIDTH + 'rem',
			height: ARROW_WIDTH + 'rem'
		}

		if (this.state.side === 'top') iconStyle.marginTop = -ARROW_HEIGHT + 'rem'
		if (this.state.side === 'left') iconStyle.marginLeft = -ARROW_HEIGHT + 'rem'

		if (this.props.dark) {
			iconStyle.fill = COLORS.black1
			iconStyle.color = COLORS.black1
		} else {
			iconStyle.fill = 'white'
			iconStyle.color = 'white'
		}

		return React.cloneElement(arrow, null, [
			React.createElement(Icon, {
				icon: arrowIcon,
				styles: {root: iconStyle}
			})
		])
	}

	render() { return super.render() } // for react-docgen
}
