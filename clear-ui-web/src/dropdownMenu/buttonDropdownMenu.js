import React from 'react'

import DropdownMenu from './index'
import Icon from 'clear-ui-base/lib/icon'

export default class ButtonDropdownMenu extends DropdownMenu {
	static propTypes = {
		/** Button element */
		trigger: React.PropTypes.element
	}

	constructor() {
		super()
		if (!this.state) this.state = {}
		this.state.buttonState = 'initial'
	}

	renderTrigger() {
		return React.cloneElement(this.props.trigger, {
			tapState: this.state.open ? 'active' : this.state.buttonState,
			onChangeTapState: (state) => { this.setState({buttonState: state}) },
			onTap: () => { this.setManagedState({open: true}) },
			rightIcon: React.createElement(Icon, {icon: Icon.ICONS.triangleDown})
		})
	}
}
