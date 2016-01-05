import React from 'react'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import BaseDropdown from 'clear-ui-base/lib/dropdown'
import Icon from 'clear-ui-base/lib/icon'
import Menu from '../menu'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import SHADOWS from '../styles/shadows'
import ThemeMixin from '../themeMixin'

@mixinDecorator(ThemeMixin)
class Dropdown extends BaseDropdown {
	static styles = composeStyles(
		BaseDropdown.styles,
		(props, state) => {
			let padding = props.desktop ? 24 : 16

			let trigger = {
				fontSize: props.desktop ? 15 : 16,
				lineHeight: '48px',
				cursor: 'pointer',
				position: 'relative',
				paddingLeft: padding,
				paddingRight: padding + 24
			}

			let underline = {
				position: 'absolute',
				left: padding,
				right: padding,
				bottom: 8,
				height: 1,
				background: '#ccc',
			}

			let triangleIcon = {
				position: 'absolute',
				width: 24,
				height: 24,
				right: padding,
				top: 12,
				color: state.theme.secondary,
				fill: state.theme.secondary,
			}

			let list = {
				background: state.theme.background,
				boxShadow: SHADOWS[2],
				borderRadius: 3
			}

			return {trigger, underline, triangleIcon, list}
		}
	)

	getAttachmentPoint() {
		let oppositeSide = (this.props.expandSide === 'left') ? 'right' : 'left'
		let oppositeVertSide = (this.props.vertSide === 'bottom') ? 'top' : 'bottom'
		let offset = 8
		return {
			target: `${oppositeSide} ${oppositeVertSide}`,
			element: `${oppositeSide} ${oppositeVertSide}`,
			offset: `0 ${-offset}px`
		}
	}

	getMenu() {
		return <Menu desktop={this.props.desktop}/>
	}

	getTrigger() {
		let defaultTrigger = super.getTrigger()
		return React.cloneElement(defaultTrigger, null, [
			defaultTrigger.props.children,
			React.DOM.div({style: this.styles.underline}),
			React.DOM.div({style: this.styles.triangleIcon},
				React.createElement(Icon, {icon: Icon.ICONS.triangleDown})
			)
		])
	}
}

export default Dropdown
