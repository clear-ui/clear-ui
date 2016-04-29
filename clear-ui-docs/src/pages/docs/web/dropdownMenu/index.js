import React from 'react'

import Icon from 'clear-ui-base/lib/icon'
import DropdownMenu from 'clear-ui-web/lib/dropdownMenu'
import ButtonDropdownMenu from 'clear-ui-web/lib/dropdownMenu/buttonDropdownMenu'

import Button from 'clear-ui-web/lib/button/raisedButton'
import Link from 'clear-ui-web/lib/link'
import {MenuItem} from 'clear-ui-web/lib/menu'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

import DropdownMenuExample from './example.js'
import dropdownMenuExampleCode from '!raw!./example.js'

export default class DropdownMenuDoc extends React.Component {
	render() {
		let triangleIcon = <Icon icon={Icon.ICONS.triangleDown}/>

		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Dropdown Menu</h1>

			{`
			Dropdown menu is a component that opens menu under the trigger element
			and allows to select from it.
			`}

			<h2>Example</h2>

			{`
			There are two types of dropdown components:
			- \`DropdownMenu\` can use any element as trigger.
			- \`ButtonDropdownMenu\` uses button component as trigger.
				It adds triangle icon to the buttons.
				It makes button stay  pressed, while dropdown is open,
				and it prevents opening when button is disabled.
			`}

			<Example>
				<Example.Demo>
					<DropdownMenuExample/>
				</Example.Demo>
				<Example.Code>
					{dropdownMenuExampleCode}
				</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>List width</h3>

			{`
			Width of dropdown list depends on menu items size
			(but not less than trigger's width).
			You can set specific with of list in px or in % of trigger's width.
			`}

			<Example>
				<Example.Demo>
					{' '}
					<DropdownMenu
						trigger={<Button rightIcon={triangleIcon}>Width in %</Button>}
						width='150%'>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
					{' '}
					<DropdownMenu
						trigger={<Button rightIcon={triangleIcon}>Width in px</Button>}
						width='200px'
					>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<DropdownMenu trigger={trigger} width='150%'>...</DropdownMenu>

					<DropdownMenu trigger={trigger} width='200px'>...</DropdownMenu>
				`}</Example.Code>
			</Example>

			<h3>Sides</h3>

			{`
			List shows at the bottom side of the dropdown if there is enough space,
			otherwise at the top.
			Horizontally list expands to the right side.
			You can change these sides to opposite.
			`}

			<Example>
				<Example.Demo>
					<DropdownMenu
						trigger={<Button rightIcon={triangleIcon}>Show at the top</Button>}
						vertSide='top'
					>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
					{' '}
					<DropdownMenu
						trigger={<Button rightIcon={triangleIcon}>Expand to the left</Button>}
						expandSide='left'
					>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item with long text</MenuItem>
					</DropdownMenu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<DropdownMenu trigger={trigger} vertSide='top'>...</DropdownMenu>

					<DropdownMenu trigger={trigger} expandSide='left'>...</DropdownMenu>
				`}</Example.Code>
			</Example>

			<h3>Animation</h3>

			<Example>
				<Example.Demo>
					<DropdownMenu
						trigger={<Button rightIcon={triangleIcon}>Top</Button>}
						vertSide='top'
						animation='scale'
					>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
					{' '}
					<DropdownMenu
						trigger={<Button rightIcon={triangleIcon}>Bottom</Button>}
						animation='scale'
					>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
				`}</Example.Code>
			</Example>

			<h2>API</h2>

			<h3>Props</h3>

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/docs/base/dropdown-menu'>Base > DropdownMenu props</a>
				</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
