import React from 'react'
import Dialog from 'clear-ui-material/lib/dialog'
import FlatButton from 'clear-ui-material/lib/button/flatButton'

export default class CustomizableDialogExample extends React.Component {
	static defaultProps = {
		buttonText: 'Open dialog'
	}

	state = {}

	render() {
		let header = 'Dialog header'
		let content = 'Dialog content'
		let actions = [
			<FlatButton primary={true} onTap={() => { this.setState({open: false}) }}>
				Cancel
			</FlatButton>,
			<FlatButton accent={true} onTap={() => { this.setState({open: false}) }}>
				OK
			</FlatButton>
		]

		return <span>
			<FlatButton onTap={() => { this.setState({open: true}) }}>
				{this.props.buttonText}
			</FlatButton>
			<Dialog
				header={header}
				actions={actions}
				open={this.state.open}
				onClose={(value) => { this.setState({open: false}) }}
				{...this.props}
			>
				{content}
			</Dialog>
		</span>
	}
}

