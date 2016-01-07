import React from 'react'

import TreeMenu, {TreeMenuItem, TreeMenuGroup, TreeMenuSubMenu}
	from 'clear-ui-simple/lib/treeMenu'

import DocPage from '../../../../docPage'
import Example from '../../../../example'

export default class TreeMenuDoc extends React.Component {
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
		let autoOpen = React.cloneElement(menu, {autoOpen: true})

		return (
			<DocPage>
				<h1>Web/Tree Menu</h1>

				Menu that supports nesting.

				<h2>Example</h2>

				{`
				Submenus can be opened by clicking on the opener icon.

				In menu with \`autoOpen={true}\` openers icons are not clickable,
				and submenus are opened automatically when they are selected.
				`}

				<Example>
					<Example.Demo>
						<table style={{tableLayout: 'fixed', width: '100%'}}>
							<tr>
								<td style={{width: '50%', verticalAlign: 'top'}}>
									{'default openers behaviour'}
									<br/><br/>
									<div style={{border: '1px solid #eee'}}>
										{menu}
									</div>
								</td>
								<td style={{width: '50%', verticalAlign: 'top'}}>
									{'autoOpen'}
									<br/><br/>
									<div style={{border: '1px solid #eee'}}>
										{autoOpen}
									</div>
								</td>
							</tr>
						</table>
					</Example.Demo>
					<Example.Code lang='xml'>{`
					`}</Example.Code>
				</Example>

				<h2>API</h2>

				{`
				\`TreeMenu\` and \`TreeMenu.Item\` inherit mods and props from the \`Menu\`.
				`}

			</DocPage>
		)
	}
}
