import React from 'react'

import TreeMenu, {TreeMenuItem, TreeMenuHeader, TreeMenuGroup, TreeMenuSubMenu}
	from 'clear-ui-simple/lib/treeMenu'

import DocPage from '../../../../docPage'
import Example from '../../../../example'

import TreeMenuExample from './example.js'
import treeMenuExampleCode from '!raw!./example.js'

class HeaderMenuExample extends React.Component {
	constructor() {
		super()
		this.state = {value: '1.1'}
	}

	render() {
		return (
			<TreeMenu value={this.state.value}
				onSelect={(value) => { this.setState({value}) }}
			>
				<TreeMenuGroup>
					<TreeMenuHeader value='1'>Header 1</TreeMenuHeader>
					<TreeMenuSubMenu>
						<TreeMenuItem value='1.1'>Item 1.1</TreeMenuItem>
						<TreeMenuItem value='1.2'>Item 1.2</TreeMenuItem>
					</TreeMenuSubMenu>
				</TreeMenuGroup>
				<TreeMenuGroup>
					<TreeMenuHeader value='2'>Header 2</TreeMenuHeader>
					<TreeMenuSubMenu>
						<TreeMenuItem value='2.1'>Item 2.1</TreeMenuItem>
						<TreeMenuItem value='2.2'>Item 2.2</TreeMenuItem>
					</TreeMenuSubMenu>
				</TreeMenuGroup>
			</TreeMenu>
		)
	}
}

export default class TreeMenuDoc extends React.Component {
	render() {
		return (
			<DocPage>
				<h1>Web<DocPage.ArrowIcon/>Tree Menu</h1>

				Menu that supports nesting.

				<h2>Example</h2>

				{`
				To add submenu to an item, you need to put the item and the submenu in the \`Group\`.
				The item will have opener icon.
				Clicking on the opener opens and closes the submenu.

				When \`TreeMenu\` has prop \`autoOpen={true}\`, submenus are opened automatically
				on selecting header item, and not by clicking opener icon.
				`}

				<Example>
					<Example.Demo>
						<TreeMenuExample/>
					</Example.Demo>
					<Example.Code lang='xml'>
						{treeMenuExampleCode}
					</Example.Code>
				</Example>

				{`
				Also \`TreeMenuHeader\` can be opening element of the group.
				Unlike item header can not be selected,
				clicking on header just opens and closes submenu.
				`}

				<Example>
					<Example.Demo>
						<HeaderMenuExample/>
					</Example.Demo>
				</Example>

				<h2>API</h2>

				{`
				\`TreeMenu\` and \`TreeMenu.Item\` inherit mods and props from the \`Menu\`.
				`}

			</DocPage>
		)
	}
}
