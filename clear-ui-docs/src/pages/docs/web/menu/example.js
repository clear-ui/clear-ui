import React from 'react'
import Menu, {MenuItem, MenuLabel, MenuDivider} from 'clear-ui-web/lib/menu'
import Button from 'clear-ui-web/lib/button/raisedButton'

export default class MenuExample extends React.Component {
	state = {}

	render() {
		return <div>
			<p>
				<Button onClick={() => { this.setState({active: !this.state.active}) }}>
					{this.state.active ? 'deactivate' : 'activate'}
				</Button>
			</p>
			<Menu active={this.state.active} value={this.state.value}
				onSelect={(item) => { this.setState({value: item.props.value}) }}
			>
				<MenuLabel>Label</MenuLabel>
				<MenuItem value='1' key='1'>Item</MenuItem>
				<MenuItem value='2' key='2'>Second item</MenuItem>
				<MenuDivider/>
				<MenuItem value='3' key='3'>Third item</MenuItem>
				<MenuItem value='4' key='4' disabled={true}>Disabled item</MenuItem>
			</Menu>
		</div>
	}
}
