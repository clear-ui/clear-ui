import React from 'react'
import {Toast} from 'clear-ui-material/lib/toast'
import RaisedButton from 'clear-ui-material/lib/button/raisedButton'

export default class ReusableToastExample extends React.Component {
	static defaultProps = {
		buttonText: 'Show toast',
		children: 'Toast text'
	}

	state = {}

	render() {
		return <span>
			<RaisedButton onTap={() => { this.setState({open: true}) }}>
				{this.props.buttonText}
			</RaisedButton>
			<Toast
				open={this.state.open}
				onClose={() => { this.setState({open: false}) }}
				{...this.props}
			>
				{this.props.children}
			</Toast>
		</span>
	}
}
