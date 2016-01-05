import React from 'react'

import Dropdown from './index'
import Button from '../button/raisedButton'
import Icon from 'clear-ui-base/lib/icon'

class ButtonDropdown extends Dropdown {
	static propTypes = {
		/** Button element */
		trigger: React.PropTypes.element
	}

	getTrigger() {
		return React.cloneElement(this.props.trigger, {
			//height, fullWidth, disabled, icon?
			state: {
				state: this.state.open ? 'active' : this.state.buttonState
			},
			onChangeState: {
				state: (state) => { this.setState({buttonState: state}) }
			},
			onTap: () => { this.setManagedState({open: true}) },
			rightIcon: React.createElement(Icon, {icon: Icon.ICONS.triangleDown})
		})
	}
}

export default ButtonDropdown
