import React from 'react'
import {Menu, MenuItem} from 'clear-ui-material/lib/menu'

export default class MenuExample extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: '1'}
	}

	render() {
		return (
			<div style={{width: 300}}>
				<Menu
					value={this.state.value}
					onSelect={(item) => { this.setState({value: item.props.value}) }}
				>
					<MenuItem value='1'>First item</MenuItem>
					<MenuItem value='2'>Second item</MenuItem>
					<MenuItem value='3'>Third item</MenuItem>
					<MenuItem value='4' disabled={true}>Disabled item</MenuItem>
				</Menu>
			</div>
		)
	}
}
