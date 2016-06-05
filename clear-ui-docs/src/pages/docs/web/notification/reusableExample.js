import React from 'react'
import {Notification} from 'clear-ui-web/lib/notification'
import RaisedButton from 'clear-ui-web/lib/button/raisedButton.js'

export default class ReusableNotificationExample extends React.Component {
	static defaultProps = {
		buttonText: 'Show notification',
		children: 'Notification text'
	}

	state = {}

	render() {
		return <span>
			<RaisedButton onTap={() => { this.setState({open: true}) }}>
				{this.props.buttonText}
			</RaisedButton>
			<Notification
				open={this.state.open}
				onClose={() => { this.setState({open: false}) }}
				{...this.props}
			>
				{this.props.children}
			</Notification>
		</span>
	}
}
