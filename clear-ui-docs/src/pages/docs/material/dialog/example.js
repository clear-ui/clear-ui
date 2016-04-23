import React from 'react'
import Dialog from 'clear-ui-material/lib/dialog'
import FlatButton from 'clear-ui-material/lib/button/flatButton'

export default class DialogExample extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		let header = 'Dialog header'
		let actions = [
			<FlatButton primary={true} onTap={() => { this.setState({open: false}) }}>
				Cancel</FlatButton>,
			<FlatButton accent={true} onTap={() => { this.setState({open: false}) }}>
				OK</FlatButton>
		]

		return <div>
			<FlatButton onTap={() => { this.setState({open: true}) }}>
				Open dialog</FlatButton>
			<Dialog header={header} actions={actions} open={this.state.open}
				onClose={(value) => { this.setState({open: false}) }}
			>
				Dialog content
			</Dialog>
		</div>
	}
}
