import React from 'react'

import DropdownMenu from 'clear-ui-material/lib/dropdownMenu'
import {MenuItem} from 'clear-ui-material/lib/menu'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

import Button from 'clear-ui-material/lib/button/raisedButton'

class Test extends React.Component {
	state = {open: false}

	render() {
		return <div>
			<Button onTap={() => {
				this.setState({open: true})
				setTimeout(() => {this.setState({open: false}) }, 1000)
			 }}>
			 	Open
			</Button>

			<DropdownMenu trigger={'First menu item'}
				open={this.state.open}
				onChangeOpen={(open) => {
					console.log('OPEN', open)
					this.setState({open})
				}}
			>
				<MenuItem value='1'>First menu item</MenuItem>
				<MenuItem value='2'>Second menu item</MenuItem>
			</DropdownMenu>
		</div>
	}
}

export default class DropdownMenuDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Dropdown Menu</h1>

			DropdownMenu is a component that shows menu under the trigger element.

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<Test/>
				</Example.Demo>
			</Example>

			<Example>
				<Example.Demo>
					<DropdownMenu trigger={'First menu item'}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<DropdownMenu trigger={'First menu item'}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
				`}</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Desktop</h3>

			<Example>
				<Example.Demo>
					<DropdownMenu trigger={'First menu item'} desktop={true}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<DropdownMenu desktop={true} ...>
						...
					</DropdownMenu>
				`}</Example.Code>
			</Example>

			<h3>Animation</h3>

			<Example>
				<Example.Demo>
					<DropdownMenu
						trigger={'Top'}
						vertSide='top'
						animation='scale'
					>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
					{' '}
					<DropdownMenu
						trigger='Bottom'
						animation='scale'
					>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
				`}</Example.Code>
			</Example>

		</DocPage>
	}
}
