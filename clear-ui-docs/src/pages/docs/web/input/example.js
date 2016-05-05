import React from 'react'
import Input from 'clear-ui-web/lib/input'

export default class InputExample extends React.Component {
	state = {
		value1: 'value',
		value2: '',
		value3: 'disabled',
		value4: 'invalid',
	}

	render() {
		return <div>
			<p>
				<Input value={this.state.value1}
					onChange={(value) => { this.setState({value1: value}) }} />
			</p>
			<p>
				<Input placeholder='placeholder' value={this.state.value2}
					onChange={(value) => { this.setState({value2: value}) }} />
			</p>
			<p>
				<Input disabled value={this.state.value3}
					onChange={(value) => { this.setState({value3: value}) }} />
			</p>
			<p>
				<Input invalid value={this.state.value4}
					onChange={(value) => { this.setState({value4: value}) }} />
			</p>
		</div>
	}
}
