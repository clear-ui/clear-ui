import React from 'react'
import Modal from 'clear-ui-web/lib/modal'
import RaisedButton from 'clear-ui-web/lib/button/raisedButton'

export default class ReusableModalExample extends React.Component {
	static defaultProps = {
		buttonText: 'Open modal'
	}

	state = {}

	render() {
		return <span>
			<RaisedButton onTap={() => { this.setState({open: true}) }}>
				{this.props.buttonText}
			</RaisedButton>
			<Modal
				open={this.state.open}
				onClose={(value) => { this.setState({open: false}) }}
				{...this.props}
			>
				{this.props.children}
			</Modal>
		</span>
	}
}
