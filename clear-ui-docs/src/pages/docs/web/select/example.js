import React from 'react'
import Select from 'clear-ui-web/lib/select'
import {MenuItem} from 'clear-ui-web/lib/menu'

export default class SelectExample extends React.Component {
	constructor() {
		super()
		this.state = {}
	}

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
				{' '}
				<Select disabled={true} label='disabled select'>
					<MenuItem value='1'>First menu item</MenuItem>
					<MenuItem value='2'>Second menu item</MenuItem>
				</Select>
			</div>
		)
	}
}
