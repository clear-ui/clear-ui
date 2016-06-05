import React from 'react'
import {Toast, ToastContainer} from 'clear-ui-material/lib/toast'
import RaisedButton from 'clear-ui-material/lib/button/raisedButton'

export default class ToastExample extends React.Component {
	state = {}

	render() {
		return <span>
			<RaisedButton onTap={() => { this.setState({open: true}) }}>
				Show toast
			</RaisedButton>
			<ToastContainer>
				<Toast
					open={this.state.open}
					onClose={() => { this.setState({open: false}) }}
				>
					Toast text
				</Toast>
			</ToastContainer>
		</span>
	}
}
