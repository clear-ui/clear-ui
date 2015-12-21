import React from 'react'

import Button from './index.js'

export default class IconButton extends Button {
	static propTypes = {
		...Button.propTypes,
		leftIcon: React.PropTypes.node,
		rightIcon: React.PropTypes.node
	}

	renderContainer() {
		let container = super.renderContainer()

		let leftIcon, rightIcon
		if (this.props.leftIcon) {
			leftIcon = React.DOM.div({
				key: 'leftIcon',
				style: this.styles.leftIcon
			}, this.props.leftIcon)
		}
		if (this.props.rightIcon) {
			rightIcon = React.DOM.div({
				key: 'rightIcon',
				style: this.styles.rightIcon
			}, this.props.rightIcon)
		}

		return React.cloneElement(container, null, [
			leftIcon,
			container.props.children,
			rightIcon
		])
	}
}

