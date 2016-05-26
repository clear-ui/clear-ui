import React from 'react'
import Input from 'clear-ui-material/lib/input'

export default class InputExample extends React.Component {
	state = {
		input1: 'value',
		input2: 'disabled',
		input3: ''
	}

	render() {
		return (
			<div>
				<Input value={this.state.input1}
					onChange={(value) => { this.setState({input1: value}) }}/>
				<Input disabled={true} value={this.state.input2}
					onChange={(value) => { this.setState({input2: value}) }}/>
				<Input label='label' value={this.state.input3}
					onChange={(value) => { this.setState({input3: value}) }}/>
			</div>
		)
	}
}
