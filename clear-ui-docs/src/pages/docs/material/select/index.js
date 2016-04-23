import React from 'react'

import Select from 'clear-ui-material/lib/select'
import {MenuItem} from 'clear-ui-material/lib/menu'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

class SelectDemo extends React.Component {
	constructor() {
		super()
		this.state = {}
	}

	render() {
		return <Select
			{...this.props}
			value={this.state.value}
			onChange={(value) => { this.setState({value}) }}
		>
			{this.props.children}
		</Select>
	}
}

export default class DropdownMenuDoc extends React.Component {
	render() {
		let manyItems = []
		for (let i = 0; i < 30; i++) {
			manyItems.push(<MenuItem value={i+1} key={i}>Item {i+1}</MenuItem>)
		}

		let manyItems2 = []
		for (let i = 0; i < 300; i++) {
			manyItems2.push(<MenuItem value={i+1} key={i}>Item {i+1}</MenuItem>)
		}

		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Select</h1>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<SelectDemo>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</SelectDemo>
					<br/>
					<SelectDemo disabled={true} label='disabled select'>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</SelectDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Select>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
						...
					</Select>
				`}</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Scrolling</h3>

			If select has many items, it will have scrolling.
			Also, you can set maximum height of the menu.

			<Example>
				<Example.Demo>
					<SelectDemo>{manyItems}</SelectDemo>
					<br/>
					<SelectDemo maxHeight={300}>{manyItems}</SelectDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Select maxHeight={300}>...</Select>
				`}</Example.Code>
			</Example>

			<h3>Desktop</h3>

			Desktop version of select has smaller menu items.

			<Example>
				<Example.Demo>
					<SelectDemo desktop={true}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</SelectDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Select desktop={true}>
						...
					</Select>
				`}</Example.Code>
			</Example>
		</DocPage>
	}
}
