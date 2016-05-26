import React from 'react'
import Select from 'clear-ui-material/lib/select'
import {MenuItem} from 'clear-ui-material/lib/menu'

export default class SelectExample extends React.Component {
	state = {}

	render() {
		return (
			<div>
				<Select
					value={this.state.value}
					onChange={(value) => { this.setState({value}) }}
				>
					<MenuItem value='1'>First menu item</MenuItem>
					<MenuItem value='2'>Second menu item</MenuItem>
				</Select>
				<br/>
				<Select disabled={true} label='disabled select'>
					<MenuItem value='1'>First menu item</MenuItem>
					<MenuItem value='2'>Second menu item</MenuItem>
				</Select>
			</div>
		)
	}
}
