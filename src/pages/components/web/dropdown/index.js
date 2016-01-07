import React from 'react'

import Icon from 'clear-ui-base/lib/icon'
import Dropdown from 'clear-ui-simple/lib/dropdown'
import ButtonDropdown from 'clear-ui-simple/lib/dropdown/buttonDropdown'

import Button from 'clear-ui-simple/lib/button/raisedButton'
import Link from 'clear-ui-simple/lib/link'
import {MenuItem} from 'clear-ui-simple/lib/menu'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

export default class DropdownDoc extends React.Component {
	render() {
		let triangleIcon = <Icon icon={Icon.ICONS.triangleDown}/>

		return <DocPage>
			<h1>Dropdown</h1>

			Dropdown is a component that shows menu under the trigger element.

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<Dropdown trigger={<Link>Open dropdown</Link>}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</Dropdown>
					{' '}
					<ButtonDropdown trigger={<Button>Dropdown</Button>}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</ButtonDropdown>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					let trigger = <Button rightIcon={triangleIcon}>Dropdown</Button>

					<Dropdown trigger={trigger}>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</Dropdown>
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
					<Dropdown
						trigger={<Button rightIcon={triangleIcon}>Width in %</Button>}
						width='150%'>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</Dropdown>
					{' '}
					<Dropdown
						trigger={<Button rightIcon={triangleIcon}>Width in px</Button>}
						width='150px'
					>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</Dropdown>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Dropdown trigger={trigger} width='150%'>...</Dropdown>

					<Dropdown trigger={trigger} width='150px'>...</Dropdown>
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
					<Dropdown
						trigger={<Button rightIcon={triangleIcon}>Show at the top</Button>}
						vertSide='top'
					>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</Dropdown>
					{' '}
					<Dropdown
						trigger={<Button rightIcon={triangleIcon}>Expand to the left</Button>}
						expandSide='left'
					>
						<MenuItem value='1'>First menu item</MenuItem>
						<MenuItem value='2'>Second menu item</MenuItem>
					</Dropdown>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Dropdown trigger={trigger} vertSide='top'>...</Dropdown>

					<Dropdown trigger={trigger} expandSide='left'>...</Dropdown>
				`}</Example.Code>
			</Example>

			<h2>API</h2>

			<h3>Props</h3>

			<ApiDoc>
				<ApiDoc.Row name='value'>{`
					Type: \`string\`
				`}</ApiDoc.Row>

				<ApiDoc.Row name='width'>{`
					Type: \`string\`

					Width of the dropdown list, in px or % of trigger's width.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='expandSide'>{`
					Type: \`'left' | 'right'\`
					<br/>
					Default: \`right\`

					Horizontal side where list expands when it is wider than trigger element.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='vertSide'>{`
					Type: \`'top' | 'bottom'\`
					<br/>
					Default: \`bottom\`

					Vertical side where list shows if there is enough space.
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
