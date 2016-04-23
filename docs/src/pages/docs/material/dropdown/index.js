import React from 'react'

import DropdownMenu from 'clear-ui-material/lib/dropdownMenu'
import {MenuItem} from 'clear-ui-material/lib/menu'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

export default class DropdownMenuDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>DropdownMenu</h1>

			DropdownMenu is a component that shows menu under the trigger element.

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<DropdownMenu trigger={'First menu item'}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
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
				`}</Example.Code>
			</Example>

		</DocPage>
	}
}
