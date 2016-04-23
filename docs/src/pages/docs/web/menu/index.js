import React from 'react'

import Icon from 'clear-ui-base/lib/icon'
import Button from 'clear-ui-simple/lib/button/raisedButton'
import Menu, {MenuItem, MenuLabel, MenuDivider} from 'clear-ui-simple/lib/menu'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

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

			{`
			Menu is a list of items.
			`}

			<h2>Example</h2>

			{`

			Menu supports keyboard interaction.
			When menu is active you can use arrows to move hover and
			\`Enter\` to select item.
			`}

			<Example>
				<Example.Demo>
					<MenuDemo/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Menu active={this.state.active} value={this.state.value}
						onSelect={(item) => { this.setState({value: item.props.value}) }}
					>
						<MenuLabel>Label</MenuLabel>
						<MenuItem value='1'>Item</MenuItem>
						<MenuItem value='2'>Second item</MenuItem>
						<MenuDivider/>
						<MenuItem value='3'>Third item</MenuItem>
						<MenuItem value='4' disabled={true}>Disabled item</MenuItem>
					</Menu>
				`}</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Height</h3>

			Height of items. **TODO**

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

			Bigger left and right paddings of items.

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
					<hr/>
					<Menu height='small'>
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

			<hr/>

			<h2>API</h2>

			<h3>Menu</h3>

			{`
				<code>import Menu from 'clear-ui-web/lib/menu'</code>
			`}

			<h4>Props</h4>

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/components/base/menu' style={{
						textDecoration: 'none',
						color: 'rgb(57, 123, 230)',
						fontWeight: 500
					}}>Base > Menu props...</a>
				</ApiDoc.Row>

				<ApiDoc.Row name='height' type='string' defaultValue='default'>{`
					Height of menu items.
					<br/>
					Possible values are: \`small\`, \`big\`.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='padding' type='string' defaultValue='default'>{`
					Horizontal padding of menu items.
					<br/>
					Possible values are: \`default\`, \`big\`.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='indent' type='boolean'>{`
					Indentation on the left side of items and labels
					that aligns text to the same position as in the item with \`leftIcon\`.
				`}</ApiDoc.Row>
			</ApiDoc>

			<h3>MenuItem</h3>

			{`
				\`import {MenuItem} from 'clear-ui-web/lib/menu'\`
			`}

			<h4>Props</h4>

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/components/base/menu' style={{
						textDecoration: 'none',
						color: 'rgb(57, 123, 230)',
						fontWeight: 500
					}}>Base > MenuItem props...</a>
				</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
