import React from 'react'
import Checkbox from 'clear-ui-material/lib/checkbox'

export default class CheckboxExample extends React.Component {
	state = {
		value1: false,
		value2: true,
		value3: false,
		value4: true
	}

	render() {
		return <div>
			<Checkbox key='1' value={this.state.value1}
				onChange={(value) => { this.setState({value1: value}) }}>
				Checkbox
			</Checkbox>
			<Checkbox key='2' value={this.state.value2}
				onChange={(value) => { this.setState({value2: value}) }}>
				Checked checkbox
			</Checkbox>
			<Checkbox key='3' value={this.state.value3} disabled={true}
				onChange={(value) => { this.setState({value3: value}) }}>
				Disabled checkbox
			</Checkbox>
			<Checkbox key='4' value={this.state.value4} disabled={true}
				onChange={(value) => { this.setState({value4: value}) }}>
				Checked disabled checkbox
			</Checkbox>
		</div>
	}
}
