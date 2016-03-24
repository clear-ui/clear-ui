import React from 'react'

import Paper from 'clear-ui-material/lib/paper'
import Menu from 'clear-ui-material/lib/menu'
import MenuItem from 'clear-ui-material/lib/menu/item'

import Icon from 'clear-ui-base/lib/icon'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'

class MenuDemo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: '1'}
	}

	render() {
		return (
			<div style={{width: 300}}>
				<Paper>
					<Menu
						{...this.props}
						value={this.state.value}
						onSelect={(item) => { this.setState({value: item.props.value}) }}
					>
						{this.props.children}
					</Menu>
				</Paper>
			</div>
		)
	}
}

export default class MenuDoc extends React.Component {
	render() {
		let starIcon = <Icon icon={Icon.ICONS.star}/>

		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Menu</h1>

			Menus allow users to take an action by selecting from a list of choices.

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<MenuDemo>
						<MenuItem value='1'>First item</MenuItem>
						<MenuItem value='2'>Second item</MenuItem>
						<MenuItem value='3'>Third item</MenuItem>
						<MenuItem value='4' disabled={true}>Disabled item</MenuItem>
					</MenuDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					import Menu, {MenuItem} from 'clear-ui-material/lib/menu'

					<Menu
						value={this.state.value}
						onSelect={(item) => { this.setState({value: item.props.value}) }
					>
						<MenuItem value='1'>First item</MenuItem>
						<MenuItem value='2'>Second item</MenuItem>
						<MenuItem value='3'>Third item</MenuItem>
						<MenuItem value='4' disabled={true}>Disabled item</MenuItem>
					</Menu>
				`}</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Desktop</h3>

			Menu items on desktop have more compact styles.

			<Example>
				<Example.Demo>
					<div style={{width: 300}}>
						<MenuDemo desktop={true}>
							<MenuItem>Item</MenuItem>
							<MenuItem leftIcon={starIcon}>Item with icon</MenuItem>
							<MenuItem indent={true}>Indented item</MenuItem>
						</MenuDemo>
					</div>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Menu desktop={true}>
						<MenuItem>Item</MenuItem>
						<MenuItem leftIcon={starIcon}>Item with icon</MenuItem>
						<MenuItem indent={true}>Indented item</MenuItem>
					</Menu>
				`}</Example.Code>
			</Example>

			<h2>Props</h2>

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/docs/base/menu'>Base > Menu props</a>
				</ApiDoc.Row>

				<ApiDoc.Row name='desktop' type='boolean'>
				</ApiDoc.Row>
			</ApiDoc>

			<h2>MenuItem props</h2>

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/docs/base/menu'>Base > Menu > MenuItem props</a>
				</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}

