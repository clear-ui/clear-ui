import React from 'react'

import Icon from 'clear-ui-base/lib/icon'
import Button from 'clear-ui-web/lib/button/raisedButton'
import {Menu, MenuItem, MenuLabel, MenuDivider} from 'clear-ui-web/lib/menu'
import MenuItemWithSubMenu from 'clear-ui-web/lib/menu/itemWithSubMenu'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'

import webDocs from '../../../../../docgen/web.json'
let menuPropsDoc = webDocs['menu/menu.js'].props
let menuItemPropsDoc = webDocs['menu/item.js'].props

import MenuExample from './example.js'
import menuExampleCode from '!raw!./example.js'

class MenuDemo extends React.Component {
	constructor() {
		super()
		this.state = {}
	}

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

export default class MenuDoc extends React.Component {
	render() {
		let starIcon = <Icon icon={Icon.ICONS.star}/>
		let kebabIcon = <Icon icon={Icon.ICONS.kebab}/>

		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Menu</h1>

			{`Menu is a component that displays list of items and allows to select from it.`}

			<h2>Example</h2>

			{`
			Menu supports keyboard interaction.
			When menu is active you can use arrows to move hover and
			\`Enter\` to select item.
			`}

			<Example>
				<Example.Demo>
					<MenuExample/>
				</Example.Demo>
				<Example.Code>
					{menuExampleCode}
				</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Height</h3>

			{`Height of items and labels.`}

			<Example>
				<Example.Demo>
					<Menu height='big'>
						<MenuLabel>Big menu</MenuLabel>
						<MenuItem value='1'>Item</MenuItem>
					</Menu>
					<Menu height='small'>
						<MenuLabel>Small menu</MenuLabel>
						<MenuItem value='1'>Item</MenuItem>
					</Menu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Menu height='big'>...</Menu>
					<Menu height='small'>...</Menu>
				`}</Example.Code>
			</Example>

			<h3>Padding</h3>

			{`Bigger left and right paddings of items.`}

			<Example>
				<Example.Demo>
					<Menu padding='big'>
						<MenuLabel>Label</MenuLabel>
						<MenuItem value='1'>Item</MenuItem>
						<MenuItem value='2'>Second item</MenuItem>
						<MenuDivider/>
						<MenuItem value='4' disabled={true}>Disabled item</MenuItem>
					</Menu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Menu padding='big'>...</Menu>
				`}</Example.Code>
			</Example>


			<h3>Icons</h3>

			{`
			Item can have icons at the right and left sides.

			Right icon can be clickable, when you provide \`onRightIconTap\` callback.

			If you want to align text of all items to the same position,
			you can use mod \`indent: true\` on items without icons, and labels.
			Also, you can set this mod on the \`Menu\` itself to force indent on all items.
			`}

			<Example>
				<Example.Demo>
					<Menu>
						<MenuLabel indent={true}>Indented label</MenuLabel>
						<MenuItem leftIcon={starIcon} rightIcon={starIcon}>
							Item with icons
						</MenuItem>
						<MenuItem leftIcon={starIcon} rightIcon={kebabIcon}
							onRightIconTap={() => { console.log('click') }}
						>
							Item with clickable right icon
						</MenuItem>
						<MenuItem indent={true}>
							Indented item without icon
						</MenuItem>
						<MenuItem disabled={true}
							leftIcon={starIcon} rightIcon={kebabIcon}>
							Disabled item with icons
						</MenuItem>
					</Menu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Menu>
						<MenuLabel indent={true}>Indented label</MenuLabel>
						<MenuItem leftIcon={starIcon} rightIcon={starIcon}>
							Item with icons
						</MenuItem>
						<MenuItem leftIcon={starIcon} rightIcon={kebabIcon}
							onRightIconTap={() => { console.log('click') }}
						>
							Item with clickable right icon
						</MenuItem>
						<MenuItem mods={{indent: true}}>
							Indented item without icon
						</MenuItem>
						<MenuItem disabled={true}
							leftIcon={starIcon} rightIcon={kebabIcon}>
							Disabled item with icons
						</MenuItem>
					</Menu>
				`}</Example.Code>
			</Example>

			<h2>Items with sub menus</h2>

			{`
			A menu item may contain another menu nested inside.
			For this you need to use wrapper component \`MenuItemWithSubMenu\` instead of 
			\`MenuItem\`.
			`}

			<Example>
				<Example.Demo>
					<Menu>
						<MenuItemWithSubMenu subMenu={
							<Menu>
								<MenuItem>Item 1.1</MenuItem>
								<MenuItem>Item 1.2</MenuItem>
							</Menu>
						}>
							Item 1
						</MenuItemWithSubMenu>
					</Menu>
				</Example.Demo>
				<Example.Code>{`
					<Menu>
						<MenuItemWithSubMenu subMenu={
							<Menu>
								<MenuItem>Item 1.1</MenuItem>
								<MenuItem>Item 1.2</MenuItem>
							</Menu>
						}>
							Item 1
						</MenuItemWithSubMenu>
					</Menu>
				`}</Example.Code>
			</Example>

			{`
			Sub menu that opens on hover and renders in the separate layer:
			`}

			<Example>
				<Example.Demo>
					<Menu renderSubMenuInLayer={true}>
						<MenuItemWithSubMenu 
							subMenuTrigger='hover'
							subMenu={
								<Menu>
									<MenuItem>Item 1.1</MenuItem>
									<MenuItem>Item 1.2</MenuItem>
								</Menu>
							}
						>
							Item 1
						</MenuItemWithSubMenu>
					</Menu>
				</Example.Demo>
				<Example.Code>{`
					<Menu renderSubMenuInLayer={true}>
						<MenuItemWithSubMenu 
							subMenuTrigger='hover'
							subMenu={
								<Menu>
									<MenuItem>Item 1.1</MenuItem>
									<MenuItem>Item 1.2</MenuItem>
								</Menu>
							}
						>
							Item 1
						</MenuItemWithSubMenu>
					</Menu>
				`}</Example.Code>
			</Example>

			<h2>Menu API</h2>

			{`
			Extends <a href='#/docs/base/menu'>Base > Menu > Menu</a>
			`}

			<h3>Props</h3>
			<PropsDoc doc={menuPropsDoc}/>

			<h2>MenuItem API</h2>

			{`
			Extends <a href='#/docs/base/menu'>Base > Menu > MenuItem</a>
			`}

			<h3>Props</h3>
			<PropsDoc doc={menuItemPropsDoc}/>
		</DocPage>
	}
}
