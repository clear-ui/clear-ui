import React from 'react'
import {Snackbar} from 'clear-ui-material/lib/snackbar'
import RaisedButton from 'clear-ui-material/lib/button/raisedButton'

export default class ReusableSnackbarExample extends React.Component {
	static defaultProps = {
		buttonText: 'Show snackbar',
		children: 'Snackbar text'
	}

	state = {}

	render() {
		return <span>
			<RaisedButton onTap={() => { this.setState({open: true}) }}>
				{this.props.buttonText}
			</RaisedButton>
			<Snackbar
				open={this.state.open}
				onClose={() => { this.setState({open: false}) }}
				{...this.props}
			>
				{this.props.children}
			</Snackbar>
		</span>
	}
}
