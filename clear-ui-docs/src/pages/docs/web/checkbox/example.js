import React from 'react'
import Checkbox from 'clear-ui-web/lib/checkbox'

export default class CheckboxExample extends React.Component {
	state = {
		value1: false,
		value2: true,
		value3: false
	}

	render() {
		return <div>
			<Checkbox value={this.state.value1}
				onChange={(value) => { this.setState({value1: value}) }} >
				Checkbox
			</Checkbox>
			<Checkbox value={this.state.value2}
				onChange={(value) => { this.setState({value2: value}) }} >
				Checked checkbox
			</Checkbox>
			<Checkbox disabled value={this.state.value3}
				onChange={(value) => { this.setState({value3: value}) }} >
				Disabled checkbox
			</Checkbox>
		</div>
	}
}
