import React from 'react'

import Button from './index.js'

/** Button than can have icons at the left and right side. */
export default class IconButton extends Button {
	static propTypes = {
		...Button.propTypes,

		/**
		 * Icon element that appears at the left side of the button.
		 * It can be SVG-icon, font-icon or any arbitrary element.
		 */
		leftIcon: React.PropTypes.node,

		/** Icon element that appears at the right side of the button. */
		rightIcon: React.PropTypes.node,

		/**
		 * Additional styleable elements:
		 * - leftIcon - container of the left icon.
		 * - rightIcon - container of the right icon.
		 */
		//styles: React.PropTypes.object
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

	render() { return super.render() } // for react-docgen
}
