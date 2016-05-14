import React from 'react'
import {RadioGroup, RadioButton} from 'clear-ui-material/lib/radioButtons'

export default class RadioButtonsExample extends React.Component {
	state = {value: '1'}

	render() {
		return (
			<RadioGroup
				value={this.state.value}
				onChange={(value) => { this.setState({value}) }}
			>
				<RadioButton value='1'>First option</RadioButton>
				<RadioButton value='2'>Second option</RadioButton>
				<RadioButton disabled={true} value='3'>Disabled option</RadioButton>
			</RadioGroup>
		)
	}
}
