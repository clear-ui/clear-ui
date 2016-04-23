import React from 'react'
import TreeMenu, {TreeMenuItem, TreeMenuHeader, TreeMenuGroup, TreeMenuSubMenu}
	from 'clear-ui-web/lib/treeMenu'

export default class TreeMenuExample extends React.Component {
	constructor() {
		super()
		this.state = {value: '1'}
	}

	render() {
		let menu = (
			<TreeMenu value={this.state.value}
				onSelect={(value) => { this.setState({value}) }}
			>
				<TreeMenuItem value='1'>1</TreeMenuItem>
				<TreeMenuGroup>
					<TreeMenuItem value='2'>2</TreeMenuItem>
					<TreeMenuSubMenu>
						<TreeMenuItem value='2.1'>2.1</TreeMenuItem>
						<TreeMenuItem value='2.2'>2.2</TreeMenuItem>
						<TreeMenuGroup>
							<TreeMenuItem value='2.3'>2.3</TreeMenuItem>
							<TreeMenuSubMenu>
								<TreeMenuItem value='2.3.1'>2.3.1</TreeMenuItem>
								<TreeMenuItem value='2.3.2'>2.3.2</TreeMenuItem>
							</TreeMenuSubMenu>
						</TreeMenuGroup>
					</TreeMenuSubMenu>
				</TreeMenuGroup>
			</TreeMenu>
		)

		let autoOpenMenu = React.cloneElement(menu, {autoOpen: true})
	
		return (
			<table style={{tableLayout: 'fixed', width: '100%'}}>
				<tr>
					<td style={{width: '50%', verticalAlign: 'top'}}>
						default behaviour
						<br/><br/>
						{menu}
					</td>
					<td style={{width: '50%', verticalAlign: 'top'}}>
						{'autoOpen={true}'}
						<br/><br/>
						{autoOpenMenu}
					</td>
				</tr>
			</table>
		)
	}
}
