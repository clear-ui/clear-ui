import React from 'react'
import {Toast, ToastContainer} from 'clear-ui-material/lib/toast'

export default class ToastDemo extends React.Component {
	constructor() {
		super()
		state = {}
	}

	render() {
		return <span>
			<Button onTap={() => { this.setState({open: true}) }}>Show toast</Button>
			<Toast open={this.state.open} onClose={() => { this.setState({open: false}) }}>
				Toast text
			</Toast>
		</span>
	}
}
