import React from 'react'
import Modal from 'clear-ui-web/lib/modal'
import RaisedButton from 'clear-ui-web/lib/button/raisedButton'
import Input from 'clear-ui-web/lib/input'

export default class ReusableModalExample extends React.Component {
	state = {}

	render() {
		return <span>
			<RaisedButton onTap={() => { this.setState({open: true}) }}>
				Open modal
			</RaisedButton>
			<Modal
				open={this.state.open}
				onClose={(value) => { this.setState({open: false}) }}
			>
				<h3>Modal</h3>
				Content of the modal
				<br/>
				<br/>
				1 <Input/>
				<br/>
				<br/>
				2 <Input/>
			</Modal>
		</span>
	}
}
