import React from 'react'
import DropdownMenu from 'clear-ui-web/lib/dropdownMenu'
import ButtonDropdownMenu from 'clear-ui-web/lib/dropdownMenu/buttonDropdownMenu'
import {MenuItem} from 'clear-ui-web/lib/menu'
import Button from 'clear-ui-web/lib/button/raisedButton'
import Link from 'clear-ui-web/lib/link'

export default class DropdownMenuExample extends React.Component {
	render() {
		return (
			<div>
				<DropdownMenu trigger={<a>Open dropdown</a>}>
					<MenuItem value='1'>First menu item</MenuItem>
					<MenuItem value='2'>Second menu item</MenuItem>
				</DropdownMenu>
				{' '}
				<ButtonDropdownMenu trigger={<Button>DropdownMenu</Button>}>
					<MenuItem value='1'>First menu item</MenuItem>
					<MenuItem value='2'>Second menu item</MenuItem>
				</ButtonDropdownMenu>
			</div>
		)
	}
}
