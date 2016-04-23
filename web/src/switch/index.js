import React from 'react'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import ChildComponentsMixin from 'clear-ui-base/lib/utils/childComponentsMixin'
import BaseSwitch from 'clear-ui-base/lib/switch'
import getIconElementStyle from '../styles/getIconElementStyle'

@mixinDecorator(ChildComponentsMixin)
class Switch extends BaseSwitch {
	static styles = (props) => {
		let {height, padding, multiline} = props
		let styles = getIconElementStyle({
			height, padding, multiline,
			leftIcon: true
		})

		let root = {
			...styles.root,
			outline: 'none',
			cursor: 'default'
		}

		let icon = styles.leftIcon

		let label = styles.label

		return {root, icon, label}
	}

	renderContainer() {
		let icon = React.DOM.div({style: this.styles.icon}, this.renderSwitchElement())

		let label
		if (this.props.children) {
			label = React.DOM.div({style: this.styles.label}, this.props.children)
		}

		return React.DOM.div({style: this.styles.root}, [icon, label])
	}

	/**
	 * @method
	 * @abstract
	 * @returns {node}
	 */
	renderSwitchElement() {
		return new Error('Not implemented')
	}
}

export default Switch
