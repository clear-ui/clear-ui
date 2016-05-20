import React from 'react'

import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import BaseDropdownMenu from 'clear-ui-base/lib/dropdownMenu'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import {Menu} from '../menu'
import SHADOWS from '../styles/shadows'
import ThemeMixin from '../themeMixin'

@mixin(ThemeMixin)
export default class DropdownMenu extends BaseDropdownMenu {
	static defaultProps = {
		...BaseDropdownMenu.defaultProps,
		listOffset: 16,
		animation: 'scale'
	}

	static styles = composeStyles(
		BaseDropdownMenu.styles,
		(props, state) => {
			let list = {
				background: state.theme.background,
				boxShadow: SHADOWS[2],
				borderRadius: 3
			}

			return {list}
		}
	)

	static childComponents = {
		...BaseDropdownMenu.childComponents,
		menu: (props) => {
			return <Menu desktop={props.desktop}/>
		}
	}

	getAttachmentConfig() {
		let oppositeSide = this.props.expandSide === 'left' ? 'right' : 'left'
		let oppositeVertSide = this.props.vertSide === 'bottom' ? 'top' : 'bottom'
		let vOffset = this.props.vertSide === 'top' ? 8 : -8
		let hOffset = this.props.desktop ? -24 : -16
		return {
			attachment: {
				target: `${oppositeSide} ${oppositeVertSide}`,
				element: `${oppositeSide} ${oppositeVertSide}`,
				offset: `${hOffset}px ${vOffset}px`
			},
			constrain: true,
			viewportPadding: 16
		}
	}

	getListWidth() {
		const hOffset = this.props.desktop ? 24 : 16
		let {width, minWidth} = super.getListWidth()
		if (width) width += hOffset * 2
		minWidth += hOffset * 2
		return {width, minWidth}
	}
}
