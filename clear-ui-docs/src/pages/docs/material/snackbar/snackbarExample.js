import React from 'react'
import {Snackbar, SnackbarContainer} from 'clear-ui-material/lib/snackbar'
import RaisedButton from 'clear-ui-material/lib/button/raisedButton'

export default class SnackbarExample extends React.Component {
	state = {}

	render() {
		return <span>
			<RaisedButton onTap={() => { this.setState({open: true}) }}>
				Show snackbar
			</RaisedButton>
			<SnackbarContainer>
				<Snackbar
					open={this.state.open}
					onClose={() => { this.setState({open: false}) }}
				>
					Snackbar text
				</Snackbar>
			</SnackbarContainer>
		</span>
	}
}
