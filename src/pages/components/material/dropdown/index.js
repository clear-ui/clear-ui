import React from 'react'

import Dropdown from 'clear-ui-material/lib/dropdown'
import {MenuItem} from 'clear-ui-material/lib/menu'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

export default class DropdownDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Dropdown</h1>

			Dropdown is a component that shows menu under the trigger element.

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<Dropdown trigger={'First menu item'}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</Dropdown>
				</Example.Demo>
				<Example.Code lang='xml'>{`
				`}</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Desktop</h3>

			<Example>
				<Example.Demo>
					<Dropdown trigger={'First menu item'} desktop={true}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</Dropdown>
				</Example.Demo>
				<Example.Code lang='xml'>{`
				`}</Example.Code>
			</Example>

		</DocPage>
	}
}
