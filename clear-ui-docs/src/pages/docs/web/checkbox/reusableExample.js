import React from 'react'
import Checkbox from 'clear-ui-web/lib/checkbox'

export default class AbstractCheckboxExample extends React.Component {
	state = {value: this.props.value}

	render() {
		return (
			<Checkbox
				value={this.state.value}
				onChange={(value) => { this.setState({value}) }}
				{...this.props}
			>
				{this.props.children}
			</Checkbox>
		)
	}
}
