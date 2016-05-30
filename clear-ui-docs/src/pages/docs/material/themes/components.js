import React from 'react'
import Paper from 'clear-ui-material/lib/paper'
import RaisedButton from 'clear-ui-material/lib/button/raisedButton'
import FlatButton from 'clear-ui-material/lib/button/flatButton'
import {Menu, MenuItem} from 'clear-ui-material/lib/menu'
import {RadioGroup, RadioButton} from 'clear-ui-material/lib/radioButtons'
import Checkbox from 'clear-ui-material/lib/checkbox'

export default class Components extends React.Component {
	render() {
		return (
			<Paper padding={true}>
				<Menu value='2'>
					<MenuItem value='1'>Menu item</MenuItem>
					<MenuItem value='2'>Selected item</MenuItem>
					<MenuItem value='3' disabled={true}>Disabled item</MenuItem>
				</Menu>
				<RaisedButton>Button</RaisedButton>
				{' '}
				<FlatButton>Button</FlatButton>
				<br/>
				<RaisedButton primary={true}>Primary</RaisedButton>
				{' '}
				<FlatButton primary={true}>Primary</FlatButton>
				<br/>
				<RaisedButton accent={true}>Accent</RaisedButton>
				{' '}
				<FlatButton accent={true}>Accent</FlatButton>

				<br/>

				<Checkbox value={true}>Checkbox</Checkbox>
				<Checkbox>Checkbox</Checkbox>
				<RadioGroup value='1'>
					<RadioButton value='1'>RadioButton</RadioButton>
					<RadioButton value='2'>RadioButton</RadioButton>
				</RadioGroup>
			</Paper>
		)
	}
}
