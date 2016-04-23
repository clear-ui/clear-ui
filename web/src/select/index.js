import React from 'react'

import BaseSelect from 'clear-ui-base/lib/select'
import Icon from 'clear-ui-base/lib/icon'
import DropdownMenu from '../dropdownMenu'
import RaisedButton from '../button/raisedButton'

class Select extends BaseSelect {
	static propTypes = {
		...BaseSelect.propTypes,

		/** Max height of the menu. */
		maxHeight: React.PropTypes.number
	}

	static childComponents = {
		dropdownMenu: (props) => {
			return <DropdownMenu
				maxHeight={props.maxHeight}
				tappable={true}
			/>
		}
	}

	renderTrigger() {
		let icon = React.createElement(Icon, {icon: Icon.ICONS.triangleDown})
		return (
			<RaisedButton
				rightIcon={icon}
				disabled={this.props.disabled}
			>
				{this.renderTriggerContent()}
			</RaisedButton>
		)
	}
}

export default Select
