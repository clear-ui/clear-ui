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

export default class DropdownMenuDoc extends React.Component {
	render() {
		let triangleIcon = <Icon icon={Icon.ICONS.triangleDown}/>

		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Dropdown Menu</h1>

			Dropdown menu is a component that shows menu under the trigger element.

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<DropdownMenu trigger={<Link>Open dropdown</Link>}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
					{' '}
					<ButtonDropdownMenu trigger={<Button>DropdownMenu</Button>}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</ButtonDropdownMenu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					let trigger = <Button rightIcon={triangleIcon}>DropdownMenu</Button>

					<DropdownMenu trigger={trigger}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
				`}</Example.Code>
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
						width='150px'
					>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<DropdownMenu trigger={trigger} width='150%'>...</DropdownMenu>

					<DropdownMenu trigger={trigger} width='150px'>...</DropdownMenu>
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
						<MenuItem value='2'>Second menu item</MenuItem>
					</DropdownMenu>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<DropdownMenu trigger={trigger} vertSide='top'>...</DropdownMenu>

					<DropdownMenu trigger={trigger} expandSide='left'>...</DropdownMenu>
				`}</Example.Code>
			</Example>

			<h2>API</h2>

			<h3>Props</h3>

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/components/base/dropdown-menu' style={{
						textDecoration: 'none',
						color: 'rgb(57, 123, 230)',
						fontWeight: 500
					}}>Base > DropdownMenu props...</a>
				</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
