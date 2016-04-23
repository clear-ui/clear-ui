import React from 'react'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import BaseDropdownMenu from 'clear-ui-base/lib/dropdownMenu'
import Menu from '../menu'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import SHADOWS from '../styles/shadows'
import ThemeMixin from '../themeMixin'

@mixinDecorator(ThemeMixin)
class DropdownMenu extends BaseDropdownMenu {
	static defaultProps = {
		...BaseDropdownMenu.defaultProps,
		listOffset: 16
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
		let oppositeSide = (this.props.expandSide === 'left') ? 'right' : 'left'
		let oppositeVertSide = (this.props.vertSide === 'bottom') ? 'top' : 'bottom'
		let vOffset = -8
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

	calcListWidth() {
		const padding = this.props.desktop ? 24 : 16
		let {width, minWidth} = super.calcListWidth()
		if (width) width += padding * 2
		minWidth += padding * 2
		return {width, minWidth}
	}
}

export default DropdownMenu
