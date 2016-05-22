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
		this.state.buttonState = {hovered: false, pressed: false}
	}

	renderTrigger() {
		return React.cloneElement(this.props.trigger, {
			tapState: this.state.open ? {pressed: true, hovered: true} : this.state.buttonState,
			onChangeTapState: (tapState) => { this.setState({buttonState: tapState}) },
			onTap: () => { this.setManagedState({open: true}) },
			rightIcon: React.createElement(Icon, {icon: Icon.ICONS.triangleDown})
		})
	}
}
