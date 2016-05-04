import React from 'react'

import BaseSelect from 'clear-ui-base/lib/select'
import Icon from 'clear-ui-base/lib/icon'
import ButtonDropdownMenu from '../dropdownMenu/buttonDropdownMenu'
import RaisedButton from '../button/raisedButton'

export default class Select extends BaseSelect {
	static propTypes = {
		...BaseSelect.propTypes,

		/** Max height of the menu. */
		maxHeight: React.PropTypes.number
	}

	static childComponents = {
		dropdownMenu: (props) => {
			return <ButtonDropdownMenu maxHeight={props.maxHeight}/>
		},
		button: <RaisedButton/>
	}

	renderTrigger() {
		let icon = React.createElement(Icon, {icon: Icon.ICONS.triangleDown})
		return React.cloneElement(this.getChildComponent('button'), {
			rightIcon: icon,
			disabled: this.props.disabled
		}, this.renderTriggerContent())
	}
}
